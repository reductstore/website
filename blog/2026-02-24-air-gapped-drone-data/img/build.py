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
    d.item(712, 240, 136, 70, "S3 storage", "backend", mono_sub=False)
    d.text(780, 348, "N replicas", "text-note")

    for a, b in ((290, 396), (580, 686)):
        d.arrow((a + 12, 216), (b, 216))
        d.text((a + 12 + b) / 2, 244, "subset of data", "text-note")
    return d


if __name__ == "__main__":
    diagram = architecture()
    diagram.save(HERE / "architecture-drone.svg")
    render_social(diagram, HERE / "architecture-drone-social.png")
