# Regenerate with: python3 build.py
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[3] / "scripts/diagrams"))
from blogkit import Diagram, render_social  # noqa: E402

HERE = Path(__file__).parent


def csv_record(d, x, y, w, stamp, labels):
    d.rect(x, y, w, 70, "card-plain", 8)
    d.text(x + 14, y + 22, stamp, "text-label", "start", mono=True)
    for i, label in enumerate(labels):
        d.rect(x + 14, y + 34 + i * 16, w - 28, 10, f"record label-{label}", 2)


def pipeline():
    d = Diagram()
    d.panel(0, 40, 240, 340, "ReductStore bucket", "entry: readings, text/csv", brand=True, anchor="start")
    for i, (stamp, labels) in enumerate((("t0", "ab"), ("t0 + 200 ms", "ab"), ("t0 + 400 ms", "ab"))):
        y = 110 + i * 86
        csv_record(d, 18, y, 204, stamp, labels)
        d.line((222, y + 35), (250, y + 35), (250, 200))
    d.text(120, 412, "stored records stay unchanged", "text-label", mono=True)

    d.zone(262, 0, 760, 420, "ReductStore server, at query time")
    d.panel(282, 40, 720, 340, "ReductSelect query pipeline", brand=True, anchor="start")
    d.item(302, 165, 120, 70, "CSV parser", "rows")
    d.item(452, 165, 140, 70, "1. export", "duration or rows")
    d.rect(622, 150, 110, 100, "card-plain", 8)
    for i in range(6):
        d.rect(634, 160 + i * 14, 86, 8, f"record label-{'ab'[i % 2]}", 2)
    d.text(677, 270, "one output record", "text-label")
    d.card(762, 150, 220, 100, "2. Apache DataFusion", "SQL engine", accent=True)
    d.text(872, 280, "SELECT AVG(temperature)", "text-label", mono=True)
    d.text(872, 298, "FROM ENTRY()", "text-label", mono=True)

    d.zone(1052, 0, 250, 420, "Client")
    d.item(1067, 165, 220, 70, "Query response", "not new stored records")
    d.item(1067, 300, 220, 60, "Saved file", "CSV or Parquet")

    d.arrow((250, 200), (298, 200))
    d.arrow((422, 200), (448, 200))
    d.arrow((592, 200), (618, 200))
    d.arrow((732, 200), (758, 200))
    d.arrow((982, 185), (1063, 185))
    d.arrow((522, 235), (522, 345), (1032, 345), (1032, 220), (1063, 220), dashed=True)
    d.text(777, 336, "export only, no SQL", "text-label", mono=True)
    d.arrow((1177, 235), (1177, 296))
    return d


def cover():
    d = Diagram()
    rows = [
        "press-01,45.2,RUNNING",
        "press-02,51.8,RUNNING",
        "press-01,47.0,RUNNING",
        "press-02,58.3,ALARM",
        "press-01,62.4,ALARM",
        "press-02,55.1,RUNNING",
    ]
    d.panel(0, 0, 300, 250, "Stored record", "text/csv", brand=True, anchor="start")
    d.text(20, 92, "station,temperature,state", "text-label-strong", "start", mono=True)
    for i, row in enumerate(rows):
        d.text(20, 116 + i * 20, row, "text-label", "start", mono=True)

    d.item(350, 90, 220, 70, "ReductSelect", "SQL on the server", accent=True)
    d.text(460, 190, "WHERE state = 'ALARM'", "text-label", mono=True)

    d.panel(620, 55, 220, 140, "Result", brand=True, anchor="start")
    d.text(640, 112, "station,temperature", "text-label-strong", "start", mono=True)
    d.text(640, 136, "press-02,58.3", "text-label", "start", mono=True)
    d.text(640, 156, "press-01,62.4", "text-label", "start", mono=True)

    d.arrow((300, 125), (346, 125))
    d.arrow((570, 125), (616, 125))
    return d


if __name__ == "__main__":
    pipeline().save(HERE / "reductselect-server-pipeline.svg")
    render_social(cover(), HERE / "reductselect-cover.png")
