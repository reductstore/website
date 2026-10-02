import { test } from "node:test";
import assert from "node:assert/strict";
import {
  calculateWorkload,
  compare,
  licenseCostYear,
  marginalCost,
  normalizeRetention,
  objectStorageCost,
  packFactor,
} from "./calculate.ts";
import {
  REDUCT_BLOCK,
  backendPricing,
  licenseTiers,
  pricingConfig,
  usdRate,
} from "./pricing.ts";
import { PRESETS } from "./presets.ts";
import { REDUCTSTORE_MIN_TB, REDUCTSTORE_PRICING } from "../../lib/currency.ts";

const close = (actual, expected, tolerance = 0.01) =>
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `expected ${expected}, got ${actual}`,
  );

const stream = (name, count, hz, kb, dataClass = "blob", enabled = true) => ({
  id: name,
  name,
  enabled,
  dataClass,
  count,
  frequencyHz: hz,
  recordSizeKb: kb,
});

const config = (overrides = {}) => {
  const currency = overrides.currency ?? "USD";
  const backend = overrides.backend ?? "aws";
  return {
    pricing: backendPricing(backend, currency, overrides.onPrem ?? 10),
    backendName: { aws: "AWS S3", azure: "Azure Blob", minio: "On-prem" }[
      backend
    ],
    licenseTiers: licenseTiers(REDUCTSTORE_PRICING[currency].perTbMonth),
    licenseMinTb: REDUCTSTORE_MIN_TB,
    block: REDUCT_BLOCK,
    prices: pricingConfig,
    usdRate: usdRate(currency),
    competitor: overrides.competitor ?? "foxglove",
    assumptions: {
      foxgloveDeveloperSeats: 3,
      foxgloveQueryHoursPerMonth: 20,
    },
    readPercentPerMonth: overrides.read ?? 5,
    instances: overrides.instances ?? 2,
    telemetryCompression: overrides.compression ?? 1,
    engineeringRate: overrides.engineeringRate ?? 0,
  };
};

// 1 unit, 24 h a day, one 100 KB record per second: 0.2592 TB a month.
const oneStream = {
  units: 1,
  recordingHoursPerDay: 24,
  streams: [stream("camera", 1, 1, 100)],
};
const MONTH_TB = (100 * 86_400 * 30) / 1e9;
const SERVER_YEAR = 12 * 0.2016 * 730;

test("pack factor follows the block size and record limits", () => {
  assert.equal(packFactor(1, REDUCT_BLOCK), 1024);
  assert.equal(packFactor(100, REDUCT_BLOCK), 640);
  assert.equal(packFactor(1000, REDUCT_BLOCK), 64);
  assert.equal(packFactor(100_000, REDUCT_BLOCK), 1);
});

test("license: €15 and $18 per TB per month, 1 TB minimum", () => {
  close(licenseCostYear(100, licenseTiers(15)), 18_000);
  close(licenseCostYear(100, licenseTiers(18)), 21_600);
  const tiny = compare(
    oneStream,
    { hotPercent: 1, hotDays: 1, coldPercent: 0, coldDays: 0 },
    config({ currency: "EUR" }),
  );
  close(
    tiny.reduct.components.find((c) => c.label === "ReductStore license")
      .amountYear,
    180,
  );
});

test("hot and cold data: recorded × share × days / 30", () => {
  const w = calculateWorkload(oneStream, {
    hotPercent: 50,
    hotDays: 30,
    coldPercent: 10,
    coldDays: 180,
  });
  close(w.generatedMonthTb, MONTH_TB, 1e-12);
  close(w.hotTb, MONTH_TB * 0.5, 1e-12);
  close(w.coldTb, MONTH_TB * 0.1 * 6, 1e-12);
  close(w.retainedTb, w.hotTb + w.coldTb, 1e-12);
  assert.equal(w.recordsMonth, 86_400 * 30);
});

test("cold share can never exceed the hot share", () => {
  assert.deepEqual(
    normalizeRetention({
      hotPercent: 20,
      hotDays: 30,
      coldPercent: 50,
      coldDays: 90,
    }),
    { hotPercent: 20, hotDays: 30, coldPercent: 20, coldDays: 90 },
  );
});

