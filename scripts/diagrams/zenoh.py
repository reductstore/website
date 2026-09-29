# Zenoh to ReductStore mapping diagram for the homepage, in the homepage diagram style.
# Regenerate from the repo root with: python3 scripts/diagrams/zenoh.py
import re

SRC = "static/img/landing/architecture-backbone.svg"
OUT = "static/img/landing/zenoh-api.svg"

ROWS = [
    ("key", "robot/cam", "entry"),
    ("encoding", "image/jpeg", "content type"),
    ("attachment", "JSON", "labels"),
    ("timestamp", "HLC", "timestamp"),
    ("get()", "?start;stop", "query"),
]
LW, RW, CH, GAP, ROW = 204, 156, 44, 60, 56
TOP = 64
W = LW + GAP + RW
LABEL = (
    "ReductStore joins a Zenoh network as a peer. Zenoh keys become entries, encodings become content types, "
    "attachments become labels, HLC timestamps become record timestamps, and get() selectors become time-range queries."
)


def load():
    svg = re.sub(r"<metadata>.*?</metadata>", "", open(SRC).read(), flags=re.S)
    style = re.search(r"<style>.*?</style>", svg, re.S).group(0)
    logo = re.search(r'<g class="rs-logo" transform="translate\(179\.9,28\.0\) scale\(0\.06426\)">.*?</g></g>', svg, re.S).group(0)
    return style, logo


def main():
    style, logo = load()
    wires, p = [], []
    # The Zenoh mark in the architecture diagram sits at x 179.9..304, y 28..68
    scale = 0.75
    lw = 124 * scale
    p.append(f'<g transform="translate({LW / 2 - lw / 2:.1f},10) scale({scale}) translate(-179.9,-28)">{logo}</g>')
    pw = len("ReductStore") * 9.4 + 34
    rx = LW + GAP
    p.append(f'<rect x="{rx + RW / 2 - pw / 2:.1f}" y="12" width="{pw:.1f}" height="34" rx="17" class="rs-pill"/>')
    p.append(f'<text x="{rx + RW / 2:.1f}" y="34" class="rs-pt" text-anchor="middle">ReductStore</text>')
    for i, (lt, ls, rt) in enumerate(ROWS):
        y = TOP + i * ROW
        cy = y + CH / 2
        p.append(f'<rect x="0" y="{y}" width="{LW}" height="{CH}" rx="22" class="rs-card"/>')
        p.append(f'<text x="18" y="{cy + 5}" class="rs-t" text-anchor="start">{lt}</text>')
        p.append(f'<text x="{LW - 16}" y="{cy + 5}" class="rs-s rs-mono" text-anchor="end">{ls}</text>')
        p.append(f'<rect x="{rx}" y="{y}" width="{RW}" height="{CH}" rx="22" class="rs-card"/>')
        p.append(f'<text x="{rx + RW / 2}" y="{cy + 5}" class="rs-t" text-anchor="middle">{rt}</text>')
        wires.append(f'<path d="M{LW},{cy} L{rx},{cy}" class="rs-wire rs-flow-in"/>')
        p.append(f'<circle cx="{LW}" cy="{cy}" r="4" class="rs-port"/><circle cx="{rx}" cy="{cy}" r="4" class="rs-port"/>')
    h = TOP + len(ROWS) * ROW - (ROW - CH) + 4
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" class="rs-diagram" viewBox="-2 0 {W + 4} {h}" '
        f'width="100%" height="100%" role="img" aria-label="{LABEL}"><defs>{style}</defs>'
        + "\n".join(wires + p)
        + "</svg>\n"
    )
    open(OUT, "w").write(svg)
    print("ok")


main()
