# Regenerate with: python3 build.py
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[3] / "scripts/diagrams"))
from blogkit import Diagram  # noqa: E402

HERE = Path(__file__).parent


def cloud_integration():
    d = Diagram()
    d.card(0, 40, 130, 80, "Records")
    d.card(180, 40, 160, 80, "ReductStore", brand=True)
    d.panel(390, 0, 170, 160, "Blocks", shadow=True)
    for i in range(3):
        d.records(408, 48 + i * 34, 134, 24, count=5, gap=4, width=22)
    d.card(610, 40, 120, 80, "S3")
    for a, b in ((130, 176), (340, 386), (560, 606)):
        d.arrow((a, 80), (b, 80))
    return d


if __name__ == "__main__":
    cloud_integration().save(HERE / "cloud-integration.svg")