test("no NaN when nothing is recorded", () => {
  const off = {
    ...oneStream,
    streams: [stream("x", 1, 1, 100, "blob", false)],
  };
  const result = compare(
    off,
    { hotPercent: 100, hotDays: 30, coldPercent: 10, coldDays: 90 },
    config(),
  );
  assert.equal(result.workload.retainedTb, 0);
  close(result.reduct.totalYear, 2 * SERVER_YEAR, 1e-6);
  assert.ok(Number.isFinite(result.savingPercent));
});

test("cold data goes to the cheapest class its retention allows", () => {
  const tier = (backend, coldDays) =>
    compare(
      oneStream,
      { hotPercent: 100, hotDays: 30, coldPercent: 100, coldDays },
      config({ backend }),
    ).coldTier;
  assert.equal(tier("aws", 20), "S3 Standard");
  assert.equal(tier("aws", 60), "S3 Standard-IA");
  assert.equal(tier("aws", 120), "S3 Glacier Instant Retrieval");
  assert.equal(tier("azure", 20), "Azure Hot");
  assert.equal(tier("azure", 60), "Azure Cool");
  assert.equal(tier("azure", 120), "Azure Cold");
});

// Every term of the S3 bill for one stream, written out with AWS list prices.
test("object storage cost of one stream by hand", () => {
  const retention = {
    hotPercent: 50,
    hotDays: 30,
    coldPercent: 10,
    coldDays: 180,
  };
  const [s] = calculateWorkload(oneStream, retention).streams;
  const pricing = backendPricing("aws", "USD");
  const pack = 640;
  const objectKb = 100 * pack;
  const perRecord = 2 / pack;
  const cost = objectStorageCost(s, retention, 5, pricing, objectKb, perRecord);

  const records = 86_400 * 30;
  const hotTb = MONTH_TB * 0.5;
  const coldTb = MONTH_TB * 0.1 * 6;
  const written = records * 0.5 * perRecord;
  const moved = records * 0.1 * perRecord;
  const storage = hotTb * 23 + coldTb * 4;
  const requests =
    (written / 1000) * 0.005 +
    ((written * 0.05) / 1000) * 0.0004 +
    (moved / 1000) * 0.02 +
    ((moved * 6 * 0.05) / 1000) * 0.01;
  const retrieval = coldTb * 0.05 * 30;
  close(cost.storageMonth, storage, 1e-9);
  close(cost.requestsMonth, requests, 1e-9);
  close(cost.retrievalMonth, retrieval, 1e-9);
  assert.equal(cost.coldTier.label, "S3 Glacier Instant Retrieval");
});

test("small objects are billed at 128 KB in cold classes, so they stay hot", () => {
  const retention = {
    hotPercent: 100,
    hotDays: 1,
    coldPercent: 100,
    coldDays: 60,
  };
  const [s] = calculateWorkload(oneStream, retention).streams;
  const pricing = backendPricing("aws", "USD");
  const large = objectStorageCost(s, retention, 0, pricing, 64_000, 1 / 640);
  const small = objectStorageCost(s, retention, 0, pricing, 32, 1);
  const hotStorage = s.hotTb * 23;
  assert.equal(large.coldTier.label, "S3 Standard-IA");
  close(large.storageMonth - hotStorage, s.coldTb * 12.5, 1e-9);
  // In Standard-IA 32 KB objects would cost 4 × $12.5 = $50 per TB, more
  // than the $23 of S3 Standard.
  assert.equal(small.coldTier.label, "S3 Standard");
  close(small.storageMonth - hotStorage, s.coldTb * 23, 1e-9);
});

