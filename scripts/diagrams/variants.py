# Five layout variants of the ReductStore hub diagram, same light style.
# Regenerate with: python3 variants.py
import re, math
DEFS = re.search(r"DEFS = '''(.*?)'''", open("build_light.py").read(), re.S).group(1)
DEFS = DEFS.replace(".flow-out{", ".flow-rep{stroke:var(--accent);stroke-width:2;animation:flow 1.6s linear infinite}\n.bl{font-weight:600;font-size:14px;fill:var(--accent)}\n.small{font-size:12px;font-weight:600}\n.big{font-size:26px}\n.static{animation:none}\n.logo{fill:var(--accent)}\n.head{font-size:15px;fill:var(--text-muted)}\n.coral{fill:#DB817B}\n.cchip{fill:none;stroke:#FFFFFF;stroke-opacity:.7;stroke-width:1.2}\n.ct{font-weight:600;font-size:14px;fill:#FFFFFF}\n.cs{font-size:12.5px;fill:#FFFFFF}\n.cap{font-size:13px;font-style:italic;fill:var(--text-muted)}\n.si{font-size:12.5px;fill:#D9CCE6}\n.flow-out{", 1)
DEFS = re.sub(r"(@media \(prefers-reduced-motion: reduce\)\{)[^{]*\{animation:none\}", r"\1.flow-in,.flow-out,.flow-rep{animation:none}", DEFS)
assert ".flow-rep{animation:none}" in DEFS
assert ".flow-rep" in DEFS

SRC = [("Robot", "ROS 1, ROS 2"), ("PLC", "MQTT"), ("Camera", "image/jpeg"), ("Fleet", "Zenoh")]
OUT = [("SDKs", "Python, JS, Go, C++, Rust"), ("Web Console", "browse and query"), ("Grafana", "dashboards"), ("reduct-cli", "export, mirror")]
STORE = ["local disk", "Amazon S3", "Azure Blob", "MinIO, Ceph, R2"]
def chipw(t): return round(len(t) * 7.3 + 18)

class C:
    def __init__(s): s.p = []
    def rect(s, x, y, w, h, cls, rx=20): s.p.append(f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" rx="{rx}" class="{cls}"/>')
    def text(s, x, y, t, cls, a="middle"): s.p.append(f'<text x="{x:.1f}" y="{y:.1f}" class="{cls}" text-anchor="{a}">{t}</text>')
    def wire(s, d, cls="flow-in"): s.p.insert(0, f'<path d="{d}" class="wire {cls}"/>')
    def port(s, x, y): s.p.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="5" class="port"/>')
    def node(s, x, y, w, name, sub, h=56, rx=22):
        s.rect(x, y, w, h, "card", rx); s.text(x+w/2, y+h/2-4, name, "t"); s.text(x+w/2, y+h/2+15, sub, "s mono")
    def hub(s, x, y, w, h, label="ReductStore"):
        s.rect(x-14, y-14, w+28, h+28, "halo", 36); s.rect(x, y, w, h, "card", 28)
        pw = max(160, len(label)*9+40); s.rect(x+w/2-pw/2, y+16, pw, 34, "pill", 17); s.text(x+w/2, y+38, label, "pt")
    def block(s, x, y, w, h, title, sub):
        s.rect(x, y, w, h, "box", 16); s.text(x+w/2, y+24, title, "bt")
        for i, l in enumerate(sub): s.text(x+w/2, y+44+i*17, l, "s mono")
    def row_block(s, x, y, w, title, sub, h=46):
        s.rect(x, y, w, h, "box", 16); s.text(x+18, y+h/2+5, title, "bl", "start"); s.text(x+w-18, y+h/2+5, sub, "s mono", "end")
    def chips(s, cx, y, items):
        tot = sum(chipw(t) for t in items) + 8*(len(items)-1); x = cx - tot/2
        for t in items:
            w = chipw(t); s.rect(x, y, w, 28, "chip", 14); s.text(x+w/2, y+19, t, "s mono"); x += w + 8
        return tot
    def storage(s, x, y, w, items=STORE, title="Storage backend"):
        s.rect(x, y, w, 82, "box", 16); s.text(x+w/2, y+24, title, "bt")
        assert s.chips(x+w/2, y+38, items) <= w - 16, title
    def svg(s, vb, label):
        return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" width="100%" height="100%" role="img" aria-label="{label}">'
                + DEFS + "\n".join(s.p) + "</svg>")

def fan_h(c, xs, ys, px, py, into=True):
    for y in ys:
        if into: c.wire(f"M{xs},{y} C{xs+80},{y} {px-90},{py} {px},{py}", "flow-in")
        else:    c.wire(f"M{px},{py} C{px+90},{py} {xs-80},{y} {xs},{y}", "flow-out")

LABEL = "Sources feed into ReductStore, which holds extensions, labels and queries, replication, FIFO quota, local cache and a storage backend, and serves SDKs, Web Console, Grafana and the CLI."

# 1. Stacked layers: one block per row, like a layer cake
def v1():
    c = C(); HX, HY, HW = 300, 20, 480
    y = HY + 66; L = HX + 20; IW = HW - 40
    for t, sub in [("Extensions", "ReductROS, ReductSelect"), ("Labels and queries", "conditional queries"),
                   ("Replication", "filtered, edge to cloud"), ("FIFO quota", "retention by size"), ("Local cache", "hot tier on disk")]:
        c.row_block(L, y, IW, t, sub); y += 56
    c.storage(L, y, IW); y += 82 + 20
    HH = y - HY; c.p.insert(0, ""); hub = C(); hub.hub(HX, HY, HW, HH); c.p = hub.p + c.p
    mid = HY + HH/2; lanes = [mid-120, mid-40, mid+40, mid+120]
    for (n, s), ly in zip(SRC, lanes): c.node(10, ly-28, 160, n, s)
    for (n, s), ly in zip(OUT, lanes): c.node(910, ly-28, 220, n, s)
    fan_h(c, 170, lanes, HX-14, mid); fan_h(c, 910, lanes, HX+HW+14, mid, into=False)
    c.port(HX-14, mid); c.port(HX+HW+14, mid)
    return c.svg(f"0 0 1140 {HY+HH+24}", LABEL)

