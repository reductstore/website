import json
import time
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

    time.sleep(0.2)

    replies = [reply for reply in session.get(f"{KEY}?limit=1", timeout=5.0) if reply.ok]
    assert replies, "No reply received from Zenoh query"

    sample = replies[0].ok
    got_labels = {}
    if sample.attachment is not None:
        got_labels = json.loads(sample.attachment.to_bytes())

    assert sample.payload.to_bytes() == PAYLOAD
    assert got_labels.get("robot") == "alpha"
    assert got_labels.get("status") == "ok"

print("Zenoh labels example passed")