test("on-prem: retained TB × price × 12, servers, no requests or data out", () => {
  const result = compare(
    oneStream,
    { hotPercent: 100, hotDays: 30, coldPercent: 50, coldDays: 365 },
    config({ backend: "minio", onPrem: 10 }),
  );
  assert.deepEqual(
    result.reduct.components.map((c) => c.label),
    ["ReductStore license", "On-prem storage", "Servers", "Engineering"],
  );
  const part = (label) =>
    result.reduct.components.find((c) => c.label === label).amountYear;
  close(part("On-prem storage"), result.workload.retainedTb * 10 * 12, 1e-9);
  close(part("Servers"), 2 * SERVER_YEAR, 1e-6);
});

test("ReductStore pays data out on what is read and one server per instance", () => {
  const retention = {
    hotPercent: 100,
    hotDays: 30,
    coldPercent: 0,
    coldDays: 0,
  };
  const part = (result, label) =>
    result.reduct.components.find((c) => c.label === label).amountYear;
  const aws = compare(oneStream, retention, config({ instances: 3 }));
  close(part(aws, "Data out"), 12 * MONTH_TB * 0.05 * 90, 1e-6);
  close(part(aws, "Servers"), 3 * SERVER_YEAR, 1e-6);
  const azure = compare(oneStream, retention, config({ backend: "azure" }));
  close(part(azure, "Data out"), 12 * MONTH_TB * 0.05 * 87, 1e-6);
  close(part(azure, "Servers"), 2 * 12 * 0.192 * 730, 1e-6);
});

test("telemetry is compressed by the same ratio everywhere, binary data is not", () => {
  const mixed = {
    units: 1,
    recordingHoursPerDay: 24,
    streams: [
      stream("Camera", 1, 1, 100, "blob"),
      stream("Telemetry", 1, 100, 1, "metric"),
      stream("Logs", 1, 10, 2, "log"),
    ],
  };
  const retention = {
    hotPercent: 100,
    hotDays: 30,
    coldPercent: 0,
    coldDays: 0,
  };
  const w = calculateWorkload(mixed, retention, 4);
  const [camera, telemetry, logs] = w.streams;
  close(camera.storedMonthTb, camera.generatedMonthTb, 1e-12);
  close(telemetry.storedMonthTb, telemetry.generatedMonthTb / 4, 1e-12);
  close(logs.storedMonthTb, logs.generatedMonthTb / 4, 1e-12);
  close(telemetry.storedKb, 0.25, 1e-12);
  close(w.retainedTb, w.storedMonthTb, 1e-12);
});

test("Foxglove marginal tiers", () => {
  const tiers = [
    { upTo: 10, rate: 50 },
    { upTo: 100, rate: 40 },
    { upTo: null, rate: 30 },
  ];
  assert.equal(marginalCost(0.5, 1, tiers), 0);
  assert.equal(marginalCost(10, 1, tiers), 450);
  assert.equal(marginalCost(110, 1, tiers), 450 + 3_600 + 300);
});

test("Foxglove stores hot and cold at one price and indexes the hot share", () => {
  const retention = {
    hotPercent: 50,
    hotDays: 30,
    coldPercent: 10,
    coldDays: 180,
  };
  const big = { ...oneStream, units: 1000 };
  const result = compare(big, retention, config());
  const part = (label) =>
    result.alternative.components.find((c) => c.label === label).amountYear;
  const f = pricingConfig.foxglove;
  close(
    part("Storage"),
    12 * marginalCost(result.workload.retainedTb, 1, f.storageUsdPerTbMonth),
    1e-6,
  );
  close(
    part("Indexing"),
    12 * marginalCost(MONTH_TB * 1000 * 0.5, 1, f.indexingUsdPerTb),
    1e-6,
  );
  close(part("Platform"), 12 * (20 + (1000 - 5) * 20), 1e-6);
});

const mixed = {
  units: 5,
  recordingHoursPerDay: 8,
  streams: [
    stream("Cameras", 2, 10, 150, "blob"),
    stream("Telemetry", 1, 100, 2, "metric"),
    stream("Events", 1, 1, 2, "metadata"),
  ],
};

