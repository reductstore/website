# Regenerate with: python3 build.py (set CHROMIUM if the binary is not on PATH as "chromium")
import os
import subprocess

DEFS = '''<defs>
    <style>
      :root {
        --card-bg: #FFFFFF;
        --card-brand: #2B0548;
        --card-stroke: #333333;
        --shadow: #000000;
        --text-main: #333333;
        --text-muted: #666666;
        --text-inverse: #FFFFFF;
        --line: #333333;
      }

      @media (prefers-color-scheme: dark) {
        :root {
          --card-bg: #1E1E1E;
          --card-stroke: #555555;
          --shadow: #000000;
          --text-main: #EFEFEF;
          --text-muted: #A0A0A0;
          --line: #EFEFEF;
        }
      }

      text {
        font-family: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      }
      .mono {
        font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
      }

      .card-standard { fill: var(--card-bg); stroke: var(--card-stroke); stroke-width: 2; }
      .card-brand { fill: var(--card-brand); stroke: var(--card-stroke); stroke-width: 2; }
      .shadow { fill: var(--shadow); }

      .text-title { font-weight: 600; font-size: 18px; fill: var(--text-main); }
      .text-title-inverse { font-weight: 600; font-size: 18px; fill: var(--text-inverse); }
      .text-subtitle { font-size: 14px; fill: var(--text-muted); }
      .text-subtitle-inverse { font-size: 14px; fill: var(--text-inverse); }
      .text-label { font-size: 13px; fill: var(--text-muted); }
      .text-label-strong { font-size: 13px; font-weight: 700; fill: var(--text-main); }

      .connector { stroke: var(--line); stroke-width: 2; fill: none; }
      .link { stroke: var(--line); stroke-width: 2; stroke-dasharray: 5 5; fill: none; }
      .arrow-head { fill: var(--line); }
    </style>

    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" class="arrow-head" />
    </marker>
  </defs>'''

p = []


def card(x, y, w, h, title, sub, brand=False):
    kind = "brand" if brand else "standard"
    inv = "-inverse" if brand else ""
    p.append(f'<rect x="{x + 8}" y="{y + 8}" width="{w}" height="{h}" rx="16" class="shadow" />')
    p.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="16" class="card-{kind}" />')
    cx = x + w / 2
    p.append(f'<text x="{cx}" y="{y + h / 2 - 6}" class="text-title{inv}" text-anchor="middle">{title}</text>')
    p.append(f'<text x="{cx}" y="{y + h / 2 + 18}" class="text-subtitle{inv} mono" text-anchor="middle">{sub}</text>')


def arrow(d):
    p.append(f'<path d="{d}" class="connector" marker-end="url(#arrow)" />')


def label(x, y, t, cls="text-label", anchor="middle"):
    p.append(f'<text x="{x}" y="{y}" class="{cls} mono" text-anchor="{anchor}">{t}</text>')


H = 80
W = 280
CW, GAP = 270, 60
TOTAL = 2 * CW + GAP
CX = TOTAL / 2
Y1, Y2, SPLIT, Y3 = 20, 150, 262, 330
LX, RX = CW / 2, CW + GAP + CW / 2

card(CX - W / 2, Y1, W, H, "Robot sensors", "camera, LiDAR, waveform")
arrow(f"M{CX},{Y1 + H} L{CX},{Y2 - 4}")
card(CX - W / 2, Y2, W, H, "Processing and fan-out", "event time + stable IDs")

p.append(f'<path d="M{CX},{Y2 + H} L{CX},{SPLIT} M{LX},{SPLIT} L{RX},{SPLIT}" class="connector" />')
arrow(f"M{LX},{SPLIT} L{LX},{Y3 - 4}")
arrow(f"M{RX},{SPLIT} L{RX},{Y3 - 4}")
label(LX + 10, SPLIT + 30, "numeric metrics", anchor="start")
label(RX - 10, SPLIT + 30, "raw binary payloads", "text-label-strong", anchor="end")

card(0, Y3, CW, H, "InfluxDB", "metrics, dashboards, alerts")
card(CW + GAP, Y3, CW, H, "ReductStore", "frames, scans, chunks", brand=True)

LY = Y3 + H + 36
p.append(f'<path d="M{LX},{Y3 + H + 12} L{LX},{LY} L{RX},{LY} L{RX},{Y3 + H + 12}" class="link" />')
label(CX, LY + 24, "same event time, robot_id, sensor_id")

VIEWBOX = f"-10 {Y1 - 10} {TOTAL + 8 + 20} {LY + 34 - (Y1 - 10)}"
svg = "\n".join(
    [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{VIEWBOX}" width="100%" height="100%">', DEFS] + p + ["</svg>", ""]
)
open("influxdb-reductstore-flow.svg", "w").write(svg)
print("viewBox", VIEWBOX)

here = os.path.dirname(os.path.abspath(__file__))
page = os.path.join(here, "social.html")
open(page, "w").write(
    '<!doctype html><meta charset="utf-8"><style>html,body{margin:0;background:#fff}'
    "body{width:1200px;height:630px;display:flex;align-items:center;justify-content:center}"
    "svg{display:block;height:570px;width:auto}</style>" + svg
)
try:
    subprocess.run(
        [os.environ.get("CHROMIUM", "chromium"), "--headless", "--no-sandbox", "--hide-scrollbars",
         "--force-prefers-color-scheme=light", "--window-size=1200,630",
         "--screenshot=" + os.path.join(here, "influxdb-reductstore-social.png"), "file://" + page],
        check=True, capture_output=True,
    )
finally:
    os.remove(page)
