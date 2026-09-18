import json
import zenoh

KEY = "factory/line1/camera"
CONSOLIDATION = zenoh.ConsolidationMode.NONE

with zenoh.open(zenoh.Config()) as session:
    replies = [
        reply
        for reply in session.get(
            f"{KEY}?last=true",
            timeout=5.0,
            consolidation=CONSOLIDATION,
        )
        if reply.ok
    ]
    for reply in replies:
        sample = reply.ok
        labels = {}
        if sample.attachment is not None:
            labels = json.loads(sample.attachment.to_bytes())

        print(labels)
