import json
import zenoh

KEY = "factory/line1/when-query"
CONSOLIDATION = zenoh.ConsolidationMode.NONE
attachment = json.dumps({"when": {"&status": {"$eq": "ok"}}}).encode()

with zenoh.open(zenoh.Config()) as session:
    replies = [
        reply
        for reply in session.get(
            KEY,
            timeout=5.0,
            attachment=attachment,
            consolidation=CONSOLIDATION,
        )
        if reply.ok
    ]

    for reply in replies:
        print(reply.ok.payload.to_bytes())
