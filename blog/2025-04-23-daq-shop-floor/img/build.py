# Regenerate with: python3 build.py
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[3] / "scripts/diagrams"))
from blogkit import Diagram, render_social  # noqa: E402

HERE = Path(__file__).parent


# Records are colored by label, as in the manufacturing DAQ post. "a" stands for
# records with a score above 0.8, the only ones the replication task forwards.
EDGE = "abacaacab"
DEMO = "a"


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
    d.card(696, 0, 180, 70, "Central Storage", "factory or cloud")
    d.arrow((786, 200), (786, 74))
    return d


def demo_setup():
    d = Diagram()
    d.zone(0, 0, 740, 280, "DAQ edge device")
    d.item(20, 108, 150, 70, "Data source", "data_source.py")
    d.panel(210, 50, 300, 206, "ReductStore", "bucket: data", brand=True, anchor="start")
    d.rect(230, 120, 260, 46, "card-plain", 8)
    d.records(240, 129, 140, 28, labels=EDGE)
    d.text(478, 148, "scored_data", "text-label-strong", "end")
    d.text(232, 202, "• FIFO quota, 1GB", "text-label", "start")
    d.text(232, 226, "• Replication task: repl-task", "text-label", "start")
    d.item(550, 108, 170, 70, "Replication", "&score > 0.8", accent=True)

    d.zone(790, 0, 340, 280, "Demo server")
    d.panel(810, 50, 300, 206, "ReductStore", "bucket: demo", brand=True, anchor="start")
    d.rect(830, 120, 260, 46, "card-plain", 8)
    d.records(840, 129, 140, 28, labels=DEMO)
    d.text(1078, 148, "scored_data", "text-label-strong", "end")
    d.text(832, 202, "play.reduct.store", "text-label", "start", mono=True)

    d.arrow((170, 143), (226, 143))
    d.arrow((490, 143), (546, 143))
    d.arrow((720, 143), (826, 143))
    return d


if __name__ == "__main__":
    edge_device().save(HERE / "daq-edge-device.svg")
    diagram = demo_setup()
    diagram.save(HERE / "demo-setup.svg")
    render_social(diagram, HERE / "demo-setup-social.png")
