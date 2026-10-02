# Regenerate with: python3 build.py
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[3] / "scripts/diagrams"))
from blogkit import Diagram  # noqa: E402

HERE = Path(__file__).parent


# Records are colored by label. Edge devices keep every label, the factory
# drops "c", and the cloud keeps only "a".
EDGE = "abacaacab"
FACTORY = "abaabaaba"
CLOUD = "a"


def bucket(d, x, y, w, h, label, rows=2, labels=None):
    d.rect(x, y, w, h, "card-brand-frame", 10)
    label_w = len(label) * 8.6 + 24
    row_h = (h - 16 - (rows - 1) * 6) / rows
    for r in range(rows):
        pattern = labels[r * 3 % len(labels):] + labels[: r * 3 % len(labels)] if labels else None
        d.records(x + 12, y + 8 + r * (row_h + 6), w - label_w - 24, row_h, labels=pattern)
    d.text(x + w - 14, y + h / 2 + 5, label, "text-item-brand", "end")


def tiers():
    d = Diagram()
    left, right = 120, 730
    for y, name in ((22, "Cloud"), (252, "Factory"), (482, "Shop Floor")):
        d.text(0, y, name, "text-zone", "start")
    for y in (212, 442):
        d.guide((0, y), (right, y))

    d.panel(left, 0, 610, 180, "Cloud Instance #1", anchor="start")
    bucket(d, left + 22, 52, 370, 104, "Bucket", labels=CLOUD)
    d.card(left + 440, 64, 150, 80, "Cloud Storage", "object storage", accent=True)
    d.arrow((left + 392, 104), (left + 436, 104))

    d.panel(left, 232, 610, 180, "Central Storage", anchor="start")
    bucket(d, left + 22, 284, 250, 104, "Bucket #1", labels=FACTORY)
    d.ellipsis(left + 305, 336)
    bucket(d, left + 338, 284, 250, 104, "Bucket #N", labels=FACTORY)

    for x, name in ((left, "Edge Device #1"), (left + 350, "Edge Device #N")):
        d.panel(x, 462, 260, 130, name, anchor="start")
        bucket(d, x + 22, 512, 216, 56, "FIFO", rows=1, labels=EDGE)
        d.card(x + 105, 650, 150, 70, "Machine", "sensors, PLC")
        d.arrow((x + 180, 650), (x + 180, 572))
        d.arrow((x + 180, 512), (x + 180, 392))
    d.ellipsis(left + 305, 527)
    d.arrow((left + 180, 284), (left + 180, 160))
    return d


def edge_device():
    d = Diagram()
    d.zone(0, 120, 196, 350, "Machine")
    sources = [("Automation system", "PLC", "OPC UA"), ("Sensor", "IO-Link device", "IO-Link"), ("CV camera", "GenICam", "GenICam")]
    d.zone(222, 120, 646, 440, "Edge Device")
    d.panel(414, 160, 300, 374, "ReductStore bucket", brand=True, anchor="start")
    entries = ["OPC UA", "Vibration", "Images"]
    for i, ((name, sub, protocol), entry) in enumerate(zip(sources, entries)):
        cy = 222 + i * 90
        d.item(14, cy - 30, 168, 60, name, sub)
        d.item(236, cy - 28, 160, 56, f"{protocol} connector")
        d.arrow((182, cy), (232, cy))
        ey = 206 + i * 62
        d.rect(432, ey, 264, 46, "card-plain", 8)
        d.records(442, ey + 9, 164, 28, labels=EDGE[i:] + EDGE[:i])
        d.text(684, ey + 28, entry, "text-label-strong", "end")
        d.line((396, cy), (410, cy), (410, ey + 23))
        d.arrow((410, ey + 23), (428, ey + 23))
        d.arrow((696, ey + 23), (732, ey + 23))
    d.arrow((98, 252), (98, 278))
    bullets = [
        "FIFO disk quota",
        "Fast ingestion",
        "Data labeling",
        "Append-only replication",
        "Data reduction by labels",
        "Survives network outages",
    ]
    for i, text in enumerate(bullets):
        d.text(434, 410 + i * 20, f"• {text}", "text-label", "start")
    d.item(736, 200, 100, 166, "Replication")
    d.card(696, 0, 180, 70, "Central Storage", "factory tier")
    d.arrow((786, 200), (786, 74))
    return d


def factory():
    d = Diagram()
    d.card(40, 0, 220, 76, "Cloud Storage", "cloud tier")
    d.panel(0, 130, 700, 330, "Central Storage", anchor="end")
    d.item(22, 150, 420, 50, "Replication")
    bucket(d, 22, 250, 290, 104, "Bucket #1", labels=FACTORY)
    d.ellipsis(350, 302)
    bucket(d, 388, 250, 290, 104, "Bucket #N", labels=FACTORY)
    d.text(292, 396, "• Fast access", "text-bullet", "start")
    d.text(292, 420, "• Data management by labels", "text-bullet", "start")
    d.arrow((150, 150), (150, 80))
    d.arrow((150, 250), (150, 204))
    d.line((533, 250), (533, 226), (360, 226))
    d.arrow((360, 226), (360, 204))
    for x, name in ((50, "Edge Device #1"), (430, "Edge Device #N")):
        d.card(x, 520, 220, 76, name, "ReductStore")
        d.arrow((x + 110, 520), (x + 110, 358))
    d.ellipsis(350, 558)
    return d


def cloud():
    d = Diagram()
    d.panel(0, 0, 820, 100, "Control Plane")
    for i, text in enumerate(["Automated deployment", "Metrics and diagnostics", "Cloud resource management"]):
        d.text(22, 36 + i * 22, f"• {text}", "text-label", "start")

    d.zone(0, 140, 404, 400, "Cloud Instance #1")
    d.text(380, 166, "• Cost-effective storage", "text-label", "end")
    d.text(380, 186, "• Fully managed instance", "text-label", "end")
    d.panel(20, 204, 236, 310, "ReductStore instance", brand=True, anchor="start")
    bucket(d, 38, 254, 200, 238, "Bucket", rows=5, labels=CLOUD)
    d.item(276, 264, 108, 54, "ETL logic")
    d.item(276, 408, 108, 54, "FUSE driver")

    d.zone(430, 140, 200, 400, "Cloud Services")
    d.item(448, 250, 164, 80, "Aggregated data", "tables")
    d.item(448, 395, 164, 80, "Object storage", "S3, Azure Blob")
    d.arrow((256, 291), (272, 291))
    d.arrow((384, 291), (444, 291))
    d.arrow((256, 435), (272, 435), both=True)
    d.arrow((384, 435), (444, 435), both=True)

    for i, name in enumerate(["Cloud Instance #2", "Cloud Instance #3"]):
        d.item(660, 140 + i * 96, 160, 72, name, "ReductStore")
    d.ellipsis(740, 352)
    d.item(660, 468, 160, 72, "Cloud Instance #N", "ReductStore")

    d.card(30, 600, 200, 76, "Factory Storage", "ReductStore")
    d.arrow((130, 600), (130, 544))
    return d


if __name__ == "__main__":
    for name, draw in (("daq-tiers", tiers), ("daq-edge-device", edge_device), ("daq-factory", factory), ("daq-cloud", cloud)):
        draw().save(HERE / f"{name}.svg")
        print(name)
