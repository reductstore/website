import zenoh

KEY = "factory/line1/range-query"
START = 1700000000000000
STOP = START + 10

with zenoh.open(zenoh.Config()) as session:
    replies = list(
        session.get(
            f"{KEY}?start={START}&stop={STOP}&limit=2",
            timeout=5.0,
        )
    )
    for reply in replies:
        if reply.ok:
            print(reply.ok.payload.to_bytes())
