# Phone layouts of the homepage diagrams, built from the site SVGs so style and logos stay in sync.
# Regenerate from the repo root with: python3 scripts/diagrams/phone.py
import re

SRC = "static/img/landing/"


def load(name):
    svg = re.sub(r"<metadata>.*?</metadata>", "", open(SRC + name).read(), flags=re.S)
    style = re.search(r"<style>.*?</style>", svg, re.S).group(0)
    return svg, style


def band(svg, start, end):
    i = svg.index(start)
    return svg[i:svg.index(end, i)]


class C:
    def __init__(s):
        s.wires, s.p = [], []

    def rect(s, x, y, w, h, cls, rx=20):
        s.p.append(f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" rx="{rx}" class="{cls}"/>')

    def text(s, x, y, t, cls, a="middle"):
        s.p.append(f'<text x="{x:.1f}" y="{y:.1f}" class="{cls}" text-anchor="{a}">{t}</text>')

    def wire(s, d, cls):
        s.wires.append(f'<path d="{d}" class="rs-wire {cls}"/>')

    def port(s, x, y):
        s.p.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="5" class="rs-port"/>')

    def svg(s, style, w, h, label):
        return (
            f'<svg xmlns="http://www.w3.org/2000/svg" class="rs-diagram" viewBox="0 0 {w} {h}" '
            f'width="100%" height="100%" role="img" aria-label="{label}"><defs>{style}</defs>'
            + "\n".join(s.wires + s.p)
            + "</svg>\n"
        )


def chipw(t):
    return round(len(t) * 7.3 + 18)


def chips(c, cx, y, rows):
    for items in rows:
        total = sum(chipw(t) for t in items) + 8 * (len(items) - 1)
        x = cx - total / 2
        for t in items:
            w = chipw(t)
            c.rect(x, y, w, 28, "rs-cchip", 14)
            c.text(x + w / 2, y + 19, t, "rs-cs rs-mono")
            x += w + 8
        y += 34


W = 360
CX = W / 2


def instance(c, y, title, rows, store_title, store_rows):
    hx, hw = 12, W - 24
    card_y = y + 14
    card_h = 16 + 34 + 14 + len(rows) * 70 - 10 + 16
    store_y = card_y + card_h + 12
    store_h = 38 + len(store_rows) * 34
    c.rect(hx, y, hw, store_y + store_h + 14 - y, "rs-halo", 36)
    c.rect(hx + 14, card_y, hw - 28, card_h, "rs-card", 28)
    pw = len(title) * 9.4 + 34
    c.rect(CX - pw / 2, card_y + 16, pw, 34, "rs-pill", 17)
    c.text(CX, card_y + 38, title, "rs-pt")
    ry = card_y + 64
    for name, sub in rows:
        c.rect(hx + 30, ry, hw - 60, 60, "rs-box", 16)
        c.text(CX, ry + 25, name, "rs-bt")
        c.text(CX, ry + 45, sub, "rs-s rs-mono")
        ry += 70
    c.rect(hx + 14, store_y, hw - 28, store_h, "rs-coral", 20)
    c.text(CX, store_y + 26, store_title, "rs-ct")
    chips(c, CX, store_y + 40, store_rows)
    return store_y + store_h + 14


def architecture():
    svg, style = load("architecture-backbone.svg")
    c = C()
    # Source logos: desktop band x 48..492, y 24..64, wires start at these centers
    src = band(svg, '<g class="rs-logo" transform="translate(48.0', '<circle cx="280.0" cy="152.0"')
    src_x = [68, 135, 242, 362, 458]
    f = (W - 40) / 444
    c.p.append(f'<g transform="translate(20,12) scale({f:.4f}) translate(-48,-24)">{src}</g>')
    top = 12 + 40 * f + 8
    ey = top + 48
    for x in src_x:
        nx = 20 + (x - 48) * f
        c.wire(f"M{nx:.1f},{top:.1f} C{nx:.1f},{top + 28:.1f} {CX},{ey - 28:.1f} {CX},{ey:.1f}", "rs-flow-in")
    edge_bottom = instance(
        c, ey, "ReductStore edge",
        [("Labels and queries", "filter by label"), ("FIFO quota", "size based")],
        "Storage", [["local disk"]],
    )
    c.port(CX, ey)
    cy = edge_bottom + 96
    c.wire(f"M{CX},{edge_bottom:.1f} L{CX},{cy:.1f}", "rs-flow-rep")
    c.port(CX, edge_bottom)
    c.port(CX, cy)
    c.text(CX + 14, edge_bottom + 44, "replication", "rs-bl", "start")
    c.text(CX + 14, edge_bottom + 62, "filtered", "rs-s rs-mono", "start")
    cloud_bottom = instance(
        c, cy, "ReductStore cloud",
        [("Extensions", "ROS, MCAP, CSV, JSON"), ("Local cache", "hot data")],
        "Storage backend", [["Amazon S3", "Azure Blob"], ["MinIO, Ceph, R2"]],
    )
    c.port(CX, cloud_bottom)
    # SDK logos: desktop band x 800..1200, y 22..64, centers every 72 from 820
    sdk = band(svg, '<g class="rs-logo" transform="translate(800.0', '<circle cx="1000.0" cy="152.0"')
    g = (W - 40) / 400
    ly = cloud_bottom + 56
    for i in range(6):
        nx = 20 + (820 + 72 * i - 800) * g
        c.wire(f"M{CX},{cloud_bottom:.1f} C{CX},{cloud_bottom + 28:.1f} {nx:.1f},{ly - 36:.1f} {nx:.1f},{ly - 8:.1f}", "rs-flow-out")
    c.p.append(f'<g transform="translate(20,{ly:.1f}) scale({g:.4f}) translate(-800,-22)">{sdk}</g>')
    return c.svg(
        style, W, round(ly + 42 * g + 12),
        "ROS, MQTT, Zenoh, PLC and vibration data flows into ReductStore at the edge, which replicates "
        "filtered data to ReductStore in the cloud. Python, JavaScript, Go, Rust, C++ and Grafana read "
        "from the cloud. Each instance has its own storage.",
    )


def bridge():
    _, style = load("reduct-bridge.svg")
    c = C()
    inputs = [("ROS 1", "topics"), ("ROS 2", "topics"), ("MQTT", "topics"),
              ("HTTP", "requests"), ("System", "metrics"), ("Shell", "commands")]
    bx, bw, by, bh = 210, 140, 40, 90
    px, py = bx - 14, by + bh / 2
    for i, (name, sub) in enumerate(inputs):
        y = 10 + i * 48
        c.rect(10, y, 140, 40, "rs-card", 20)
        c.text(26, y + 25, name, "rs-t", "start")
        c.text(138, y + 25, sub, "rs-s rs-mono", "end")
        c.wire(f"M150,{y + 20} C176,{y + 20} 170,{py} {px},{py}", "rs-flow-in")
    c.port(px, py)
    mx = bx + bw / 2
    c.rect(bx, by, bw, bh, "rs-coral", 24)
    c.text(mx, by + 42, "ReductBridge", "rs-pt")
    c.text(mx, by + 62, "pipelines", "rs-cs rs-mono")
    top, bottom = by + bh + 14, 200
    c.wire(f"M{mx},{top} L{mx},{bottom}", "rs-flow-rep")
    c.port(mx, top)
    c.port(mx, bottom)
    c.text(mx + 12, top + 26, "labeled", "rs-bl", "start")
    c.text(mx + 12, top + 44, "data", "rs-bl", "start")
    c.rect(mx - 74, bottom, 148, 100, "rs-halo", 36)
    c.rect(mx - 60, bottom + 14, 120, 72, "rs-pill", 24)
    c.text(mx, bottom + 55, "ReductStore", "rs-pt")
    return c.svg(
        style, W, 310,
        "ROS 1, ROS 2, MQTT, HTTP, system metrics and shell inputs flow into ReductBridge, "
        "which sends labeled data to ReductStore.",
    )


open(SRC + "architecture-backbone-phone.svg", "w").write(architecture())
open(SRC + "reduct-bridge-phone.svg", "w").write(bridge())
print("ok")