# 2. Vertical: sources on top, ReductStore across the middle, integrations below
def v2():
    c = C(); W = 1000; nw, gap = 210, 20; row = 4*nw + 3*gap; x0 = (W-row)/2
    top = 10; HX, HY, HW = x0, 170, row
    L = HX + 20; IW = HW - 40; cw = (IW - 28) / 3; y = HY + 66
    for i, (t, sub) in enumerate([("Extensions", ["ReductROS, ReductSelect", "ROS &#8594; SQL &#8594; Parquet"]),
                                  ("Labels and queries", ["write with labels", "conditional queries"]),
                                  ("Replication", ["edge to cloud", "filtered by labels"])]):
        c.block(L + i*(cw+14), y, cw, 76, t, sub)
    y += 90; sw = 180
    c.block(L, y, sw, 82, "FIFO quota", ["retention by size"]); c.block(L+sw+14, y, sw, 82, "Local cache", ["hot tier on disk"])
    c.storage(L+2*(sw+14), y, IW-2*(sw+14)); y += 82 + 20
    HH = y - HY; hub = C(); hub.hub(HX, HY, HW, HH); c.p = hub.p + c.p
    cx = HX + HW/2; bot = HY + HH + 120
    for i, (n, s) in enumerate(SRC):
        nx = x0 + i*(nw+gap) + nw/2; c.node(nx-nw/2, top, nw, n, s)
        c.wire(f"M{nx},{top+56} C{nx},{top+110} {cx},{HY-80} {cx},{HY-14}")
    for i, (n, s) in enumerate(OUT):
        nx = x0 + i*(nw+gap) + nw/2; c.node(nx-nw/2, bot, nw, n, s)
        c.wire(f"M{cx},{HY+HH+14} C{cx},{HY+HH+80} {nx},{bot-54} {nx},{bot}", "flow-out")
    c.port(cx, HY-14); c.port(cx, HY+HH+14)
    return c.svg(f"0 0 {W} {bot+70}", LABEL)

# 3. Edge and cloud: two instances joined by replication
def v3():
    c = C(); EX, EY, EW = 300, 20, 300; CX_, CW = 740, 380
    L = EX + 20; IW = EW - 40; y = EY + 66
    c.block(L, y, IW, 76, "Labels and queries", ["write with labels", "conditional queries"]); y += 90
    c.block(L, y, IW, 60, "FIFO quota", ["retention by size"]); y += 74
    c.storage(L, y, IW, ["local disk"], "Storage"); y += 82 + 20
    EH = y - EY
    L2 = CX_ + 20; IW2 = CW - 40; y = EY + 66
    c.block(L2, y, IW2, 76, "Extensions", ["ReductROS, ReductSelect", "ROS &#8594; JSON &#8594; SQL &#8594; Parquet"]); y += 90
    c.block(L2, y, IW2, 60, "Local cache", ["hot tier on disk"]); y += 74
    c.storage(L2, y, IW2, STORE[1:]); y += 82 + 20
    hub = C(); hub.hub(EX, EY, EW, EH, "ReductStore edge"); hub.hub(CX_, EY, CW, EH, "ReductStore cloud"); c.p = hub.p + c.p
    mid = EY + EH/2; lanes = [mid-120, mid-40, mid+40, mid+120]
    for (n, s), ly in zip(SRC, lanes): c.node(10, ly-28, 150, n, s)
    fan_h(c, 160, lanes, EX-14, mid)
    c.wire(f"M{EX+EW+14},{mid} L{CX_-14},{mid}", "flow-rep"); c.text((EX+EW+CX_)/2, mid-14, "replication", "bl"); c.text((EX+EW+CX_)/2, mid+24, "filtered", "s mono")
    OX = CX_ + CW + 140
    for (n, s), ly in zip(OUT, lanes): c.node(OX, ly-28, 220, n, s)
    fan_h(c, OX, lanes, CX_+CW+14, mid, into=False)
    for x in (EX-14, EX+EW+14, CX_-14, CX_+CW+14): c.port(x, mid)
    return c.svg(f"0 0 {OX+232} {EY+EH+24}", LABEL)

# 4. Orbit: nodes on an arc around the hub, straight spokes, no funnel point
def v4():
    c = C(); HX, HY, HW = 420, 40, 480
    L = HX + 20; IW = HW - 40; half = (IW - 14)/2; y = HY + 66
    c.block(L, y, IW, 76, "Extensions", ["ReductROS, ReductSelect", "ROS &#8594; JSON &#8594; SQL &#8594; Parquet"]); y += 90
    c.block(L, y, half, 76, "Labels and queries", ["write with labels", "conditional queries"]); c.block(L+half+14, y, half, 76, "Replication", ["edge to cloud", "filtered by labels"]); y += 90
    c.block(L, y, half, 60, "FIFO quota", ["retention by size"]); c.block(L+half+14, y, half, 60, "Local cache", ["hot tier on disk"]); y += 74
    c.storage(L, y, IW); y += 82 + 20
    HH = y - HY; hub = C(); hub.hub(HX, HY, HW, HH); c.p = hub.p + c.p
    cx, cy = HX + HW/2, HY + HH/2; R = 540
    for side, items, w in [(-1, SRC, 170), (1, OUT, 220)]:
        for i, (n, s) in enumerate(items):
            a = math.radians(-36 + i*24); nx = cx + side*R*math.cos(a); ny = cy + R*0.62*math.sin(a)
            ex = HX-14 if side < 0 else HX+HW+14
            ey = cy + (ny-cy)*0.55
            c.wire(f"M{nx - side*(w/2)},{ny} L{ex},{ey}", "flow-in" if side < 0 else "flow-out"); c.port(ex, ey)
            c.node(nx-w/2, ny-28, w, n, s, rx=28)
    return c.svg(f"0 0 1320 {HY+HH+40}", LABEL)

