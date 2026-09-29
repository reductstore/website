# Diagrams for docs/how-does-it-work.mdx in the homepage diagram style.
# Regenerate from the repo root with: python3 scripts/diagrams/docs.py
import re

SRC = "static/img/landing/reduct-bridge.svg"
OUT = "docs/img/"

EXTRA = """<style>
.rs-line{stroke:var(--rs-card-stroke);stroke-width:1}
.rs-hl{fill:#DB817B;fill-opacity:.18}
.rs-sel{fill:var(--rs-card-bg);stroke:var(--rs-accent);stroke-width:2}
.rs-code{font-size:13px;fill:var(--rs-text-main)}
</style>"""


def base_style():
    svg = re.sub(r"<metadata>.*?</metadata>", "", open(SRC).read(), flags=re.S)
    return re.search(r"<style>.*?</style>", svg, re.S).group(0)


class C:
    def __init__(s):
        s.bg, s.wires, s.p = [], [], []

    def rect(s, x, y, w, h, cls, rx=16):
        s.p.append(f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" rx="{rx}" class="{cls}"/>')

    def text(s, x, y, t, cls, a="middle"):
        s.p.append(f'<text x="{x:.1f}" y="{y:.1f}" class="{cls}" text-anchor="{a}">{t}</text>')

    def line(s, x1, y1, x2, y2):
        s.p.append(f'<path d="M{x1:.1f},{y1:.1f} L{x2:.1f},{y2:.1f}" class="rs-line"/>')

    def wire(s, d, cls="rs-static"):
        s.wires.append(f'<path d="{d}" class="rs-wire {cls}"/>')

    def port(s, x, y):
        s.p.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="5" class="rs-port"/>')

    def pill(s, cx, y, t):
        w = len(t) * 9.4 + 34
        s.rect(cx - w / 2, y, w, 34, "rs-pill", 17)
        s.text(cx, y + 22, t, "rs-pt")

    def panel(s, x, y, w, h, title):
        s.rect(x, y, w, h, "rs-halo", 36)
        s.rect(x + 14, y + 14, w - 28, h - 28, "rs-card", 28)
        s.pill(x + w / 2, y + 30, title)

    def table(s, x, y, cols, header, row, hl=True):
        w = sum(cols)
        s.rect(x, y, w, 88, "rs-card", 10)
        if hl:
            s.p.append(f'<rect x="{x + 1:.1f}" y="{y + 30:.1f}" width="{w - 2:.1f}" height="30" class="rs-hl"/>')
        s.line(x, y + 30, x + w, y + 30)
        s.line(x, y + 60, x + w, y + 60)
        cx = x
        for i, cw in enumerate(cols):
            if i:
                s.line(cx, y, cx, y + 88)
            s.text(cx + cw / 2, y + 20, header[i], "rs-s")
            s.text(cx + cw / 2, y + 50, row[i], "rs-s rs-mono")
            cx += cw
        return w

    def svg(s, w, h, label):
        return (
            f'<svg xmlns="http://www.w3.org/2000/svg" class="rs-diagram" viewBox="0 0 {w} {h}" '
            f'width="100%" height="100%" role="img" aria-label="{label}"><defs>{base_style()}{EXTRA}</defs>'
            + "\n".join(s.bg + s.wires + s.p)
            + "</svg>\n"
        )


def box(c, x, y, w, h, title, lines):
    c.rect(x, y, w, h, "rs-box", 16)
    ty = y + h / 2 - 10 * len(lines) + 4
    c.text(x + w / 2, ty, title, "rs-bt")
    for i, (t, cls) in enumerate(lines):
        c.text(x + w / 2, ty + 20 * (i + 1), t, cls)


def buckets():
    c = C()
    c.panel(130, 10, 620, 220, "ReductStore instance")
    ay = 96
    box(c, 200, ay, 200, 96, "Bucket A", [("FIFO quota, 10 GB", "rs-s rs-mono"), ("ingest ring buffer", "rs-s")])
    box(c, 500, ay, 210, 96, "Bucket B", [("hard quota, 1 TB", "rs-s rs-mono"), ("long-term storage", "rs-s")])
    my = ay + 48
    c.wire(f"M10,{my} L200,{my}", "rs-flow-in")
    c.text(10, my - 12, "data ingestion", "rs-bl", "start")
    c.port(200, my)
    c.wire(f"M400,{my} L500,{my}", "rs-flow-rep")
    c.text(450, my - 12, "replication", "rs-bl")
    c.port(400, my)
    c.port(500, my)
    return c.svg(760, 240, "A ReductStore instance with two buckets: data is ingested into Bucket A with a 10 GB FIFO quota and replicated to Bucket B with a 1 TB hard quota.")


def entries():
    c = C()
    c.panel(10, 10, 220, 250, "Bucket")
    for i, name in enumerate(["Entry A", "Entry B", "Entry C"]):
        y = 92 + i * 52
        c.rect(44, y, 152, 40, "rs-sel" if name == "Entry C" else "rs-chip", 20)
        c.text(120, y + 25, name, "rs-t")
    c.panel(280, 10, 510, 250, "Entry C")
    c.wire("M196,216 C244,216 236,135 280,135")
    c.port(196, 216)
    c.port(280, 135)
    box(c, 314, 92, 196, 80, "Block index", [("block id, records, size", "rs-s rs-mono")])
    c.rect(526, 92, 230, 80, "rs-box", 16)
    c.text(641, 116, "Write-ahead logs", "rs-bt")
    for i in range(3):
        x = 641 - 87 + i * 60
        c.rect(x, 130, 54, 26, "rs-chip", 13)
        c.text(x + 27, 148, "WAL", "rs-s rs-mono")
    c.text(314, 192, "blocks", "rs-s", "start")
    names = ["block 1", "block 2", "…", "block N-1", "block N"]
    tw = (442 - 4 * 8) / 5
    for i, n in enumerate(names):
        x = 314 + i * (tw + 8)
        c.rect(x, 200, tw, 34, "rs-chip", 10)
        c.text(x + tw / 2, 222, n, "rs-s rs-mono")
    return c.svg(800, 270, "A bucket holds entries A, B and C. Entry C keeps a block index, write-ahead logs, and blocks 1 to N.")


def blocks():
    c = C()
    c.panel(150, 10, 640, 236, "Block xxxxx")
    dx, dy, dw = 184, 108, 190
    c.rect(dx, dy, dw, 108, "rs-card", 10)
    c.text(dx + dw / 2, dy - 8, "Data block", "rs-bt")
    c.p.append(f'<rect x="{dx + 1}" y="{dy + 36}" width="{dw - 2}" height="36" class="rs-hl"/>')
    c.line(dx, dy + 36, dx + dw, dy + 36)
    c.line(dx, dy + 72, dx + dw, dy + 72)
    c.text(dx + dw / 2, dy + 58, "content of record 1", "rs-s rs-mono")
    tx, ty = 420, 108
    w = c.table(tx, ty, [96, 120, 128], ["record id", "content type", "labels"], ["1", "image/jpeg", "label1=key2"])
    c.text(tx + w / 2, ty - 8, "Block descriptor", "rs-bt")
    c.wire(f"M{tx},{ty + 45} C{tx - 20},{ty + 45} {dx + dw + 20},{dy + 54} {dx + dw},{dy + 54}")
    c.port(tx, ty + 45)
    c.port(dx + dw, dy + 54)

    ix, iy = 184, 292
    iw = c.table(ix, iy, [90, 80, 90], ["block id", "records", "size"], ["xxxxx", "10", "231023"])
    c.text(ix + iw / 2, iy - 8, "Block index", "rs-bt")
    c.wire(f"M{ix},{iy + 45} L120,{iy + 45} L120,128 L150,128", "rs-flow-in")
    c.port(ix, iy + 45)
    c.port(150, 128)
    c.text(110, 225, "fast", "rs-bl", "end")
    c.text(110, 243, "search", "rs-bl", "end")

    wx, wy, ww = 560, 314, 150
    c.rect(wx, wy, ww, 44, "rs-chip", 22)
    c.text(wx + ww / 2, wy + 27, "WAL xxxxx", "rs-t rs-mono")
    mx = wx + ww / 2
    c.wire(f"M{mx},{ty + 88} L{mx},{wy}", "rs-flow-out")
    c.port(mx, ty + 88)
    c.text(mx + 12, 280, "uncommitted changes", "rs-s", "start")
    c.wire(f"M{wx},{wy + 22} L{ix + iw},{wy + 22}", "rs-flow-out")
    c.port(ix + iw, wy + 22)
    c.text((wx + ix + iw) / 2, wy + 10, "index update", "rs-s")
    c.text((wx + ix + iw) / 2, wy + 42, "and recovery", "rs-s")
    return c.svg(800, 392, "A block stores record contents in a data block and their metadata in a block descriptor. Uncommitted descriptor changes go to a write-ahead log, which updates and recovers the block index used for fast search.")


def area(c, x, y, w, h, title):
    c.bg.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="32" class="rs-halo"/>')
    c.bg.append(f'<rect x="{x + 12}" y="{y + 12}" width="{w - 24}" height="{h - 24}" rx="24" class="rs-card"/>')
    c.text(x + 32, y + 42, title, "rs-bt", "start")


def ros():
    c = C()
    area(c, 10, 10, 780, 270, "Awesome Robot")
    c.text(44, 86, "ROS topics", "rs-s", "start")
    topics = ["/camera/image_raw", "/gps/fix", "/imu/data"]
    bx, by, bw, bh = 290, 110, 190, 130
    for i, t in enumerate(topics):
        y = 100 + i * 52
        c.rect(44, y, 180, 38, "rs-chip", 19)
        c.text(134, y + 24, t, "rs-code rs-mono")
        c.wire(f"M224,{y + 19} C256,{y + 19} {bx - 32},{by + bh / 2} {bx},{by + bh / 2}", "rs-flow-in")
    c.port(bx, by + bh / 2)
    c.rect(bx, by, bw, bh, "rs-coral", 20)
    c.text(bx + bw / 2, by + 30, "ReductBridge", "rs-ct")
    for i, t in enumerate(["subscribes to topics", "stores payloads", "applies labels", "attaches ROS schema"]):
        c.text(bx + bw / 2, by + 56 + i * 19, t, "rs-cs")
    sx, sy, sw, sh = 560, 62, 206, 200
    c.wire(f"M{bx + bw},{by + bh / 2} L{sx},{by + bh / 2}", "rs-flow-in")
    c.port(bx + bw, by + bh / 2)
    c.port(sx, by + bh / 2)
    for i, t in enumerate(["records", "labels", "$schema"]):
        c.text((bx + bw + sx) / 2, by + bh / 2 - 44 + i * 16, t, "rs-s rs-mono")
    c.rect(sx, sy, sw, sh, "rs-card", 20)
    c.pill(sx + sw / 2, sy + 14, "ReductStore")
    box(c, sx + 14, sy + 60, sw - 28, 58, "bucket: robot-data", [("entries + labels", "rs-s rs-mono")])
    box(c, sx + 14, sy + 128, sw - 28, 58, "replication task", [("camera + IMU entries", "rs-s rs-mono")])

    cy = 360
    lx = sx + sw / 2
    c.wire(f"M{lx},{sy + sh} L{lx},{cy + 12}", "rs-flow-rep")
    c.port(lx, sy + sh)
    c.port(lx, cy + 12)
    c.text(lx - 14, 322, "selected records over HTTP(S)", "rs-bl", "end")

    area(c, 10, cy, 780, 190, "Cloud or central on-premises")
    c.pill(400, cy + 24, "ReductStore")
    by2 = cy + 80
    box(c, 44, by2, 220, 70, "bucket: demo", [("replicated robot data", "rs-s rs-mono")])
    box(c, 310, by2, 210, 70, "ReductROS", [("messages to JSON", "rs-s rs-mono")])
    box(c, 566, by2, 200, 70, "ReductSelect", [("SQL over JSON", "rs-s rs-mono")])
    for x0, x1 in [(264, 310), (520, 566)]:
        c.wire(f"M{x0},{by2 + 35} L{x1},{by2 + 35}", "rs-flow-out")
        c.port(x0, by2 + 35)
        c.port(x1, by2 + 35)
    c.text(543, by2 + 90, "query pipeline", "rs-s")
    return c.svg(800, cy + 200, "ROS topics on the robot flow into ReductBridge, which writes records, labels and the ROS schema to the local ReductStore. A replication task sends selected camera and IMU entries over HTTP(S) to ReductStore in the cloud or a central on-premises server, where ReductROS extracts messages as JSON and ReductSelect runs SQL over them.")


for name, fn in [("buckets", buckets), ("entries", entries), ("blocks", blocks)]:
    open(OUT + name + ".svg", "w").write(fn())
open("docs/ros/img/ros-workflow.svg", "w").write(ros())
print("ok")
