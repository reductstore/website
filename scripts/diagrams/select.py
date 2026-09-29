# ReductSelect diagram for the homepage, desktop and phone layouts, in the homepage diagram style.
# Regenerate from the repo root with: python3 scripts/diagrams/select.py
import re

SRC = "static/img/landing/reduct-bridge.svg"
OUT = "static/img/landing/"

INPUTS = [("JSON", "logs"), ("CSV", "telemetry"), ("Parquet", "tables"), ("Protobuf", "events")]
OUTPUTS = [("Parquet", "by time"), ("CSV", "by rows"), ("Labels", "@temp")]
SQL = ["SELECT AVG(temp)", "  AS temp", "FROM ENTRY()"]
LABEL = (
    "JSON logs, CSV telemetry, Parquet tables and Protobuf events stored in ReductStore are queried "
    "with DataFusion SQL by ReductSelect and exported as Parquet batched by time, CSV batched by rows, "
    "or computed labels."
)


def base_style():
    svg = re.sub(r"<metadata>.*?</metadata>", "", open(SRC).read(), flags=re.S)
    return re.search(r"<style>.*?</style>", svg, re.S).group(0)


class C:
    def __init__(s):
        s.wires, s.p = [], []

    def rect(s, x, y, w, h, cls, rx=16):
        s.p.append(f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" rx="{rx}" class="{cls}"/>')

    def text(s, x, y, t, cls, a="middle"):
        s.p.append(f'<text x="{x:.1f}" y="{y:.1f}" class="{cls}" text-anchor="{a}" xml:space="preserve">{t}</text>')

    def wire(s, d, cls):
        s.wires.append(f'<path d="{d}" class="rs-wire {cls}"/>')

    def port(s, x, y):
        s.p.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="5" class="rs-port"/>')

    def chip(s, x, y, w, title, sub):
        s.rect(x, y, w, 44, "rs-card", 22)
        s.text(x + 20, y + 27, title, "rs-t", "start")
        s.text(x + w - 18, y + 27, sub, "rs-s rs-mono", "end")

    def select_card(s, x, y, w):
        s.rect(x - 14, y - 14, w + 28, 188, "rs-halo", 36)
        s.rect(x, y, w, 160, "rs-card", 24)
        s.rect(x + 16, y + 16, w - 32, 50, "rs-coral", 18)
        s.text(x + w / 2, y + 38, "ReductSelect", "rs-ct")
        s.text(x + w / 2, y + 56, "DataFusion SQL", "rs-cs rs-mono")
        for i, line in enumerate(SQL):
            s.text(x + 28, y + 96 + i * 20, line, "rs-s rs-mono", "start")

    def svg(s, vb):
        return (
            f'<svg xmlns="http://www.w3.org/2000/svg" class="rs-diagram" viewBox="{vb}" '
            f'width="100%" height="100%" role="img" aria-label="{LABEL}"><defs>{base_style()}</defs>'
            + "\n".join(s.wires + s.p)
            + "</svg>\n"
        )


def desktop():
    c = C()
    cw, cx, cy = 220, 270, 50
    lx, rx, my = cx, cx + cw, cy + 80
    for i, (t, sub) in enumerate(INPUTS):
        y = 12 + i * 58
        c.chip(0, y, 180, t, sub)
        c.wire(f"M180,{y + 22} C220,{y + 22} {lx - 40},{my} {lx},{my}", "rs-flow-in")
    for i, (t, sub) in enumerate(OUTPUTS):
        y = 50 + i * 58
        c.chip(580, y, 180, t, sub)
        c.wire(f"M{rx},{my} C{rx + 40},{my} 540,{y + 22} 580,{y + 22}", "rs-flow-out")
    c.select_card(cx, cy, cw)
    c.text(cx + cw / 2, 22, "inside ReductStore", "rs-bl")
    c.port(lx, my)
    c.port(rx, my)
    return c.svg("-2 0 764 262")


def phone():
    c = C()
    W = 360
    c.rect(-2, 0, W + 4, 132, "rs-halo", 28)
    for i, (t, sub) in enumerate(INPUTS):
        x, y = 12 + (i % 2) * 172, 14 + (i // 2) * 56
        c.chip(x, y, 164, t, sub)
    cx, cw = 70, 220
    cy = 132 + 56
    top = cy - 14
    c.wire(f"M{W / 2},132 L{W / 2},{top}", "rs-flow-in")
    c.port(W / 2, 132)
    c.port(W / 2, top)
    c.select_card(cx, cy, cw)
    bottom = cy + 160 + 14
    c.port(W / 2, bottom)
    for i, (t, sub) in enumerate(OUTPUTS):
        y = bottom + 40 + i * 54
        c.chip(cx, y, cw, t, sub)
    c.wire(f"M{W / 2},{bottom} L{W / 2},{bottom + 40}", "rs-flow-out")
    return c.svg(f"-4 0 {W + 8} {bottom + 40 + 3 * 54}")


open(OUT + "reduct-select.svg", "w").write(desktop())
open(OUT + "reduct-select-phone.svg", "w").write(phone())
print("ok")
