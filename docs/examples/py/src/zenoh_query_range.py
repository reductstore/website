import urllib.request
import zenoh

STORAGE_URL = "http://127.0.0.1:8383"
API_TOKEN = "my-token"
BUCKET = "zenoh"
KEY = "factory/line1/range-query"
START = 1700000000000000
STOP = START + 10

for i in range(3):
    ts = START + i
    payload = f"range-{i}".encode()
    url = f"{STORAGE_URL}/api/v1/b/{BUCKET}/{KEY}?ts={ts}"
    req = urllib.request.Request(url, data=payload, method="POST")
    req.add_header("Authorization", f"Bearer {API_TOKEN}")
    with urllib.request.urlopen(req) as resp:
        assert resp.status == 200

with zenoh.open(zenoh.Config()) as session:
    replies = [
        reply
        for reply in session.get(
            f"{KEY}?start={START}&stop={STOP}&limit=2",
            timeout=5.0,
        )
        if reply.ok
    ]
    assert len(replies) == 2

print("Zenoh range query example passed")
