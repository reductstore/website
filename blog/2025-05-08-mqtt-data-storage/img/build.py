# Regenerate with: python3 build.py
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[3] / "scripts/diagrams"))
from blogkit import Diagram  # noqa: E402

HERE = Path(__file__).parent


def node(d, x, y, name, w=140):
    d.card(x, y, w, 70, name, shadow=True)


def topic(d, x, y, name, w=130):
    d.rect(x, y, w, 50, "card-plain", 25)
    d.text(x + w / 2, y + 30, name, "text-label-strong", mono=True)


def pub_sub():
    d = Diagram()
    node(d, 0, 50, "Camera")
    node(d, 0, 230, "Sensor")
    topic(d, 190, 60, "image")
    topic(d, 190, 240, "temperature")
    node(d, 380, 0, "Anomaly detection", w=190)
    node(d, 380, 150, "Control", w=190)
    topic(d, 610, 160, "setpoint")
    d.arrow((140, 85), (186, 85))
    d.arrow((140, 265), (186, 265))
    d.arrow((320, 85), (345, 85), (345, 35), (376, 35))
    d.arrow((320, 85), (345, 85), (345, 175), (376, 175))
    d.arrow((320, 265), (345, 265), (345, 195), (376, 195))
    d.arrow((570, 185), (606, 185))

    d.rect(470, 262, 88, 44, "card-standard", 12)
    d.text(514, 289, "node", "text-label-strong")
    topic(d, 590, 259, "topic", w=110)
    return d


if __name__ == "__main__":
    pub_sub().save(HERE / "mqtt-pub-sub.svg")
