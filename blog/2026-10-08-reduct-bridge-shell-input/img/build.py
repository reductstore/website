# Regenerate with: python3 build.py
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[3] / "scripts/diagrams"))
from blogkit import Diagram, render_social  # noqa: E402

HERE = Path(__file__).parent


def shell_input_flow():
    d = Diagram()
    d.zone(0, 0, 160, 170, "Legacy machine")
    d.item(15, 60, 130, 70, "Vendor tool", "status output")

    d.zone(190, 0, 550, 350, "Edge device")
    d.item(215, 60, 140, 70, "Shell script", "chamber-status")
    d.item(405, 60, 160, 70, "Reduct Bridge", "shell input", accent=True)

    d.panel(215, 180, 500, 145, "ReductStore", brand=True, anchor="start")
    d.item(235, 230, 170, 60, "factory-data")
    d.text(440, 245, "chamber-01/status", "text-item", "start", mono=True)
    d.records(440, 260, 240, 24, count=12, labels="abac")
    d.text(440, 310, "time-indexed records", "text-label", "start", mono=True)

    d.arrow((145, 95), (211, 95))
    d.text(177, 150, "SSH / serial", "text-label", mono=True)
    d.arrow((355, 95), (401, 95))
    d.text(378, 76, "stdout", "text-label", mono=True)
    d.arrow((485, 130), (485, 176))
    return d


if __name__ == "__main__":
    diagram = shell_input_flow()
    diagram.save(HERE / "shell-input-flow.svg")
    render_social(diagram, HERE / "shell-input-social.png")
