"""Simulated factory line for the play.reduct.store `factory` bucket.

One pump on line 1, recorded three ways:

- `vibration`: 1 s accelerometer chunks at 1 kHz (float32, little endian),
  labeled with `rms`, `peak`, and `state`.
- `plc`: 1 s of PLC samples at 10 Hz as CSV with a header row.
- `mqtt/line1/temperature`, `mqtt/line1/pressure`, `mqtt/line1/state`: JSON
  messages every 5 s, one entry per topic.

For 7 minutes of every hour (minutes 35 to 42) the pump runs with a bearing
fault: a 160 Hz vibration, higher rms, and a warmer housing.

Usage:
    pip install reduct-py
    REDUCT_API_TOKEN=... python factory_generator.py             # last hour
    REDUCT_API_TOKEN=... python factory_generator.py --follow    # then keep writing

Rerunning continues after the latest record of each entry, so it never
writes the same timestamp twice.
"""

import argparse
import asyncio
import json
import math
import os
import random
import struct
import time

from reduct import Batch, BucketSettings, Client, QuotaType

BUCKET = "factory"
QUOTA_BYTES = 1_000_000_000
SAMPLE_RATE_HZ = 1000
PLC_RATE_HZ = 10
MQTT_PERIOD_S = 5
SECOND_US = 1_000_000
BATCH_SECONDS = 60


def state_at(t_us):
    minute = (t_us // (60 * SECOND_US)) % 60
    return "fault" if 35 <= minute < 42 else "running"


def vibration_chunk(t_us, rng):
    fault = state_at(t_us) == "fault"
    samples = []
    for i in range(SAMPLE_RATE_HZ):
        t = t_us / SECOND_US + i / SAMPLE_RATE_HZ
        value = 0.5 * math.sin(2 * math.pi * 25 * t) + rng.gauss(0, 0.05)
        if fault:
            value += 1.2 * math.sin(2 * math.pi * 160 * t)
        samples.append(value)
    rms = math.sqrt(sum(v * v for v in samples) / len(samples))
    peak = max(abs(v) for v in samples)
    data = struct.pack(f"<{len(samples)}f", *samples)
    labels = {"rms": f"{rms:.3f}", "peak": f"{peak:.3f}", "state": state_at(t_us)}
    return data, labels


def plc_values(t_us, rng):
    fault = state_at(t_us) == "fault"
    minute = (t_us // (60 * SECOND_US)) % 60
    warmup = max(0, minute - 35) if fault else 0
    temperature = 61.0 + 1.8 * warmup + rng.gauss(0, 0.2)
    pressure = 4.2 + (0.35 if fault else 0.0) + rng.gauss(0, 0.03)
    speed = 1480 + rng.gauss(0, 4)
    return temperature, pressure, speed


def plc_chunk(t_us, rng):
    rows = ["timestamp,temperature,pressure,speed_rpm,state"]
    for i in range(PLC_RATE_HZ):
        ts = t_us + i * SECOND_US // PLC_RATE_HZ
        temperature, pressure, speed = plc_values(ts, rng)
        rows.append(f"{ts},{temperature:.2f},{pressure:.3f},{speed:.0f},{state_at(ts)}")
    return ("\n".join(rows) + "\n").encode(), {"state": state_at(t_us)}


def mqtt_messages(t_us, rng):
    temperature, pressure, _ = plc_values(t_us, rng)
    return {
        "mqtt/line1/temperature": {"value": round(temperature, 2), "unit": "C"},
        "mqtt/line1/pressure": {"value": round(pressure, 3), "unit": "bar"},
        "mqtt/line1/state": {"value": state_at(t_us)},
    }


async def latest(bucket, entry):
    for info in await bucket.get_entry_list():
        if info.name == entry and info.record_count > 0:
            return info.latest_record
    return None


async def write_range(bucket, start_us, stop_us, rng):
    """Writes every record with a timestamp in [start_us, stop_us)."""
    first_second = -(-start_us // SECOND_US) * SECOND_US
    vibration, plc = Batch(), Batch()
    mqtt = {}
    for t_us in range(first_second, stop_us, SECOND_US):
        data, labels = vibration_chunk(t_us, rng)
        vibration.add(t_us, data, "application/octet-stream", labels)
        data, labels = plc_chunk(t_us, rng)
        plc.add(t_us, data, "text/csv; header=present", labels)
        if (t_us // SECOND_US) % MQTT_PERIOD_S == 0:
            for topic, message in mqtt_messages(t_us, rng).items():
                mqtt.setdefault(topic, Batch()).add(
                    t_us, json.dumps(message).encode(), "application/json"
                )
    for entry, batch in [("vibration", vibration), ("plc", plc), *mqtt.items()]:
        if len(batch) == 0:
            continue
        errors = await bucket.write_batch(entry, batch)
        if errors:
            raise RuntimeError(f"{entry}: {len(errors)} records failed, first: {next(iter(errors.values()))}")
    return max(0, (stop_us - first_second + SECOND_US - 1) // SECOND_US)


async def main():
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--url", default="https://play.reduct.store")
    parser.add_argument("--backfill-minutes", type=int, default=60)
    parser.add_argument("--follow", action="store_true", help="keep writing live data")
    args = parser.parse_args()
    token = os.environ.get("REDUCT_API_TOKEN")
    if not token:
        raise SystemExit("Set REDUCT_API_TOKEN to a token that can write the factory bucket")

    rng = random.Random(42)
    async with Client(args.url, api_token=token) as client:
        bucket = await client.create_bucket(
            BUCKET,
            BucketSettings(quota_type=QuotaType.FIFO, quota_size=QUOTA_BYTES),
            exist_ok=True,
        )
        now_us = int(time.time() * SECOND_US) // SECOND_US * SECOND_US
        start_us = now_us - args.backfill_minutes * 60 * SECOND_US
        last = await latest(bucket, "vibration")
        if last is not None:
            start_us = max(start_us, last + 1)

        written = 0
        for chunk_start in range(start_us, now_us, BATCH_SECONDS * SECOND_US):
            written += await write_range(
                bucket, chunk_start, min(chunk_start + BATCH_SECONDS * SECOND_US, now_us), rng
            )
        print(f"Wrote {written} s of factory data up to {now_us}")

        while args.follow:
            await asyncio.sleep(1)
            stop_us = int(time.time() * SECOND_US) // SECOND_US * SECOND_US
            await write_range(bucket, now_us, stop_us, rng)
            now_us = stop_us


if __name__ == "__main__":
    asyncio.run(main())
