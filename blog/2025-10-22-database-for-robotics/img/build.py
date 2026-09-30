# Regenerate with: python3 build.py
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[3] / "scripts/diagrams"))
from blogkit import Diagram  # noqa: E402

HERE = Path(__file__).parent


def cloud_integration():
    d = Diagram()
    d.card(0, 40, 130, 80, "Records")
    d.card(180, 40, 160, 80, "ReductStore", brand=True)
    d.panel(390, 0, 170, 160, "Blocks")
    for i in range(3):
        d.records(408, 48 + i * 34, 134, 24, count=5, gap=4, width=22)
    d.card(610, 40, 120, 80, "S3")
    for a, b in ((130, 176), (340, 386), (560, 606)):
        d.arrow((a, 80), (b, 80))
    return d


def listing(d, x, y, w, h, title, lines):
    d.rect(x, y, w, h, "card-standard", 16)
    d.text(x + w / 2, y + 30, title, "text-item")
    for i, line in enumerate(lines):
        d.text(x + w / 2, y + 52 + i * 18, line, "text-label")


def bridge():
    d = Diagram()
    listing(d, 0, 0, 200, 96, "Data processing", ["Downstream users, ELT", "pipelines, Jupyter notebooks"])
    listing(d, 0, 124, 200, 96, "Visualization", ["Foxglove, Grafana,", "custom dashboards"])
    d.zone(260, 0, 220, 220)
    d.item(280, 24, 180, 56, "ReductStore", brand=True)
    d.line((370, 80), (370, 136), dashed=True)
    d.item(280, 136, 180, 60, "S3 storage", "backend", mono_sub=False)
    d.arrow((204, 48), (276, 48), both=True)
    d.text(240, 38, "SDKs", "text-note")
    d.arrow((260, 172), (204, 172))

    d.zone(0, 270, 590, 130)
    for i, topic in enumerate(["/camera/image", "/vectornav/IMU", "/rosout"]):
        y = 300 + i * 34
        d.text(130, y + 5, topic, "text-label", "end", mono=True)
        d.line((138, y), (160, y), (160, 334))
    d.arrow((160, 334), (196, 334))
    d.item(200, 306, 150, 56, "ReductBridge", brand=True)
    d.arrow((350, 334), (396, 334))
    d.item(400, 306, 160, 56, "ReductStore", brand=True)
    d.arrow((560, 334), (620, 334), (620, 110), (484, 110))
    d.text(628, 214, "replicate", "text-note", "start")
    d.text(628, 232, "subset of data", "text-note", "start")
    return d


def observability():
    d = Diagram()
    d.panel(0, 0, 720, 194, "Canonical Observability Stack for Robotics")
    top = [
        ("Prometheus", False), ("Grafana", False), ("Loki", False),
        ("ReductStore", True), ("Foxglove Studio", False), ("COS registration server", False),
    ]
    for i, (name, brand) in enumerate(top):
        x, y = 20 + (i % 3) * 235, 50 + (i // 3) * 70
        d.item(x, y, 210, 56, name, "S3 backend" if name == "ReductStore" else None, brand=brand)
    d.arrow((360, 270), (360, 198))
    d.text(372, 240, "data flow", "text-note", "start")
    d.panel(0, 270, 720, 264, "Device")
    device = [
        ("Grafana agent", False), ("ReductStore", True), ("COS registration agent", False),
        ("Configuration Snap", False), ("Foxglove bridge", False), ("ReductStore agent", True),
        ("ROS", False),
    ]
    for i, (name, brand) in enumerate(device):
        x, y = 20 + (i % 3) * 235, 320 + (i // 3) * 70
        d.item(x, y, 210, 56, name, brand=brand)
    return d


if __name__ == "__main__":
    cloud_integration().save(HERE / "cloud-integration.svg")
    bridge().save(HERE / "reduct-bridge-architecture.svg")
    observability().save(HERE / "observability-stack.svg")
