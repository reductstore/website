# Small flow diagrams for the /use-cases cards, in the homepage diagram style.
# Regenerate from the repo root with: python3 scripts/diagrams/usecases.py
import os
import re

SRC = "static/img/landing/reduct-bridge.svg"
OUT = "static/img/use-cases/"

EXTRA = """<style>
[data-theme='dark'] .rs-pill~.rs-si{fill:#4A3560}
</style>"""

NW, NH, GAP = 112, 64, 22
W, H = 3 * NW + 2 * GAP, 76
Y = (H - NH) / 2

USE_CASES = {
    "industrial-edge": [("Sensors, PLC", "shop floor", "card"), ("ReductStore", "FIFO quota", "brand"), ("Cloud", "S3 backend", "coral")],
    "mobile-robots": [("Robot", "LiDAR, cameras", "card"), ("ReductStore", "edge", "brand"), ("Cloud", "fleet data", "card")],
    "ros": [("ROS 2", "topics", "card"), ("ReductBridge", "pipelines", "coral"), ("ReductStore", "MCAP export", "brand")],
    "physical-ai": [("Robot", "episodes", "card"), ("ReductStore", "labels", "brand"), ("Training", "datasets", "card")],
    "drones": [("Drone", "sensors", "card"), ("ReductStore", "air-gapped", "brand"), ("Ground", "sync later", "card")],
    "cloud": [("Edge", "ReductStore", "card"), ("ReductStore", "cloud", "brand"), ("Object store", "S3, Azure", "coral")],
    "computer-vision": [("Camera", "frames", "card"), ("Model", "detections", "card"), ("ReductStore", "labeled data", "brand")],
    "h264-video": [("Camera", "H.264 chunks", "card"), ("ReductStore", "video/h264", "brand"), ("ReductVideo", "MP4 episodes", "coral")],
    "vibration": [("Sensor", "waveforms", "card"), ("ReductStore", "FIFO buffer", "brand"), ("Analysis", "anomalies", "card")],
    "mqtt": [("MQTT broker", "topics", "card"), ("ReductBridge", "pipelines", "coral"), ("ReductStore", "labeled data", "brand")],
    "kafka": [("Kafka", "partitions", "card"), ("Data sink", "consumer", "card"), ("ReductStore", "entries", "brand")],
    "anomaly-detection": [("Camera", "images", "card"), ("Model", "anomaly score", "card"), ("ReductStore", "labels", "brand")],
    "pytorch": [("ReductStore", "time ranges", "brand"), ("Query", "by labels", "card"), ("PyTorch", "DataLoader", "card")],
}

TEXT = {
    "card": ("rs-chip", "rs-t", "rs-s rs-mono"),
    "brand": ("rs-pill", "rs-pt", "rs-si rs-mono"),
    "coral": ("rs-coral", "rs-ct", "rs-cs rs-mono"),
}


def base_style():
    svg = re.sub(r"<metadata>.*?</metadata>", "", open(SRC).read(), flags=re.S)
    return re.search(r"<style>.*?</style>", svg, re.S).group(0)


def diagram(nodes, label):
    wires, parts = [], []
    for i, (title, sub, kind) in enumerate(nodes):
        x = i * (NW + GAP)
        box, tcls, scls = TEXT[kind]
        parts.append(
            f'<g><rect x="{x}" y="{Y}" width="{NW}" height="{NH}" rx="16" class="{box}"/>'
            f'<text x="{x + NW / 2}" y="{Y + 28}" class="{tcls}" text-anchor="middle">{title}</text>'
            f'<text x="{x + NW / 2}" y="{Y + 48}" class="{scls}" text-anchor="middle">{sub}</text></g>'
        )
        if i:
            x0, x1, cy = x - GAP, x, Y + NH / 2
            wires.append(f'<path d="M{x0},{cy} L{x1},{cy}" class="rs-wire rs-flow-in"/>')
            parts.append(f'<circle cx="{x0}" cy="{cy}" r="3.5" class="rs-port"/><circle cx="{x1}" cy="{cy}" r="3.5" class="rs-port"/>')
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" class="rs-diagram" viewBox="-2 0 {W + 4} {H}" '
        f'width="100%" height="100%" role="img" aria-label="{label}"><defs>{base_style()}{EXTRA}</defs>'
        + "\n".join(wires + parts)
        + "</svg>\n"
    )


os.makedirs(OUT, exist_ok=True)
for name, nodes in USE_CASES.items():
    label = " to ".join(f"{t} ({s})" for t, s, _ in nodes)
    open(OUT + name + ".svg", "w").write(diagram(nodes, label))
print("ok")