# 5. Foundation: storage as a wide base under everything
def v5():
    c = C(); HX, HY, HW = 300, 20, 480
    L = HX + 20; IW = HW - 40; half = (IW - 14)/2; y = HY + 66
    c.block(L, y, IW, 76, "Extensions", ["ReductROS, ReductSelect", "ROS &#8594; JSON &#8594; SQL &#8594; Parquet"]); y += 90
    c.block(L, y, half, 76, "Labels and queries", ["write with labels", "conditional queries"]); c.block(L+half+14, y, half, 76, "Replication", ["edge to cloud", "filtered by labels"]); y += 90
    c.block(L, y, IW, 60, "Local cache and FIFO quota", ["hot tier on disk, retention by size"]); y += 60 + 20
    HH = y - HY; hub = C(); hub.hub(HX, HY, HW, HH); c.p = hub.p + c.p
    mid = HY + HH/2; lanes = [mid-105, mid-35, mid+35, mid+105]
    for (n, s), ly in zip(SRC, lanes): c.node(10, ly-28, 160, n, s)
    for (n, s), ly in zip(OUT, lanes): c.node(910, ly-28, 220, n, s)
    fan_h(c, 170, lanes, HX-14, mid); fan_h(c, 910, lanes, HX+HW+14, mid, into=False)
    c.port(HX-14, mid); c.port(HX+HW+14, mid)
    by = HY + HH + 60
    c.wire(f"M{HX+HW/2},{HY+HH+14} L{HX+HW/2},{by}", "flow-out"); c.port(HX+HW/2, HY+HH+14)
    c.rect(10, by, 1120, 70, "box", 24); c.text(40, by+40, "Storage backend", "bl", "start")
    c.chips(680, by+21, STORE)
    return c.svg(f"0 0 1140 {by+82}", LABEL)

NAMES = {"1-stacked-layers": v1, "2-vertical": v2, "3-edge-and-cloud": v3, "4-orbit": v4, "5-foundation": v5}
if __name__ == "__main__":
    for n, f in NAMES.items(): open(f"variant-{n}.svg", "w").write(f())
    print("ok")

# ---- separate block variants: no surrounding container, less text ----
def brand(c, x, y, w, h, title, sub=None, rx=22):
    c.rect(x, y, w, h, "pill", rx); c.text(x+w/2, y+h/2+(-3 if sub else 5), title, "pt")
    if sub: c.text(x+w/2, y+h/2+16, sub, "si mono")

def spine(c, x1, y1, x2, y2, cls="flow-in"):
    c.wire(f"M{x1},{y1} C{(x1+x2)/2},{y1} {(x1+x2)/2},{y2} {x2},{y2}", cls)

# 7. Pipeline: every step of the process as its own card
def v7():
    c = C(); steps = [("Capture", "ROS, MQTT"), ("Label", "metadata"), ("Store", "edge, FIFO"), ("Filter", "conditions"),
                      ("Replicate", "to cloud"), ("Query", "SQL, ROS"), ("Use", "SDKs, Grafana")]
    w, gap, y = 124, 34, 30; x = 10
    for i, (t, s) in enumerate(steps):
        inside = 1 <= i <= 5
        if inside: brand(c, x, y, w, 70, t, s)
        else: c.node(x, y, w, t, s, h=70)
        c.text(x+w/2, y-10, f"0{i+1}", "s mono")
        if i < 6: c.wire(f"M{x+w},{y+35} L{x+w+gap},{y+35}")
        x += w + gap
    x1 = 10 + (w+gap) + 4; x2 = 10 + 5*(w+gap) + w - 4; by = y + 96
    c.wire(f"M{x1},{by-8} L{x1},{by} L{x2},{by} L{x2},{by-8}", "static")
    c.text((x1+x2)/2, by+22, "ReductStore", "bl")
    return c.svg(f"0 0 {x-gap+10} {by+34}", "Seven steps: capture, label, store, filter, replicate, query, use. Steps two to six run in ReductStore.")

# 8. Fleet: every robot runs its own edge instance, one cloud instance collects
def v8():
    c = C(); cols, rows, tw, th = 3, 4, 150, 44; gx, gy = 14, 16; x0, y0 = 22, 24
    H = rows*th + (rows-1)*gy; cloud_x, cloud_w = x0 + cols*tw + (cols-1)*gx + 150, 220; mid = y0 + H/2
    gw = cols*tw + (cols-1)*gx; c.rect(x0-12, y0-12, gw+24, H+24, "halo", 30)
    for r in range(rows):
        for k in range(cols):
            x = x0 + k*(tw+gx); y = y0 + r*(th+gy); n = r*cols + k + 1
            if k == cols-1: c.wire(f"M{x+tw+14},{y+th/2} C{x+tw+80},{y+th/2} {cloud_x-80},{mid} {cloud_x},{mid}")
            c.rect(x, y, tw, th, "card", 22); c.text(x+18, y+th/2+5, f"robot {n:02d}", "s mono", "start")
            c.rect(x+tw-62, y+10, 50, 24, "pill", 12); c.text(x+tw-37, y+27, "edge", "pt small")
    c.text(x0 + (cols*tw+(cols-1)*gx)/2, y0 + H + 34, "one ReductStore per robot, as many as you have", "s")
    c.text((x0+cols*tw+(cols-1)*gx+cloud_x)/2+10, y0+8, "replication", "bl")
    brand(c, cloud_x, mid-50, cloud_w, 100, "ReductStore cloud", "S3, Azure Blob", 28)
    ox = cloud_x + cloud_w + 110; outs = ["SDKs", "Web Console", "Grafana"]
    for i, t in enumerate(outs):
        yy = mid - 80 + i*80; c.rect(ox, yy-24, 150, 48, "card", 24); c.text(ox+75, yy+5, t, "t")
        c.wire(f"M{cloud_x+cloud_w},{mid} C{cloud_x+cloud_w+60},{mid} {ox-60},{yy} {ox},{yy}", "flow-out")
    return c.svg(f"0 0 {ox+160} {y0+H+50}", "A fleet of robots, each with its own edge ReductStore, replicates into one ReductStore in the cloud, read by SDKs, Web Console and Grafana.")

