import json
import zenoh

KEY = "factory/line1/camera"
PAYLOAD = b"<binary payload>"
LABELS = {"robot": "alpha", "status": "ok"}

with zenoh.open(zenoh.Config()) as session:
    session.put(
        KEY,
        PAYLOAD,
        attachment=json.dumps(LABELS).encode(),
    )
