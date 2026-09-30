# Regenerate with: python3 build.py
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[3] / "scripts/diagrams"))
from blogkit import Diagram  # noqa: E402

HERE = Path(__file__).parent
METRICS = ["+ RMS", "+ Peak-to-Peak", "+ Crest Factor"]
W = 170


def record(d, x, y, name=None, flagged=False, inverse=False):
    """Labels with pre-processed metrics above the binary chunk they describe.
    Flagged labels match the replication filter."""
    d.text(x, y - 8, "Label", "text-label-inverse" if inverse else "text-label", "start")
    d.rect(x, y, W, 82, "card-brand" if flagged else "card-plain", 10)
    for i, metric in enumerate(METRICS):
        d.text(x + 16, y + 24 + i * 22, metric, "text-bullet-inverse" if flagged else "text-bullet", "start")
    d.hatch(x, y + 92, W, 44)
    if name:
        d.text(x + W / 2, y + 160, name, "text-label-inverse" if inverse else "text-label")


def data_flow():
    d = Diagram()
    d.card(0, 92, 180, 76, "Vibration sensor")
    d.arrow((180, 130), (276, 130))
    d.text(228, 120, "raw data", "text-label", mono=True)
    d.item(280, 100, 170, 60, "Pre-processing")
    d.arrow((450, 130), (506, 130))
    d.panel(510, 0, 250, 262, "ReductStore record", brand=True)
    record(d, 535, 72, "binary chunk", inverse=True)
    return d


def timeline(d, x, y, indexes, flagged):
    for i, n in enumerate(indexes):
        cx = x + i * (W + 4)
        record(d, cx, y, f"Binary chunk {n}", flagged=n in flagged)
        d.guide((cx, y + 136), (cx, y + 196))
        d.text(cx, y + 214, f"timestamp {n}", "text-label", mono=True)


def replication():
    d = Diagram()
    left = 200
    d.panel(0, 0, 750, 300, "ReductStore (Cloud Server)", anchor="start")
    d.text(24, 150, "Replication with", "text-item", "start")
    d.text(24, 172, "reduction strategy", "text-item", "start")
    timeline(d, left + W + 4, 70, [2, 3], {2, 3})
    d.guide((0, 380), (750, 380))
    d.text(750, 370, "network", "text-label", "end", mono=True)
    for n in (2, 3):
        x = left + (n - 1) * (W + 4) + W / 2
        d.arrow((x, 490), (x, 310))
    d.panel(0, 440, 750, 300, "ReductStore (Edge Server)", anchor="start")
    timeline(d, left, 510, [1, 2, 3], {2, 3})
    return d


def bucket_replication():
    d = Diagram()
    d.card(0, 110, 130, 76, "Vibration", "sensor", mono_sub=False)
    d.arrow((130, 148), (176, 148))
    d.panel(180, 0, 580, 270, "sensor_data", anchor="start")
    for i, flagged in enumerate((False, False, True)):
        record(d, 202 + i * (W + 16), 80, f"Binary chunk {i + 1}", flagged=flagged)
    d.panel(180, 380, 580, 230, "backup_data", anchor="start")
    record(d, 202, 460, flagged=True)
    d.ellipsis(470, 572)
    record(d, 574, 460, flagged=True)
    d.arrow((659, 262), (659, 376))
    d.text(649, 332, "replication task", "text-label", "end", mono=True)
    return d


if __name__ == "__main__":
    for name, draw in (
        ("vibration-data-flow", data_flow),
        ("vibration-replication", replication),
        ("vibration-bucket-replication", bucket_replication),
    ):
        draw().save(HERE / f"{name}.svg")
        print(name)
