# Regenerate with: python3 build.py
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[3] / "scripts/diagrams"))
from blogkit import Diagram, render_social  # noqa: E402

HERE = Path(__file__).parent


def flow():
    d = Diagram()
    cw, gap = 270, 60
    cx = cw + gap / 2
    lx, rx = cw / 2, cw + gap + cw / 2
    d.card(cx - 140, 0, 280, 80, "Robot sensors", "camera, LiDAR, waveform")
    d.arrow((cx, 80), (cx, 126))
    d.card(cx - 140, 130, 280, 80, "Processing and fan-out", "event time + stable IDs")
    d.line((cx, 210), (cx, 242))
    d.line((lx, 242), (rx, 242))
    d.arrow((lx, 242), (lx, 306))
    d.arrow((rx, 242), (rx, 306))
    d.text(lx + 10, 272, "numeric metrics", "text-label", "start", mono=True)
    d.text(rx - 10, 272, "raw binary payloads", "text-label-strong", "end", mono=True)
    d.card(0, 310, cw, 80, "InfluxDB", "metrics, dashboards, alerts")
    d.card(cw + gap, 310, cw, 80, "ReductStore", "frames, scans, chunks", brand=True)
    d.line((lx, 402), (lx, 426), (rx, 426), (rx, 402), dashed=True)
    d.text(cx, 450, "same event time, robot_id, sensor_id", "text-label", mono=True)
    return d


if __name__ == "__main__":
    diagram = flow()
    diagram.save(HERE / "influxdb-reductstore-flow.svg")
    render_social(diagram, HERE / "influxdb-reductstore-social.png")