# 9. Minimal: three big blocks, almost no text
def v9():
    c = C(); y, h = 20, 170
    def group(x, w, title, items):
        c.rect(x, y, w, h, "card", 28); c.text(x+w/2, y+40, title, "t")
        for i, t in enumerate(items):
            cw = chipw(t); cx = x + w/2 - cw/2; c.rect(cx, y+58+i*26, cw, 22, "chip", 11); c.text(x+w/2, y+73+i*26, t, "s mono")
    group(10, 200, "Collect", ["ROS", "MQTT", "Zenoh", "cameras"])
    c.wire(f"M210,{y+h/2} L330,{y+h/2}")
    c.rect(330-12, y-12, 360+24, h+24, "halo", 38); brand(c, 330, y, 360, h, "", None, 28)
    c.text(510, y+54, "ReductStore", "pt big")
    for i, t in enumerate(["store at the edge", "replicate what matters", "query with SQL"]):
        c.text(510, y+92+i*24, t, "si")
    c.wire(f"M690,{y+h/2} L810,{y+h/2}", "flow-out")
    group(810, 200, "Use", ["Python", "Grafana", "Console", "CLI"])
    return c.svg(f"0 0 1020 {y+h+24}", "Collect from ROS, MQTT, Zenoh and cameras into ReductStore, then use the data from Python, Grafana, the Console and the CLI.")

# 10. Hierarchy: robots to site to cloud, scaling by adding branches
def v10():
    c = C(); W = 1100; cloud_y, site_y, dev_y = 20, 170, 310
    brand(c, W/2-130, cloud_y, 260, 76, "ReductStore cloud", "S3, Azure Blob", 28)
    sites = [W/2-340, W/2, W/2+340]
    for si, sx in enumerate(sites):
        c.wire(f"M{sx},{site_y} C{sx},{site_y-50} {W/2},{cloud_y+130} {W/2},{cloud_y+76}")
        brand(c, sx-100, site_y, 200, 62, f"site {chr(65+si)}", "ReductStore", 24)
        for d in range(3):
            dx = sx - 105 + d*105
            c.wire(f"M{dx},{dev_y} C{dx},{dev_y-40} {sx},{site_y+100} {sx},{site_y+62}")
            c.rect(dx-46, dev_y, 92, 40, "card", 20); c.text(dx, dev_y+25, "robot", "s mono")
    for y, t in [(cloud_y+44, "cloud"), (site_y+37, "site"), (dev_y+25, "device")]:
        c.text(10, y, t, "s mono", "start")
    ox = W/2 + 200
    for i, t in enumerate(["SDKs", "Grafana"]):
        yy = cloud_y + 18 + i*42; c.rect(ox+80, yy-16, 130, 34, "card", 17); c.text(ox+145, yy+6, t, "s mono")
        c.wire(f"M{W/2+130},{cloud_y+38} C{ox+20},{cloud_y+38} {ox+40},{yy} {ox+80},{yy}", "flow-out")
    return c.svg(f"0 0 {W} {dev_y+54}", "Robots replicate to a ReductStore per site, and each site replicates to ReductStore in the cloud.")

NAMES.update({"7-pipeline": v7, "8-fleet": v8, "9-minimal": v9, "10-hierarchy": v10})
for n in ["7-pipeline", "8-fleet", "9-minimal", "10-hierarchy"]: open(f"variant-{n}.svg", "w").write(NAMES[n]())


# 11. Edge and cloud, storage below each instance, colors of the current site diagram
def v11():
    c = C(); EX, EY, EW = 300, 20, 300; CX_, CW = 740, 380
    L = EX + 20; IW = EW - 40; y = EY + 66
    c.block(L, y, IW, 76, "Labels and queries", ["write with labels", "conditional queries"]); y += 90
    c.block(L, y, IW, 60, "FIFO quota", ["retention by size"]); y += 60 + 20
    EH = y - EY
    L2 = CX_ + 20; IW2 = CW - 40; y = EY + 66
    c.block(L2, y, IW2, 76, "Extensions", ["ReductROS, ReductSelect", "ROS &#8594; JSON &#8594; SQL &#8594; Parquet"]); y += 90
    c.block(L2, y, IW2, 60, "Local cache", ["hot tier on disk"]); y += 60 + 20
    assert y - EY == EH
    hub = C(); hub.hub(EX, EY, EW, EH, "ReductStore edge"); hub.hub(CX_, EY, CW, EH, "ReductStore cloud"); c.p = hub.p + c.p
    mid = EY + EH/2; lanes = [mid-105, mid-35, mid+35, mid+105]
    for (n, s_), ly in zip(SRC, lanes): c.node(10, ly-28, 150, n, s_)
    fan_h(c, 160, lanes, EX-14, mid)
    c.wire(f"M{EX+EW+14},{mid} L{CX_-14},{mid}", "flow-rep"); c.text((EX+EW+CX_)/2, mid-14, "replication", "bl"); c.text((EX+EW+CX_)/2, mid+24, "filtered", "s mono")
    OX = CX_ + CW + 140
    for (n, s_), ly in zip(OUT, lanes): c.node(OX, ly-28, 220, n, s_)
    fan_h(c, OX, lanes, CX_+CW+14, mid, into=False)
    for x in (EX-14, EX+EW+14, CX_-14, CX_+CW+14): c.port(x, mid)
    # storage below each instance
    sy = EY + EH + 60
    def store(x, w, title, items):
        c.wire(f"M{x+w/2},{EY+EH+14} L{x+w/2},{sy}", "flow-out"); c.port(x+w/2, EY+EH+14)
        c.rect(x, sy, w, 84, "coral", 20); c.text(x+w/2, sy+26, title, "ct")
        tot = sum(chipw(t) for t in items) + 8*(len(items)-1); assert tot <= w - 20
        cx = x + w/2 - tot/2
        for t in items:
            cw = chipw(t); c.rect(cx, sy+40, cw, 28, "cchip", 14); c.text(cx+cw/2, sy+59, t, "cs mono"); cx += cw + 8
    store(EX, EW, "Storage", ["local disk"])
    store(CX_, CW, "Storage backend", STORE[1:])
    cy = sy + 84 + 34
    c.text(EX+EW/2, cy, "N devices", "cap"); c.text(CX_+CW/2, cy, "N replicas", "cap")
    return c.svg(f"0 -8 {OX+232} {cy+22}", "Robots, PLCs, cameras and fleets write to ReductStore at the edge on local disk, which replicates filtered data to ReductStore in the cloud backed by S3, Azure Blob or S3 compatible storage, read by SDKs, Web Console, Grafana and the CLI.")

