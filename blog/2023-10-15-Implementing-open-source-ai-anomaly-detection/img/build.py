# Regenerate with: python3 build.py
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[3] / "scripts/diagrams"))
from blogkit import Diagram, render_social  # noqa: E402

HERE = Path(__file__).parent


def pipeline():
    d = Diagram()

    # The end-to-end path the tutorial walks: capture, score, store, review.
    d.card(0, 26, 150, 76, "Camera", "frames")
    d.arrow((150, 64), (206, 64))
    d.card(206, 20, 170, 92, "Anomalib", bullets=["train a model", "score each frame"])
    d.arrow((376, 64), (520, 64))
    d.text(448, 52, "frame + score", "text-label", "middle", mono=True)
    d.item(520, 28, 200, 72, "ReductStore", "camera-1 entry", brand=True)

    # Reviewed frames feed the next training set.
    d.arrow((620, 100), (620, 150), (291, 150), (291, 112))
    d.text(455, 170, "review flagged frames, build the next training set", "text-note")

    return d


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
    d.zone(40, 236, 330, 140, "matching frames")
    d.records(95, 288, 220, 36, count=3, labels="ccc")
    d.text(72, 352, "the same records, image and labels", "text-label", "start")

    # Head read: labels come back, the payloads stay in the store.
    d.arrow((500, 170), (500, 224))
    d.text(513, 198, "head read", "text-label-strong", "start")
    d.zone(410, 236, 190, 140, "labels only")
    d.text(432, 290, "anomaly_score", "text-label", "start", mono=True)
    d.text(432, 312, "anomaly", "text-label", "start", mono=True)
    d.text(432, 334, "model", "text-label", "start", mono=True)
    d.text(432, 360, "payloads stay in the store", "text-note", "start")

    return d


if __name__ == "__main__":
    lead = pipeline()
    lead.save(HERE / "anomaly-pipeline.svg")
    render_social(lead, HERE / "anomaly-pipeline-social.png")
    anomaly_query().save(HERE / "anomaly-query.svg")
