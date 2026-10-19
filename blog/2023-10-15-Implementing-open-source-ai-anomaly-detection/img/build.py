# Regenerate with: python3 build.py
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[3] / "scripts/diagrams"))
from blogkit import Diagram, render_social  # noqa: E402

HERE = Path(__file__).parent


def anomaly_query():
    d = Diagram()

    # The camera-1 entry: frames on a time axis, each carrying labels.
    d.panel(0, 0, 600, 170, "ReductStore", brand=True)
    d.text(30, 92, "camera-1", "text-label-strong", "start", mono=True)
    d.records(150, 70, 420, 42, count=12, labels="aacaaaacaaca")
    d.text(150, 132, "each record: image + anomaly_score, anomaly, model", "text-label", "start")
    d.arrow((150, 150), (545, 150))
    d.text(551, 154, "time", "text-note", "start")

    # Query: filter the same records by their score label.
    d.arrow((205, 170), (205, 224))
    d.text(218, 198, "query", "text-label-strong", "start")
    d.text(218, 216, "when &anomaly_score $gt 0.7", "text-note", "start", mono=True)
    d.zone(40, 236, 330, 118, "matching frames")
    d.records(95, 276, 220, 36, count=3, labels="ccc")
    d.text(72, 336, "the same records, image and labels", "text-label", "start")

    # Head read: labels come back, the payloads stay in the store.
    d.arrow((500, 170), (500, 224))
    d.text(513, 198, "head read", "text-label-strong", "start")
    d.zone(410, 236, 190, 118, "labels only")
    d.text(432, 272, "anomaly_score", "text-label", "start", mono=True)
    d.text(432, 294, "anomaly", "text-label", "start", mono=True)
    d.text(432, 316, "model", "text-label", "start", mono=True)
    d.text(432, 342, "payloads stay in the store", "text-note", "start")

    return d


if __name__ == "__main__":
    diagram = anomaly_query()
    diagram.save(HERE / "anomaly-query.svg")
    render_social(diagram, HERE / "anomaly-query-social.png")