NAMES["11-edge-cloud-storage-below"] = v11
open("variant-11-edge-cloud-storage-below.svg", "w").write(v11())


# 12. Backbone: logos on top feeding a horizontal edge to cloud backbone, storage below
import json
LOGOS = json.load(open("logos/logos.json"))
def logo(c, name, cx, cy, h):
    vb, d, tr = LOGOS[name]; _, _, vw, vh = map(float, vb.split()); w = h * vw / vh
    k = h / vh; inner = f'<g transform="{tr}"><path d="{d}"/></g>' if tr else f'<path d="{d}"/>'
    c.p.append(f'<g class="logo" transform="translate({cx-w/2:.1f},{cy-h/2:.1f}) scale({k:.5f})">{inner}</g>')

def v12():
    c = C(); W = 1280
    EX, EW, CX_, CW = 60, 440, 780, 440; HY = 210; y = HY + 66
    half = (EW - 40 - 14) / 2
    c.block(EX+20, y, half, 76, "Labels and queries", ["write with labels", "conditional queries"])
    c.block(EX+20+half+14, y, half, 76, "FIFO quota", ["retention by size"])
    c.block(CX_+20, y, half, 76, "Extensions", ["ReductROS", "ReductSelect"])
    c.block(CX_+20+half+14, y, half, 76, "Local cache", ["hot tier on disk"])
    HH = 66 + 76 + 20
    hub = C(); hub.rect(EX-34, HY-30, CX_+CW-EX+68, HH+60, "halo", 44)
    hub.hub(EX, HY, EW, HH, "ReductStore edge"); hub.hub(CX_, HY, CW, HH, "ReductStore cloud"); c.p = hub.p + c.p
    mid = HY + HH/2
    c.wire(f"M{EX+EW+14},{mid} L{CX_-14},{mid}", "flow-rep"); c.port(EX+EW+14, mid); c.port(CX_-14, mid)
    c.text((EX+EW+CX_)/2, mid-14, "replication", "bl"); c.text((EX+EW+CX_)/2, mid+24, "filtered", "s mono")
    # logos on top
    ly = 88; ex, cx = EX+EW/2, CX_+CW/2
    c.text(ex, 26, "Robots and sensors", "head"); c.text(cx, 26, "Your applications", "head")
    left = [("ros", 40), ("mqtt", 40), ("zenoh", 36), ("mcap", 44)]
    right = [("python", 40), ("javascript", 40), ("go", 44), ("rust", 40), ("cplusplus", 40), ("grafana", 40), ("jupyter", 40)]
    def row(items, center, span, into):
        xs = [center - span/2 + i*span/(len(items)-1) for i in range(len(items))]
        if items[0][0] == "ros": xs = [center-195, center-115, center+15, center+165]
        for (n, h), x in zip(items, xs):
            logo(c, n, x, ly, h)
            if into: c.wire(f"M{x},{ly+34} C{x},{ly+80} {center},{HY-70} {center},{HY-14}", "flow-in")
            else:    c.wire(f"M{center},{HY-14} C{center},{HY-70} {x},{ly+80} {x},{ly+34}", "flow-out")
        c.port(center, HY-14)
    row(left, ex, 360, True); row(right, cx, 400, False)
    # storage below
    sy = HY + HH + 70
    def store(x, w, title, items):
        c.wire(f"M{x+w/2},{HY+HH+14} L{x+w/2},{sy}", "flow-out"); c.port(x+w/2, HY+HH+14)
        c.rect(x, sy, w, 84, "coral", 20); c.text(x+w/2, sy+26, title, "ct")
        tot = sum(chipw(t) for t in items) + 8*(len(items)-1); px = x + w/2 - tot/2
        for t in items:
            cw = chipw(t); c.rect(px, sy+40, cw, 28, "cchip", 14); c.text(px+cw/2, sy+59, t, "cs mono"); px += cw + 8
    store(EX+60, EW-120, "Storage", ["local disk"]); store(CX_+30, CW-60, "Storage backend", STORE[1:])
    cy = sy + 84 + 34
    c.text(ex, cy, "N devices", "cap"); c.text(cx, cy, "N replicas", "cap")
    return c.svg(f"20 0 {W-40} {cy+14}", "ROS, MQTT, Zenoh and MCAP data flows into ReductStore at the edge, which replicates filtered data to ReductStore in the cloud. Python, JavaScript, Go, Rust, C++, Grafana and Jupyter read from the cloud. Storage sits below each instance.")

NAMES["12-backbone"] = v12
open("variant-12-backbone.svg", "w").write(v12())

