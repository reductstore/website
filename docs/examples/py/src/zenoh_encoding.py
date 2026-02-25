import time
import zenoh

KEY = "factory/line1/status"
PAYLOAD = b'{"state": "running", "speed": 120}'

with zenoh.open(zenoh.Config()) as session:
    session.put(
        KEY,
        PAYLOAD,
        encoding=zenoh.Encoding.APPLICATION_JSON,
    )

    time.sleep(0.2)

    replies = [reply for reply in session.get(f"{KEY}?limit=1", timeout=5.0) if reply.ok]
    assert replies, "No reply received from Zenoh query"
    assert replies[0].ok.payload.to_bytes() == PAYLOAD

print("Zenoh encoding example passed")
