import sys
from pathlib import Path

HERE = Path(__file__).parent
ROOT = HERE.parents[2]
sys.path.insert(0, str(ROOT / "scripts/diagrams"))

from blogkit import Diagram


def routing_blocks():
    diagram = Diagram()

    diagram.panel(10, 10, 740, 145, "One subscriber", anchor="start")
    diagram.item(35, 65, 260, 56, "RS_ZENOH_SUB_KEYEXPRS", "sensors/**")
    diagram.item(440, 65, 260, 56, "Subscriber", "RS_ZENOH_SUB_*", brand=True)
    diagram.arrow((295, 93), (436, 93))

    diagram.panel(10, 185, 740, 180, "Several subscribers", anchor="start")
    diagram.item(35, 240, 260, 56, "RS_ZENOH_SUB_0_KEYEXPRS", "cameras/**")
    diagram.item(35, 302, 260, 56, "RS_ZENOH_SUB_1_KEYEXPRS", "sensors/**")
    diagram.item(440, 240, 260, 56, "Subscriber", "RS_ZENOH_SUB_0_*", brand=True)
    diagram.item(440, 302, 260, 56, "Subscriber", "RS_ZENOH_SUB_1_*", brand=True)
    diagram.arrow((295, 268), (436, 268))
    diagram.arrow((295, 330), (436, 330))

    return diagram


if __name__ == "__main__":
    routing_blocks().save(HERE / "zenoh-routing-blocks.svg")