test("time-series databases keep telemetry; binary data goes to object storage", () => {
  const result = compare(
    mixed,
    { hotPercent: 100, hotDays: 30, coldPercent: 10, coldDays: 90 },
    config({ competitor: "influx" }),
  );
  assert.equal(result.alternative.label, "InfluxDB + AWS S3");
  assert.deepEqual(result.alternative.routes, [
    { target: "InfluxDB", streams: ["Telemetry", "Events"] },
    { target: "AWS S3", streams: ["Cameras"] },
  ]);
});

test("InfluxDB on Timestream and TimescaleDB on Tiger Cloud, by hand", () => {
  const retention = {
    hotPercent: 100,
    hotDays: 30,
    coldPercent: 10,
    coldDays: 90,
  };
  const telemetryOnly = { ...mixed, streams: mixed.streams.slice(1) };
  const w = calculateWorkload(telemetryOnly, retention, 5);
  const part = (result, label) =>
    result.alternative.components.find((c) => c.label === label).amountYear;

  const influx = compare(
    telemetryOnly,
    retention,
    config({ competitor: "influx", compression: 5 }),
  );
  close(part(influx, "Compute"), 12 * 2 * 0.528 * 730, 1e-6);
  close(part(influx, "Storage"), 12 * w.retainedTb * 1000 * 0.023, 1e-6);
  close(part(influx, "Data out"), 12 * w.retainedTb * 0.05 * 90, 1e-6);

  const tiger = compare(
    telemetryOnly,
    retention,
    config({ competitor: "timescale", compression: 5 }),
  );
  close(part(tiger, "Compute"), 12 * 2 * 240, 1e-6);
  // The newest 7 of the 30 hot days are on primary storage, doubled by the HA
  // replica; the rest of the hot data and all cold data are tiered.
  const primaryTb = (w.hotTb * 7) / 30;
  close(
    part(tiger, "Storage"),
    12 *
      (primaryTb * 1000 * 0.177 * 2 +
        (w.hotTb - primaryTb + w.coldTb) * 1000 * 0.021),
    1e-6,
  );
});

test("engineering: 4 hours a month for ReductStore and Foxglove, 16 for a database", () => {
  const retention = {
    hotPercent: 100,
    hotDays: 30,
    coldPercent: 0,
    coldDays: 0,
  };
  const engineering = (side) =>
    side.components.find((c) => c.label === "Engineering").amountYear;
  const fox = compare(
    mixed,
    retention,
    config({ engineeringRate: 90, currency: "EUR" }),
  );
  close(engineering(fox.reduct), 12 * 4 * 90, 1e-9);
  close(engineering(fox.alternative), 12 * 4 * 90, 1e-9);
  const db = compare(
    mixed,
    retention,
    config({ engineeringRate: 90, competitor: "influx" }),
  );
  close(engineering(db.alternative), 12 * 16 * 90, 1e-9);
});

test("binary data next to a database is one object per record", () => {
  const retention = {
    hotPercent: 100,
    hotDays: 30,
    coldPercent: 0,
    coldDays: 0,
  };
  const result = compare(
    oneStream,
    retention,
    config({ competitor: "timescale" }),
  );
  assert.equal(result.alternative.label, "AWS S3");
  const requests = result.alternative.components.find(
    (c) => c.label === "Requests and retrieval",
  ).amountYear;
  const records = 86_400 * 30;
  close(
    requests,
    12 * ((records / 1000) * 0.005 + ((records * 0.05) / 1000) * 0.0004),
    1e-6,
  );
});

test("USD shows cloud and competitor prices as listed; EUR converts them", () => {
  const retention = {
    hotPercent: 100,
    hotDays: 30,
    coldPercent: 10,
    coldDays: 90,
  };
  const usd = compare(oneStream, retention, config({ currency: "USD" }));
  const eur = compare(oneStream, retention, config({ currency: "EUR" }));
  for (const c of usd.alternative.components) {
    const inEur = eur.alternative.components.find((x) => x.label === c.label);
    close(inEur.amountYear, c.amountYear * pricingConfig.fx.usdToEur, 1e-6);
  }
});

