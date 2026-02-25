import zenoh

KEY = "factory/line1/point-query"
TS = 1700000000000000

with zenoh.open(zenoh.Config()) as session:
    replies = list(session.get(f"{KEY}?ts={TS}", timeout=5.0))
    for reply in replies:
        if reply.ok:
            print(reply.ok.payload.to_bytes())
