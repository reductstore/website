# Regenerate with: python3 build.py
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[3] / "scripts/diagrams"))
from blogkit import Diagram, render_social  # noqa: E402

HERE = Path(__file__).parent


def architecture():
    d = Diagram()
    d.panel(0, 110, 290, 190, "Drones", anchor="start")
    for i, name in enumerate(["images", "sensors", "logs"]):
        y = 176 + i * 40
        d.text(84, y + 5, name, "text-label", "end", mono=True)
        d.line((92, y), (116, y), (116, 216))
    d.arrow((116, 216), (132, 216))
    d.item(136, 186, 136, 60, "ReductStore", brand=True)

    d.panel(400, 110, 180, 190, "Ground Station", anchor="start")
    d.item(422, 186, 136, 60, "ReductStore", brand=True)

    d.panel(690, 30, 180, 340, "Cloud", anchor="start")
    d.item(712, 110, 136, 60, "ReductStore", brand=True)
    d.line((780, 170), (780, 240), dashed=True)
    d.item(712, 240, 136, 70, "S3 storage", "backend", accent=True, mono_sub=False)
    d.text(780, 348, "N replicas", "text-note")

    for a, b in ((290, 396), (580, 686)):
        d.arrow((a + 12, 216), (b, 216))
        d.text((a + 12 + b) / 2, 244, "subset of data", "text-note")
    return d


def workflow():
    d = Diagram()
    d.card(0, 0, 284, 80, "Drone sensors", "camera, IMU, lidar")
    d.arrow((142, 80), (142, 141))
    d.card(0, 145, 284, 96, "Edge ReductStore", bullets=["write with labels", "FIFO retention"], brand=True)
    d.arrow((142, 241), (142, 321))
    d.text(152, 286, "(when trusted link is available)", "text-note", "start")
    d.card(0, 325, 284, 96, "Replication task", bullets=["filter by labels", "include context"])
    d.arrow((142, 421), (142, 501))
    d.card(0, 505, 284, 80, "Ground ReductStore", bullets=["query & audit"], brand=True)
    return d


if __name__ == "__main__":
    workflow().save(HERE / "drone-workflow.svg")
    diagram = architecture()
    diagram.save(HERE / "architecture-drone.svg")
    render_social(diagram, HERE / "architecture-drone-social.png")