def v13():
    c = C(); W = 1280
    EX, EW, CX_, CW = 60, 440, 780, 440; HY = 166; y = HY + 66
    half = (EW - 40 - 14) / 2
    c.block(EX+20, y, half, 60, "Labels and queries", ["filter by label"])
    c.block(EX+20+half+14, y, half, 60, "FIFO quota", ["size based"])
    c.block(CX_+20, y, half, 60, "Extensions", ["ROS, MCAP, CSV, JSON"])
    c.block(CX_+20+half+14, y, half, 60, "Local cache", ["hot data"])
    HH = 66 + 60 + 20
    hub = C(); hub.rect(EX-34, HY-30, CX_+CW-EX+68, HH+60, "halo", 44)
    hub.hub(EX, HY, EW, HH, "ReductStore edge"); hub.hub(CX_, HY, CW, HH, "ReductStore cloud"); c.p = hub.p + c.p
    mid = HY + HH/2
    c.wire(f"M{EX+EW+14},{mid} L{CX_-14},{mid}", "flow-rep"); c.port(EX+EW+14, mid); c.port(CX_-14, mid)
    c.text((EX+EW+CX_)/2, mid-14, "replication", "bl"); c.text((EX+EW+CX_)/2, mid+24, "filtered", "s mono")
    # logos on top
    ly = 44; ex, cx = EX+EW/2, CX_+CW/2
    left = [("ros", 40), ("mqtt", 40), ("zenoh", 36), ("mcap", 44)]
    right = [("python", 40), ("javascript", 40), ("go", 44), ("rust", 40), ("cplusplus", 40), ("grafana", 40), ("jupyter", 40)]
    def row(items, center, span, into):
        xs = [center - span/2 + i*span/(len(items)-1) for i in range(len(items))]
        if items[0][0] == "ros": xs = [center-195, center-115, center+15, center+165]
        for (n, h), x in zip(items, xs):
            logo(c, n, x, ly, h)
            if into: c.wire(f"M{x},{ly+34} C{x},{ly+80} {center},{HY-70} {center},{HY-14}", "flow-in")
            else:    c.wire(f"M{center},{HY-14} C{center},{HY-70} {x},{ly+80} {x},{ly+34}", "flow-out")
        c.port(center, HY-14)
    row(left, ex, 360, True); row(right, cx, 400, False)
    # storage below
    sy = HY + HH + 70
    def store(x, w, title, items):
        c.wire(f"M{x+w/2},{HY+HH+14} L{x+w/2},{sy}", "flow-out"); c.port(x+w/2, HY+HH+14)
        c.rect(x, sy, w, 84, "coral", 20); c.text(x+w/2, sy+26, title, "ct")
        tot = sum(chipw(t) for t in items) + 8*(len(items)-1); px = x + w/2 - tot/2
        for t in items:
            cw = chipw(t); c.rect(px, sy+40, cw, 28, "cchip", 14); c.text(px+cw/2, sy+59, t, "cs mono"); px += cw + 8
    store(EX+60, EW-120, "Storage", ["local disk"]); store(CX_+30, CW-60, "Storage backend", STORE[1:])
    cy = sy + 84
    return c.svg(f"20 10 {W-40} {cy+2}", "ROS, MQTT, Zenoh and MCAP data flows into ReductStore at the edge, which replicates filtered data to ReductStore in the cloud. Python, JavaScript, Go, Rust, C++, Grafana and Jupyter read from the cloud. Storage sits below each instance.")


NAMES["13-backbone-clean"] = v13
open("variant-13-backbone-clean.svg", "w").write(v13())

def v14():
    c = C(); W = 1280
    EX, EW, CX_, CW = 60, 440, 780, 440; HY = 166; y = HY + 66
    half = (EW - 40 - 14) / 2
    c.block(EX+20, y, half, 60, "Labels and queries", ["filter by label"])
    c.block(EX+20+half+14, y, half, 60, "FIFO quota", ["size based"])
    c.block(CX_+20, y, half, 60, "Extensions", ["ROS, MCAP, CSV, JSON"])
    c.block(CX_+20+half+14, y, half, 60, "Local cache", ["hot data"])
    HH = 66 + 60 + 20
    hub = C(); hub.rect(EX-34, HY-30, CX_+CW-EX+68, HH+60, "halo", 44)
    hub.hub(EX, HY, EW, HH, "ReductStore edge"); hub.hub(CX_, HY, CW, HH, "ReductStore cloud"); c.p = hub.p + c.p
    mid = HY + HH/2
    c.wire(f"M{EX+EW+14},{mid} L{CX_-14},{mid}", "flow-rep"); c.port(EX+EW+14, mid); c.port(CX_-14, mid)
    c.text((EX+EW+CX_)/2, mid-14, "replication", "bl"); c.text((EX+EW+CX_)/2, mid+24, "filtered", "s mono")
    # logos on top
    ly = 44; ex, cx = EX+EW/2, CX_+CW/2
    left = [("ros", 40), ("mqtt", 40), ("zenoh", 36), ("http", 0)]
    right = [("python", 40), ("javascript", 40), ("go", 44), ("rust", 40), ("cplusplus", 40), ("grafana", 40)]
    def row(items, center, span, into):
        xs = [center - span/2 + i*span/(len(items)-1) for i in range(len(items))]
        if items[0][0] == "ros": xs = [center-180, center-100, center+30, center+180]
        for (n, h), x in zip(items, xs):
            if n == "http":
                c.p.append(f'<rect x="{x-52}" y="{ly-17}" width="104" height="34" rx="17" fill="none" stroke="var(--accent)" stroke-width="2"/>')
                c.text(x, ly+5, "HTTP API", "bl mono")
            else: logo(c, n, x, ly, h)
            if into: c.wire(f"M{x},{ly+34} C{x},{ly+80} {center},{HY-70} {center},{HY-14}", "flow-in")
            else:    c.wire(f"M{center},{HY-14} C{center},{HY-70} {x},{ly+80} {x},{ly+34}", "flow-out")
        c.port(center, HY-14)
    row(left, ex, 360, True); row(right, cx, 360, False)
    # storage below
    sy = HY + HH + 70
    def store(x, w, title, items):
        c.wire(f"M{x+w/2},{HY+HH+14} L{x+w/2},{sy}", "flow-out"); c.port(x+w/2, HY+HH+14)
        c.rect(x, sy, w, 84, "coral", 20); c.text(x+w/2, sy+26, title, "ct")
        tot = sum(chipw(t) for t in items) + 8*(len(items)-1); px = x + w/2 - tot/2
        for t in items:
            cw = chipw(t); c.rect(px, sy+40, cw, 28, "cchip", 14); c.text(px+cw/2, sy+59, t, "cs mono"); px += cw + 8
    store(EX+60, EW-120, "Storage", ["local disk"]); store(CX_+30, CW-60, "Storage backend", STORE[1:])
    cy = sy + 84
    return c.svg(f"20 10 {W-40} {cy+2}", "ROS, MQTT, Zenoh and HTTP data flows into ReductStore at the edge, which replicates filtered data to ReductStore in the cloud. Python, JavaScript, Go, Rust, C++ and Grafana read from the cloud. Storage sits below each instance.")



