# Regenerate with: python3 build.py
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[3] / "scripts/diagrams"))
from blogkit import Diagram  # noqa: E402

HERE = Path(__file__).parent


def cells(d, x, y, values, size=34, gap=6):
    for i, value in enumerate(values):
        cx = x + i * (size + gap)
        d.rect(cx, y, size, size, "card-plain", 6)
        if value:
            d.text(cx + size / 2, y + size / 2 + 5, value, "text-label-strong", mono=True)
    return x + len(values) * (size + gap) - gap


def data_flow():
    d = Diagram()
    d.panel(0, 0, 250, 330, "Kafka broker", anchor="start")
    d.text(22, 72, "partitions", "text-label", "start", mono=True)
    rows = [["1", "4", "7", "", ""], ["2", "5", "8", "", ""], ["3", "6", "…", "", ""]]
    ends = []
    for i, row in enumerate(rows):
        y = 90 + i * 64
        ends.append((cells(d, 32, y, row), y + 18))
    d.arrow((32, 290), (220, 290))
    d.text(126, 312, "time", "text-label", mono=True)

    d.panel(380, 40, 360, 250, "ReductStore", brand=True, anchor="start")
    d.rect(400, 110, 320, 130, "card-plain", 12)
    d.text(418, 138, "bucket / entry", "text-label-strong", "start", mono=True)
    cells(d, 418, 156, ["1", "2", "3", "4", "…", "", ""])
    d.arrow((418, 212), (690, 212))
    d.text(554, 230, "time", "text-label", mono=True)

    merge_x = 320
    for x, y in ends:
        d.line((x + 12, y), (merge_x, y), (merge_x, 176))
    d.arrow((merge_x, 176), (396, 176))
    return d


if __name__ == "__main__":
    data_flow().save(HERE / "kafka-reductstore-flow.svg")
