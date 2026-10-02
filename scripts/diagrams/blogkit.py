"""Shared drawing kit for ReductStore blog and use case diagrams.

The style is the one of blog/2026-02-24-air-gapped-drone-data/img/drone-workflow.svg:
flat white boxes, dashed zones for where things run, purple for ReductStore, hairline
connectors with one arrow marker, sans labels and mono for technical tokens.

A post keeps its own img/build.py next to the images:

    import sys
    from pathlib import Path
    sys.path.insert(0, str(Path(__file__).resolve().parents[3] / "scripts/diagrams"))
    from blogkit import Diagram

    d = Diagram()
    d.card(0, 0, 240, 80, "Robot sensors", "camera, LiDAR")
    d.save(Path(__file__).with_name("robot-flow.svg"))

The viewBox is cropped to the drawn content, so coordinates can start anywhere.
"""

import html
import os
import shutil
import subprocess
import tempfile
from pathlib import Path

STYLE = """<defs>
    <style>
      :root {
        --card-bg: #FFFFFF;
        --card-brand: #2B0548;
        --brand-line: #2B0548;
        --card-accent: #DB817B;
        --card-stroke: #333333;
        --text-main: #333333;
        --text-muted: #666666;
        --text-inverse: #FFFFFF;
        --line: #333333;
        --zone: #F7F4FA;
        --label-a: #D5E8D4;
        --label-a-stroke: #82B366;
        --label-b: #E1D5E7;
        --label-b-stroke: #9673A6;
        --label-c: #F8CECC;
        --label-c-stroke: #B85450;
      }

      @media (prefers-color-scheme: dark) {
        :root {
          --card-bg: #1E1E1E;
          --card-stroke: #555555;
            --text-main: #EFEFEF;
          --text-muted: #A0A0A0;
          --line: #EFEFEF;
          --zone: #262129;
          --brand-line: #BFA6DC;
        }
      }

      text {
        font-family: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      }
      .mono {
        font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
        white-space: pre;
      }

      .card-standard { fill: var(--card-bg); stroke: var(--card-stroke); stroke-width: 2; }
      .card-brand { fill: var(--card-brand); stroke: var(--card-stroke); stroke-width: 2; }
      .card-brand-frame { fill: var(--card-bg); stroke: var(--brand-line); stroke-width: 2; }
      .card-accent { fill: var(--card-accent); stroke: var(--card-stroke); stroke-width: 1.5; }
      .card-plain { fill: var(--card-bg); stroke: var(--card-stroke); stroke-width: 1.5; }
      .zone { fill: var(--zone); stroke: var(--card-stroke); stroke-width: 1.5; stroke-dasharray: 6 5; }
      .hatch { fill: url(#hatch); stroke: var(--card-stroke); stroke-width: 1.5; }
      .hatch-line { stroke: var(--line); stroke-width: 1.5; }
      .record { fill: var(--card-bg); stroke: var(--card-stroke); stroke-width: 1; }
      .label-a { fill: var(--label-a); stroke: var(--label-a-stroke); }
      .label-b { fill: var(--label-b); stroke: var(--label-b-stroke); }
      .label-c { fill: var(--label-c); stroke: var(--label-c-stroke); }
      .dot { fill: var(--text-muted); }

      .text-zone { font-weight: 700; font-size: 15px; fill: var(--text-main); }
      .text-title { font-weight: 600; font-size: 18px; fill: var(--text-main); }
      .text-title-inverse { font-weight: 600; font-size: 18px; fill: var(--text-inverse); }
      .text-title-brand { font-weight: 700; font-size: 18px; fill: var(--brand-line); }
      .text-item-brand { font-weight: 700; font-size: 15px; fill: var(--brand-line); }
      .text-item { font-weight: 600; font-size: 15px; fill: var(--text-main); }
      .text-item-inverse { font-weight: 600; font-size: 15px; fill: var(--text-inverse); }
      .text-subtitle { font-size: 14px; fill: var(--text-muted); }
      .text-subtitle-inverse { font-size: 14px; fill: var(--text-inverse); }
      .text-bullet { font-size: 15px; fill: var(--text-main); }
      .text-bullet-inverse { font-size: 15px; fill: var(--text-inverse); }
      .text-label { font-size: 13px; fill: var(--text-muted); }
      .text-label-strong { font-size: 13px; font-weight: 700; fill: var(--text-main); }
      .text-label-inverse { font-size: 13px; fill: var(--text-inverse); }
      .text-note { font-size: 13px; font-style: italic; fill: var(--text-muted); }

      .connector { stroke: var(--line); stroke-width: 2; fill: none; }
      .link { stroke: var(--line); stroke-width: 2; stroke-dasharray: 5 5; fill: none; }
      .guide { stroke: var(--text-muted); stroke-width: 1; stroke-dasharray: 3 4; fill: none; }
      .arrow-head { fill: var(--line); }
    </style>

    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" class="arrow-head" />
    </marker>
    <pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="8" class="hatch-line" />
    </pattern>
  </defs>"""

PAD = 10


