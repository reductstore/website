import json
import zenoh

KEY = "factory/line1/camera"

with zenoh.open(zenoh.Config()) as session:
    replies = [reply for reply in session.get(f"{KEY}?limit=1", timeout=5.0) if reply.ok]
    for reply in replies:
        sample = reply.ok
        labels = {}
        if sample.attachment is not None:
            labels = json.loads(sample.attachment.to_bytes())
        print(labels)
