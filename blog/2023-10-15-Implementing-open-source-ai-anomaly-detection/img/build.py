# Regenerate with: python3 build.py
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[3] / "scripts/diagrams"))
from blogkit import Diagram  # noqa: E402

HERE = Path(__file__).parent


EX = 297


def entry(d, y, name):
    d.rect(EX, y, 166, 44, "card-plain", 8)
    d.records(EX + 10, y + 8, 146, 28)
    d.text(EX + 83, y + 64, name, "text-label")


def ml_flow():
    d = Diagram()
    d.card(60, 0, 140, 56, "Camera", shadow=False)
    d.zone(0, 90, 500, 720, "Edge Device")
    d.item(60, 182, 140, 56, "Image capture")
    d.rect(20, 280, 170, 240, "card-plain", 12)
    d.item(35, 315, 140, 54, "Model inference")
    d.item(35, 420, 140, 54, "Model loader")
    d.text(105, 506, "Inference", "text-item")

    d.panel(270, 110, 210, 680, "ReductStore", brand=True, shadow=False)
    d.rect(285, 150, 180, 370, "card-plain", 12)
    d.text(EX, 176, "Data bucket", "text-label-strong", "start")
    for y, name in ((200, "original images"), (320, "labeled images"), (440, "annotated images")):
        entry(d, y, name)
    d.rect(285, 620, 180, 150, "card-plain", 12)
    d.text(EX, 646, "Model bucket", "text-label-strong", "start")
    entry(d, 678, "model versions")

    d.arrow((130, 56), (130, 178))
    d.arrow((200, 210), (293, 210))
    d.text(247, 200, "store", "text-label", mono=True)
    d.arrow((297, 234), (230, 234), (230, 326), (179, 326))
    d.text(224, 270, "subscribe", "text-label", "end", mono=True)
    d.arrow((175, 352), (293, 352))
    d.text(232, 374, "labeled", "text-label", mono=True)
    d.text(232, 390, "images", "text-label", mono=True)
    d.arrow((297, 700), (240, 700), (240, 447), (179, 447))
    d.text(234, 600, "latest", "text-label", "end", mono=True)

    d.zone(620, 90, 220, 720, "Training Station")
    d.item(635, 194, 190, 56, "Unsupervised learning")
    d.item(635, 314, 190, 56, "Manual annotation")
    d.item(635, 439, 190, 70, "Continuous training", "and testing", mono_sub=False)
    d.item(665, 552, 130, 56, "New model")
    d.item(635, 672, 190, 56, "Model publisher")

    d.arrow((463, 222), (631, 222))
    d.text(560, 212, "dataset", "text-label", mono=True)
    d.arrow((463, 342), (631, 342))
    d.text(560, 332, "dataset", "text-label", mono=True)
    d.arrow((635, 360), (560, 360), (560, 452), (467, 452))
    d.text(554, 410, "store", "text-label", "end", mono=True)
    d.arrow((463, 474), (631, 474))
    d.text(560, 496, "annotated", "text-label", mono=True)
    d.text(560, 512, "dataset", "text-label", mono=True)

    d.line((825, 222), (832, 222), (832, 580))
    d.line((825, 474), (832, 474))
    d.arrow((832, 580), (799, 580))
    d.arrow((730, 608), (730, 668))
    d.arrow((635, 700), (467, 700))
    d.text(560, 690, "update", "text-label", mono=True)
    return d


if __name__ == "__main__":
    ml_flow().save(HERE / "ml-data-flow.svg")
