import zenoh

KEY = "factory/line1/range-query"
START = 1700000000000000
STOP = 1700000000010000
CONSOLIDATION = zenoh.ConsolidationMode.NONE

with zenoh.open(zenoh.Config()) as session:
    replies = [
        reply
        for reply in session.get(
            f"{KEY}?start={START};stop={STOP}",
            timeout=5.0,
            consolidation=CONSOLIDATION,
        )
        if reply.ok
    ]
    for reply in replies:
        print(reply.ok.payload.to_bytes())