def _fmt(value):
    return f"{value:.1f}".rstrip("0").rstrip(".")


class Diagram:
    def __init__(self):
        self.parts = []
        self.back = []
        self.box = [float("inf"), float("inf"), float("-inf"), float("-inf")]

    def _grow(self, x1, y1, x2, y2):
        self.box = [
            min(self.box[0], x1),
            min(self.box[1], y1),
            max(self.box[2], x2),
            max(self.box[3], y2),
        ]

    def _text_extent(self, x, y, text, size, anchor):
        width = len(text) * size * 0.56
        left = {"start": x, "middle": x - width / 2, "end": x - width}[anchor]
        self._grow(left, y - size, left + width, y + size * 0.3)

    def text(self, x, y, text, cls="text-label", anchor="middle", mono=False):
        size = 18 if "title" in cls else 15 if ("item" in cls or "bullet" in cls or "zone" in cls) else 14 if "subtitle" in cls else 13
        self._text_extent(x, y, text, size, anchor)
        classes = f"{cls} mono" if mono else cls
        self.parts.append(
            f'<text x="{_fmt(x)}" y="{_fmt(y)}" class="{classes}" text-anchor="{anchor}">{html.escape(text)}</text>'
        )

    def rect(self, x, y, w, h, cls="card-plain", rx=12, back=False):
        self._grow(x, y, x + w, y + h)
        (self.back if back else self.parts).append(
            f'<rect x="{_fmt(x)}" y="{_fmt(y)}" width="{_fmt(w)}" height="{_fmt(h)}" rx="{rx}" class="{cls}" />'
        )

    def card(self, x, y, w, h, title, sub=None, brand=False, accent=False, bullets=(), mono_sub=True):
        """A titled box standing on its own. Brand cards are ReductStore;
        accent cards are its storage backend or ReductBridge."""
        kind = "brand" if brand else "accent" if accent else "standard"
        inv = "-inverse" if brand or accent else ""
        self.rect(x, y, w, h, f"card-{kind}", 16)
        cx = x + w / 2
        if bullets:
            self.text(cx, y + 30, title, f"text-title{inv}")
            for i, bullet in enumerate(bullets):
                self.text(x + 22, y + 58 + i * 22, f"• {bullet}", f"text-bullet{inv}", "start")
        elif sub:
            self.text(cx, y + h / 2 - 6, title, f"text-title{inv}")
            self.text(cx, y + h / 2 + 18, sub, f"text-subtitle{inv}", mono=mono_sub)
        else:
            self.text(cx, y + h / 2 + 6, title, f"text-title{inv}")

    def panel(self, x, y, w, h, title, sub=None, brand=False, anchor="middle"):
        """A titled container for parts. A ReductStore panel is a white box
        with a purple outline and title, so what is inside stays readable;
        any other panel is a dashed zone, like the place something runs."""
        tx = {"start": x + 20, "middle": x + w / 2, "end": x + w - 20}[anchor]
        if brand:
            self.rect(x, y, w, h, "card-brand-frame", 18)
            self.text(tx, y + 32, title, "text-title-brand", anchor)
            if sub:
                self.text(tx, y + 54, sub, "text-subtitle", anchor, mono=True)
            return
        self.rect(x, y, w, h, "zone", 18, back=True)
        self.text(tx, y + 26, title, "text-zone", anchor)
        if sub:
            self.text(tx, y + 46, sub, "text-label", anchor, mono=True)

    def records(self, x, y, w, h, count=None, gap=5, width=9, labels=None):
        """A row of stored records, drawn as thin cells.

        labels colors the cells by label, repeating a pattern such as "abac":
        "a", "b" and "c" are three label values, so a filter that keeps only
        some of them is visible from one tier to the next."""
        count = count or int((w + gap) // (width + gap))
        span = count * width + (count - 1) * gap
        left = x + (w - span) / 2
        for i in range(count):
            cls = f"record label-{labels[i % len(labels)]}" if labels else "record"
            self.rect(left + i * (width + gap), y, width, h, cls, 2)

    def ellipsis(self, cx, cy):
        for dx in (-14, 0, 14):
            self._grow(cx + dx - 3, cy - 3, cx + dx + 3, cy + 3)
            self.parts.append(f'<circle cx="{_fmt(cx + dx)}" cy="{_fmt(cy)}" r="3" class="dot" />')

    def item(self, x, y, w, h, title, sub=None, brand=False, accent=False, mono_sub=True):
        """A smaller box inside a zone or a card, with a 15px label."""
        inv = "-inverse" if brand or accent else ""
        kind = "card-brand" if brand else "card-accent" if accent else "card-plain"
        self.rect(x, y, w, h, kind, 10)
        cx = x + w / 2
        if sub:
            self.text(cx, y + h / 2 - 3, title, f"text-item{inv}")
            self.text(cx, y + h / 2 + 16, sub, f"text-label{inv}", mono=mono_sub)
        else:
            self.text(cx, y + h / 2 + 5, title, f"text-item{inv}")

    def zone(self, x, y, w, h, label=None, rx=18):
        """A dashed boundary grouping the parts that run in one place."""
        self.rect(x, y, w, h, "zone", rx, back=True)
        if label:
            self.text(x + 18, y + 26, label, "text-zone", "start")

    def hatch(self, x, y, w, h, rx=4):
        """Opaque binary payload, as in a blob or chunk."""
        self.rect(x, y, w, h, "card-plain", rx)
        self.rect(x, y, w, h, "hatch", rx)

    def arrow(self, *points, dashed=False, both=False):
        self._path(points, "link" if dashed else "connector", end=True, start=both)

    def line(self, *points, dashed=False):
        self._path(points, "link" if dashed else "connector")

    def guide(self, *points):
        self._path(points, "guide")

    def _path(self, points, cls, end=False, start=False):
        for px, py in points:
            self._grow(px, py, px, py)
        d = "M" + " L".join(f"{_fmt(px)},{_fmt(py)}" for px, py in points)
        markers = (' marker-end="url(#arrow)"' if end else "") + (' marker-start="url(#arrow)"' if start else "")
        self.parts.append(f'<path d="{d}" class="{cls}"{markers} />')

    def svg(self):
        x1, y1, x2, y2 = self.box
        view = f"{_fmt(x1 - PAD)} {_fmt(y1 - PAD)} {_fmt(x2 - x1 + 2 * PAD)} {_fmt(y2 - y1 + 2 * PAD)}"
        body = "\n  ".join(self.back + self.parts)
        return (
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{view}" width="100%" height="100%">\n'
            f"  {STYLE}\n  {body}\n</svg>\n"
        )

    def size(self):
        x1, y1, x2, y2 = self.box
        return x2 - x1 + 2 * PAD, y2 - y1 + 2 * PAD

    def save(self, path):
        Path(path).write_text(self.svg())
        return Path(path)


def _chromium():
    for name in (os.environ.get("CHROMIUM"), "chromium", "chromium-browser", "google-chrome", "/snap/bin/chromium"):
        if name and shutil.which(name):
            return shutil.which(name)
    raise RuntimeError("Set CHROMIUM to a Chromium binary to render PNGs")


def _screenshot(page_html, out, width, height, scheme):
    # Snap Chromium can only read and write files under the home directory.
    with tempfile.TemporaryDirectory(dir=Path.home()) as tmp:
        page = Path(tmp) / "page.html"
        page.write_text(page_html)
        shot = Path(tmp) / "shot.png"
        subprocess.run(
            [_chromium(), "--headless", "--no-sandbox", "--hide-scrollbars",
             *(["--force-dark-mode"] if scheme == "dark" else []), f"--window-size={width},{height}",
             "--default-background-color=00000000", f"--screenshot={shot}", page.as_uri()],
            check=True, capture_output=True,
        )
        if not shot.exists():
            raise RuntimeError(f"Chromium did not write {out}")
        shutil.move(shot, out)


def render_png(diagram, out, scale=2, scheme="light"):
    """Transparent PNG of the diagram, for checking a render or as a fallback."""
    w, h = diagram.size()
    width, height = round(w * scale), round(h * scale)
    _screenshot(
        "<!doctype html><meta charset='utf-8'><style>html,body{margin:0;background:transparent}"
        f"svg{{display:block;width:{width}px;height:{height}px}}</style>" + diagram.svg(),
        out, width, height, scheme,
    )


def render_social(diagram, out):
    """Opaque 1200 x 630 og:image with the diagram centred on white."""
    w, h = diagram.size()
    scale = min(1110 / w, 560 / h)
    _screenshot(
        "<!doctype html><meta charset='utf-8'><style>html,body{margin:0;background:#fff}"
        "body{width:1200px;height:630px;display:flex;align-items:center;justify-content:center}"
        f"svg{{display:block;width:{w * scale:.0f}px;height:{h * scale:.0f}px}}</style>" + diagram.svg(),
        out, 1200, 630, "light",
    )


def preview(svg_path, out_dir, scale=1.5):
    """Light and dark PNGs of a saved SVG, to read back before shipping it."""
    svg = Path(svg_path).read_text()
    _, _, w, h = (float(v) for v in svg.split('viewBox="', 1)[1].split('"', 1)[0].split())
    width, height = round(w * scale), round(h * scale)
    outs = []
    for scheme, bg in (("light", "#ffffff"), ("dark", "#1b1b1d")):
        out = Path(out_dir) / f"{Path(svg_path).stem}.{scheme}.png"
        _screenshot(
            f"<!doctype html><meta charset='utf-8'><style>html,body{{margin:0;background:{bg}}}"
            f"svg{{display:block;width:{width}px;height:{height}px}}</style>" + svg,
            out, width, height, scheme,
        )
        outs.append(out)
    return outs


if __name__ == "__main__":
    import sys

    if len(sys.argv) < 3 or sys.argv[1] != "preview":
        sys.exit("usage: python3 blogkit.py preview OUT_DIR FILE.svg...")
    for path in sys.argv[3:]:
        for out in preview(path, sys.argv[2]):
            print(out)
