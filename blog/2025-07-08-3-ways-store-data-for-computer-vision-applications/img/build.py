# Regenerate with: python3 build.py
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[3] / "scripts/diagrams"))
from blogkit import Diagram  # noqa: E402

HERE = Path(__file__).parent
TREE = [
    "data/",
    "├── camera/",
    "│   ├── 1670025448.jpeg",
    "│   ├── 1670025449.jpeg",
    "│   └── ...",
    "└── results/",
    "    ├── 1670025448.json",
    "    ├── 1670025449.json",
    "    └── ...",
]


def pipeline(d, zone_h, labels=None):
    d.card(0, 70, 120, 70, "CV Camera")
    d.zone(150, 0, 580, zone_h, "Edge Device")
    for i, name in enumerate(["Camera Driver", "Model", "UI"]):
        d.item(175 + i * 185, 70, 155, 70, name)
        if i:
            d.arrow((175 + i * 185 - 30, 105), (175 + i * 185 - 4, 105))
    d.arrow((120, 105), (171, 105))
    if labels:
        for x, text in zip((252, 437), labels):
            d.arrow((x, 140), (x, 216))
            d.text(x + 10, 184, text, "text-label", "start", mono=True)


def tree(d, x, y):
    for i, line in enumerate(TREE):
        d.text(x, y + i * 20, line, "text-label", "start", mono=True)


def application():
    d = Diagram()
    pipeline(d, 190)
    return d


def file_system():
    d = Diagram()
    pipeline(d, 470, ["images", "results"])
    d.item(175, 220, 360, 230, "")
    d.text(515, 250, "File system", "text-item", "end")
    tree(d, 199, 256)
    return d


def object_storage():
    d = Diagram()
    pipeline(d, 190, None)
    for x, text in zip((252, 437), ["images", "results"]):
        d.arrow((x, 140), (x, 256))
        d.text(x + 10, 224, text, "text-label", "start", mono=True)
    d.item(175, 260, 360, 230, "")
    d.text(515, 290, "Object storage", "text-item", "end")
    tree(d, 199, 296)
    return d


def reductstore():
    d = Diagram()
    pipeline(d, 640, ["images", "images labeled with results"])
    d.panel(175, 220, 530, 390, "ReductStore", brand=True, anchor="end")
    d.item(195, 262, 490, 326, "")
    d.text(213, 292, '"camera" entry', "text-item", "start", mono=True)
    for i, name in enumerate(["Block 1", "Block 2"]):
        d.item(213 + i * 88, 320, 78, 50, name)
    d.ellipsis(410, 345)
    d.rect(436, 320, 230, 50, "card-plain", 10)
    d.records(446, 330, 110, 30, count=5)
    d.text(652, 350, "Block N", "text-item", "end")
    d.text(501, 310, "records", "text-label")
    d.arrow((551, 370), (551, 398))
    d.rect(446, 402, 220, 170, "card-plain", 8)
    lines = [
        ("timestamp: 1231781923", "text-label-strong"),
        ("labels:", "text-label-strong"),
        ('  class-id: "1"', "text-label"),
        ('  anomaly-score: "0.2"', "text-label"),
        ("<image in JPEG>", "text-label-strong"),
    ]
    for i, (line, cls) in enumerate(lines):
        d.text(460, 428 + i * 24 + (12 if i == 4 else 0), line, cls, "start", mono=True)
    d.guide((454, 518), (658, 518))
    d.text(430, 470, "meta information", "text-label", "end")
    d.text(430, 550, "content", "text-label", "end")
    d.line((434, 412), (438, 412), (438, 510), (434, 510))
    d.line((434, 526), (438, 526), (438, 564), (434, 564))
    return d


if __name__ == "__main__":
    for name, draw in (
        ("cv-application", application),
        ("cv-file-system", file_system),
        ("cv-object-storage", object_storage),
        ("cv-reductstore", reductstore),
    ):
        draw().save(HERE / f"{name}.svg")
        print(name)