NAMES["14-backbone-final"] = v14
open("variant-14-backbone-final.svg", "w").write(v14())

def v15():
    c = C(); W = 1280
    EX, EW, CX_, CW = 60, 440, 780, 440; HY = 166; y = HY + 66
    half = (EW - 40 - 14) / 2
    c.block(EX+20, y, half, 60, "Labels and queries", ["filter by label"])
    c.block(EX+20+half+14, y, half, 60, "FIFO quota", ["size based"])
    c.block(CX_+20, y, half, 60, "Extensions", ["ROS, MCAP, CSV, JSON"])
    c.block(CX_+20+half+14, y, half, 60, "Local cache", ["hot data"])
    HH = 66 + 60 + 20
    hub = C(); hub.rect(EX-34, HY-30, CX_+CW-EX+68, HH+60, "halo", 44)
    hub.hub(EX, HY, EW, HH, "ReductStore edge"); hub.hub(CX_, HY, CW, HH, "ReductStore cloud"); c.p = hub.p + c.p
    mid = HY + HH/2
    c.wire(f"M{EX+EW+14},{mid} L{CX_-14},{mid}", "flow-rep"); c.port(EX+EW+14, mid); c.port(CX_-14, mid)
    c.text((EX+EW+CX_)/2, mid-14, "replication", "bl"); c.text((EX+EW+CX_)/2, mid+24, "filtered", "s mono")
    # logos on top
    ly = 44; ex, cx = EX+EW/2, CX_+CW/2
    left = [("ros", 40), ("mqtt", 40), ("zenoh", 32), ("plc", 0), ("vibration", 0)]
    right = [("python", 40), ("javascript", 40), ("go", 44), ("rust", 40), ("cplusplus", 40), ("grafana", 40)]
    def row(items, center, span, into):
        xs = [center - span/2 + i*span/(len(items)-1) for i in range(len(items))]
        if items[0][0] == "ros": xs = [center-212, center-145, center-38, center+82, center+178]
        for (n, h), x in zip(items, xs):
            if n == "plc":
                c.p.append(f'<rect x="{x-28}" y="{ly-20}" width="56" height="40" rx="7" fill="none" stroke="var(--accent)" stroke-width="2.5"/>')
                for k in range(4): c.p.append(f'<rect x="{x-21+k*11}" y="{ly-15}" width="7" height="6" rx="1.5" class="logo"/>')
                c.p.append(f'<circle cx="{x+19}" cy="{ly+11}" r="2.5" class="logo"/>')
                c.p.append(f'<text x="{x-3}" y="{ly+14}" text-anchor="middle" class="logo" style="font-weight:800;font-size:13px;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">PLC</text>')
            elif n == "vibration":
                amps = [2, 5, 11, 17, 11, 17, 8, 4, 2]; pts = []
                for k, a in enumerate(amps):
                    pts.append(f"{x-28+k*7:.1f},{ly-a if k%2 else ly+a}")
                c.p.append(f'<polyline points="{x-34},{ly} {" ".join(pts)} {x+34},{ly}" fill="none" stroke="var(--accent)" stroke-width="2.8" stroke-linejoin="round" stroke-linecap="round"/>')
            else: logo(c, n, x, ly, h)
            if into: c.wire(f"M{x},{ly+34} C{x},{ly+80} {center},{HY-70} {center},{HY-14}", "flow-in")
            else:    c.wire(f"M{center},{HY-14} C{center},{HY-70} {x},{ly+80} {x},{ly+34}", "flow-out")
        c.port(center, HY-14)
    row(left, ex, 360, True); row(right, cx, 360, False)
    # storage below
    sy = HY + HH + 70
    def store(x, w, title, items):
        c.wire(f"M{x+w/2},{HY+HH+14} L{x+w/2},{sy}", "flow-out"); c.port(x+w/2, HY+HH+14)
        c.rect(x, sy, w, 84, "coral", 20); c.text(x+w/2, sy+26, title, "ct")
        tot = sum(chipw(t) for t in items) + 8*(len(items)-1); px = x + w/2 - tot/2
        for t in items:
            cw = chipw(t); c.rect(px, sy+40, cw, 28, "cchip", 14); c.text(px+cw/2, sy+59, t, "cs mono"); px += cw + 8
    store(EX+60, EW-120, "Storage", ["local disk"]); store(CX_+30, CW-60, "Storage backend", STORE[1:])
    cy = sy + 84
    return c.svg(f"20 10 {W-40} {cy+2}", "ROS, MQTT, Zenoh, PLC and vibration data flows into ReductStore at the edge, which replicates filtered data to ReductStore in the cloud. Python, JavaScript, Go, Rust, C++ and Grafana read from the cloud. Storage sits below each instance.")




NAMES["15-backbone-machines"] = v15
open("variant-15-backbone-machines.svg", "w").write(v15())

