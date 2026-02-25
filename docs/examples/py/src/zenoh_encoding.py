import zenoh

KEY = "factory/line1/status"
PAYLOAD = b'{"state": "running", "speed": 120}'

with zenoh.open(zenoh.Config()) as session:
    session.put(
        KEY,
        PAYLOAD,
        encoding=zenoh.Encoding.APPLICATION_JSON,
    )
