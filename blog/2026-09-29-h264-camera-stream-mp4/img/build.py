# Regenerate with: python3 build.py
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[3] / "scripts/diagrams"))
from blogkit import Diagram, render_social  # noqa: E402

HERE = Path(__file__).parent


def gop(d, x, y, w, h, label=None):
    """One record: a keyframe interval, keyframe first."""
    d.rect(x, y, w, h, "card-plain", 6)
    d.rect(x, y, 7, h, "card-brand", 3)
    if label:
        d.text(x + w / 2 + 3, y + h / 2 + 5, label, "text-label", mono=True)


def flow():
    d = Diagram()
    d.zone(0, 0, 200, 214, "Camera")
    for i in range(3):
        gop(d, 20 + i * 58, 50, 48, 70)
    d.text(20, 150, "video/h264", "text-label-strong", "start", mono=True)
    d.text(20, 174, "Annex B, one keyframe", "text-label", "start")
    d.text(20, 192, "interval each", "text-label", "start")

    d.panel(244, 0, 300, 214, "ReductStore", brand=True, anchor="start")
    for i in range(5):
        gop(d, 264 + i * 54, 50, 44, 70)
    d.arrow((264, 138), (512, 138))
    d.text(520, 142, "t", "text-label", "start", mono=True)
    d.text(264, 174, "time-indexed records,", "text-label", "start")
    d.text(264, 192, "capture time on each", "text-label", "start")

    d.zone(588, 0, 180, 214, "One query")
    d.item(606, 50, 144, 70, "MP4", "video/mp4")
    d.text(606, 174, "or one episode per", "text-label", "start")
    d.text(606, 192, "limit or gap", "text-label", "start")

    d.arrow((200, 85), (240, 85))
    d.arrow((544, 85), (584, 85))
    return d


S = 100
X0 = 10


def x(t):
    return X0 + t * S


def episodes():
    d = Diagram()
    d.text(x(0), 20, "Records", "text-zone", "start")
    d.text(x(7) - 12, 20, "video/h264", "text-label-strong", "end", mono=True)
    for t in (0, 1, 2, 5, 6):
        gop(d, x(t) + 3, 36, S - 6, 56, "1s")
    d.rect(x(3) + 3, 36, 2 * S - 6, 56, "zone", 6)
    d.text(x(4), 69, "no records", "text-note")

    d.arrow((x(0), 122), (x(7) + 30, 122))
    for t in range(8):
        d.line((x(t), 116), (x(t), 128))
        d.text(x(t), 148, f"{t}s", "text-label", mono=True)
    for t in (2, 3, 5, 7):
        d.guide((x(t), 96), (x(t), 112))
        d.guide((x(t), 156), (x(t), 238))

    d.rect(x(0), 172, 7, 16, "card-brand", 2)
    d.text(x(0) + 16, 185, "keyframe", "text-label", "start")

    d.text(x(0), 222, "Episodes", "text-zone", "start")
    d.text(x(7) - 12, 222, "video/mp4", "text-label-strong", "end", mono=True)
    for start, end, name, reason in (
        (0, 2, "episode 1", "closed by duration"),
        (2, 3, "episode 2", "closed by gap"),
        (5, 7, "episode 3", "closed by duration"),
    ):
        d.item(x(start) + 3, 242, (end - start) * S - 6, 60, name, f"{end - start}s", brand=True)
        cls = "text-label-strong" if "gap" in reason else "text-label"
        d.text((x(start) + x(end)) / 2, 326, reason, cls)

    d.text(x(0), 370, 'when={"#ext": {"video": {"export": {"duration": "2s"}}}}', "text-label", "start", mono=True)
    return d


if __name__ == "__main__":
    cover = flow()
    cover.save(HERE / "h264-mp4-flow.svg")
    render_social(cover, HERE / "h264-mp4-social.png")
    episodes().save(HERE / "episode-splitting.svg")