def v16():
    c = C(); W = 1280
    EX, EW, CX_, CW = 60, 440, 780, 440; HY = 166; y = HY + 66
    half = (EW - 40 - 14) / 2
    c.block(EX+20, y, half, 60, "Labels and queries", ["filter by label"])
    c.block(EX+20+half+14, y, half, 60, "FIFO quota", ["size based"])
    c.block(CX_+20, y, half, 60, "Extensions", ["ROS, MCAP, CSV, JSON"])
    c.block(CX_+20+half+14, y, half, 60, "Local cache", ["hot data"])
    HH = 66 + 60 + 20
    hub = C()
    hub.hub(EX, HY, EW, HH, "ReductStore edge"); hub.hub(CX_, HY, CW, HH, "ReductStore cloud"); c.p = hub.p + c.p
    mid = HY + HH/2
    c.wire(f"M{EX+EW+14},{mid} L{CX_-14},{mid}", "flow-rep"); c.port(EX+EW+14, mid); c.port(CX_-14, mid)
    c.text((EX+EW+CX_)/2, mid-14, "replication", "bl"); c.text((EX+EW+CX_)/2, mid+24, "filtered", "s mono")
    # logos on top
    ly = 44; ex, cx = EX+EW/2, CX_+CW/2
    left = [("ros", 40), ("mqtt", 40), ("zenoh", 32), ("plc", 0), ("vibration", 0)]
    right = [("python", 40), ("javascript", 40), ("go", 44), ("rust", 40), ("cplusplus", 40), ("grafana", 40)]
    def row(items, center, span, into):
        xs = [center - span/2 + i*span/(len(items)-1) for i in range(len(items))]
        if items[0][0] == "ros": xs = [center-212, center-145, center-38, center+82, center+178]
        for (n, h), x in zip(items, xs):
            if n == "plc":
                c.p.append(f'<rect x="{x-28}" y="{ly-20}" width="56" height="40" rx="7" fill="none" stroke="var(--accent)" stroke-width="2.5"/>')
                for k in range(4): c.p.append(f'<rect x="{x-21+k*11}" y="{ly-15}" width="7" height="6" rx="1.5" class="logo"/>')
                c.p.append(f'<circle cx="{x+19}" cy="{ly+11}" r="2.5" class="logo"/>')
                c.p.append(f'<text x="{x-3}" y="{ly+14}" text-anchor="middle" class="logo" style="font-weight:800;font-size:13px;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">PLC</text>')
            elif n == "vibration":
                amps = [2, 5, 11, 17, 11, 17, 8, 4, 2]; pts = []
                for k, a in enumerate(amps):
                    pts.append(f"{x-28+k*7:.1f},{ly-a if k%2 else ly+a}")
                c.p.append(f'<polyline points="{x-34},{ly} {" ".join(pts)} {x+34},{ly}" fill="none" stroke="var(--accent)" stroke-width="2.8" stroke-linejoin="round" stroke-linecap="round"/>')
            else: logo(c, n, x, ly, h)
            if into: c.wire(f"M{x},{ly+34} C{x},{ly+80} {center},{HY-70} {center},{HY-14}", "flow-in")
            else:    c.wire(f"M{center},{HY-14} C{center},{HY-70} {x},{ly+80} {x},{ly+34}", "flow-out")
        c.port(center, HY-14)
    row(left, ex, 360, True); row(right, cx, 360, False)
    # storage below
    sy = HY + HH + 70
    def store(x, w, title, items):
        c.wire(f"M{x+w/2},{HY+HH+14} L{x+w/2},{sy}", "flow-out"); c.port(x+w/2, HY+HH+14)
        c.rect(x, sy, w, 84, "coral", 20); c.text(x+w/2, sy+26, title, "ct")
        tot = sum(chipw(t) for t in items) + 8*(len(items)-1); px = x + w/2 - tot/2
        for t in items:
            cw = chipw(t); c.rect(px, sy+40, cw, 28, "cchip", 14); c.text(px+cw/2, sy+59, t, "cs mono"); px += cw + 8
    store(EX+60, EW-120, "Storage", ["local disk"]); store(CX_+30, CW-60, "Storage backend", STORE[1:])
    cy = sy + 84
    return c.svg(f"20 10 {W-40} {cy+2}", "ROS, MQTT, Zenoh, PLC and vibration data flows into ReductStore at the edge, which replicates filtered data to ReductStore in the cloud. Python, JavaScript, Go, Rust, C++ and Grafana read from the cloud. Storage sits below each instance.")





NAMES["16-backbone-single-halo"] = v16
open("variant-16-backbone-single-halo.svg", "w").write(v16())

# ReductBridge diagram in the same light style as the hero
def bridge():
    c = C(); ins = [("ROS 1", "topics"), ("ROS 2", "topics"), ("MQTT", "topics"), ("HTTP", "requests"), ("System", "metrics"), ("Shell", "commands")]
    nh, gap, y0 = 44, 12, 10; H = len(ins)*nh + (len(ins)-1)*gap; mid = y0 + H/2
    BX, BW, BH = 310, 200, 110; SX, SW = 670, 220
    for i, (n, s_) in enumerate(ins):
        y = y0 + i*(nh+gap)
        c.rect(10, y, 180, nh, "card", 22); c.text(32, y+nh/2+5, n, "t", "start"); c.text(170, y+nh/2+5, s_, "s mono", "end")
        c.wire(f"M190,{y+nh/2} C250,{y+nh/2} {BX-70},{mid} {BX-14},{mid}")
    c.port(BX-14, mid)
    c.rect(BX, mid-BH/2, BW, BH, "coral", 24); c.text(BX+BW/2, mid-4, "ReductBridge", "pt"); c.text(BX+BW/2, mid+18, "pipelines", "cs mono")
    c.wire(f"M{BX+BW+14},{mid} L{SX-14},{mid}", "flow-rep"); c.port(BX+BW+14, mid); c.port(SX-14, mid)
    c.text((BX+BW+SX)/2, mid-14, "labeled data", "bl")
    c.rect(SX-14, mid-BH/2-14, SW+28, BH+28, "halo", 36)
    c.rect(SX, mid-BH/2, SW, BH, "pill", 24); c.text(SX+SW/2, mid+6, "ReductStore", "pt")
    return c.svg(f"0 0 {SX+SW+24} {y0+H+10}", "ROS 1, ROS 2, MQTT, HTTP, system metrics and shell inputs flow into ReductBridge, which sends labeled data to ReductStore.")
open("reduct-bridge.svg", "w").write(bridge())
