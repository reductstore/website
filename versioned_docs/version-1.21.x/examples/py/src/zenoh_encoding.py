import zenoh

KEY = "factory/line1/status"
CONSOLIDATION = zenoh.ConsolidationMode.NONE

with zenoh.open(zenoh.Config()) as session:
    session.put(
        KEY,
        b'{"state": "running", "speed": 120}',
        encoding=zenoh.Encoding.APPLICATION_JSON,
    )

    for reply in session.get(
        f"{KEY}?last=true",
        timeout=5.0,
        consolidation=CONSOLIDATION,
    ):
        if reply.ok:
            print(reply.ok.payload.to_bytes())
            break
