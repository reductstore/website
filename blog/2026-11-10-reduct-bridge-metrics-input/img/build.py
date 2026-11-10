# Regenerate with: python3 build.py
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[3] / "scripts/diagrams"))
from blogkit import Diagram, render_social  # noqa: E402

HERE = Path(__file__).parent


def metrics_input_flow():
    d = Diagram()
    d.zone(0, 0, 440, 330, "Edge host")
    d.item(20, 50, 150, 64, "Host", "CPU·memory·disk")
    d.item(20, 180, 150, 64, "Industrial data", "robotics via MQTT")
    d.item(230, 95, 190, 100, "ReductBridge", "metrics + mqtt inputs", accent=True)

    d.panel(500, 0, 240, 330, "ReductStore", brand=True, anchor="start")
    d.text(520, 75, "edge-data", "text-item", "start", mono=True)
    d.text(520, 105, "metrics/cpu", "text-label", "start", mono=True)
    d.records(520, 112, 200, 18, count=10)
    d.text(520, 150, "metrics/memory", "text-label", "start", mono=True)
    d.records(520, 157, 200, 18, count=10)
    d.text(520, 195, "metrics/disk", "text-label", "start", mono=True)
    d.records(520, 202, 200, 18, count=10)
    d.text(520, 240, "camera/frame", "text-label", "start", mono=True)
    d.hatch(520, 247, 200, 18)
    d.text(520, 300, "one shared time index", "text-note", "start")

    d.arrow((170, 82), (226, 120))
    d.text(220, 66, "host metrics", "text-label", mono=True)
    d.arrow((170, 212), (226, 170))
    d.text(196, 240, "MQTT", "text-label", mono=True)
    d.arrow((420, 145), (496, 145))
    d.text(458, 126, "JSON", "text-label", mono=True)
    return d


if __name__ == "__main__":
    diagram = metrics_input_flow()
    diagram.save(HERE / "metrics-input-flow.svg")
    render_social(diagram, HERE / "metrics-input-social.png")