// The default example worked by hand from the published price lists:
// 10 robots, 8 h a day; 20% hot for 90 days, 5% cold for 90 more days;
// telemetry and logs compressed 5 times.
test("cross-check: mobile robot on S3 vs Foxglove, in USD, by hand", () => {
  const binaryKbPerSecond = 2 * 10 * 150 + 10 * 1000;
  const telemetryKbPerSecond = 100 * 0.5 + 100 * 0.2 + 10 * 5;
  const kbPerSecond = binaryKbPerSecond + telemetryKbPerSecond / 5;
  const monthTb = (kbPerSecond * 10 * 8 * 3600 * 30) / 1e9;
  const hotTb = monthTb * 0.2 * 3;
  const coldTb = monthTb * 0.05 * 3;
  const retainedTb = hotTb + coldTb;
  close(monthTb, 112.52736, 1e-9);
  close(retainedTb, 84.39552, 1e-9);

  // Foxglove Pro per month: base, 5 devices beyond the 5 included, storage
  // and indexing and bandwidth over their included amounts, 20 query hours.
  const storage = 9 * 50 + (retainedTb - 10) * 40;
  const indexing = 9 * 35 + (monthTb * 0.2 - 10) * 28;
  const bandwidth = (retainedTb * 0.05 - 0.1) * 150;
  const query = 9 * 3.65 + 10 * 2.75;
  const foxglove =
    12 * (20 + 5 * 20 + storage + indexing + bandwidth + query) + 12 * 4 * 100;

  // ReductStore: $18 per TB a month; hot in S3 Standard at $23 per TB, cold
  // in Glacier Instant Retrieval at $4 per TB (90 days fits its minimum,
  // telemetry is batched per second so its blocks are large enough);
  // 5% read out at $0.09 per GB; two m7i.xlarge at $0.2016 an hour; 4 hours
  // of engineering a month at $100.
  const license = 12 * retainedTb * 18;
  const s3Storage = 12 * (hotTb * 23 + coldTb * 4);
  const dataOut = 12 * retainedTb * 0.05 * 90;
  const servers = 12 * 2 * 0.2016 * 730;
  const engineering = 12 * 4 * 100;

  const preset = PRESETS.find((p) => p.id === "mobile-robot");
  const result = compare(
    preset,
    preset.retention,
    config({ compression: 5, engineeringRate: 100 }),
  );
  const part = (label) =>
    result.reduct.components.find((c) => c.label === label).amountYear;
  close(result.alternative.totalYear, foxglove, 1e-6);
  close(part("ReductStore license"), license, 1e-6);
  close(part("AWS S3 storage"), s3Storage, 1e-6);
  close(part("Data out"), dataOut, 1e-6);
  close(part("Servers"), servers, 1e-6);
  assert.ok(part("Requests and retrieval") < 0.02 * result.reduct.totalYear);
  close(
    result.reduct.totalYear,
    license +
      s3Storage +
      dataOut +
      servers +
      engineering +
      part("Requests and retrieval"),
    1e-6,
  );
});

test("in the cloud, every example is cheaper than every competitor", () => {
  assert.deepEqual(
    PRESETS.map((p) => [p.id, p.competitor]),
    [
      ["mobile-robot", "foxglove"],
      ["autonomous-vehicle", "foxglove"],
      ["drone", "foxglove"],
      ["industrial-robot", "foxglove"],
      ["vibration", "timescale"],
      ["plc", "timescale"],
      ["computer-vision", "timescale"],
      ["custom", "timescale"],
    ],
  );
  for (const preset of PRESETS) {
    for (const backend of ["aws", "azure"]) {
      for (const currency of ["EUR", "USD"]) {
        for (const competitor of ["foxglove", "influx", "timescale"]) {
          const result = compare(
            preset,
            preset.retention,
            config({
              backend,
              currency,
              competitor,
              compression: 5,
              engineeringRate: currency === "EUR" ? 130 : 150,
            }),
          );
          const tag = `${preset.id} ${backend} ${currency} ${competitor}`;
          const percent = result.savingPercent;
          assert.ok(percent >= 5 && percent < 80, `${tag} ${percent}%`);
        }
      }
    }
  }
});
