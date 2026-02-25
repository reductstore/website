import urllib.request
import zenoh

STORAGE_URL = "http://127.0.0.1:8383"
API_TOKEN = "my-token"
BUCKET = "zenoh"
KEY = "factory/line1/point-query"
TS = 1700000000000000
PAYLOAD = b"point-in-time payload"

url = f"{STORAGE_URL}/api/v1/b/{BUCKET}/{KEY}?ts={TS}"
req = urllib.request.Request(url, data=PAYLOAD, method="POST")
req.add_header("Authorization", f"Bearer {API_TOKEN}")
with urllib.request.urlopen(req) as resp:
    assert resp.status == 200

with zenoh.open(zenoh.Config()) as session:
    replies = [reply for reply in session.get(f"{KEY}?ts={TS}", timeout=5.0) if reply.ok]
    assert replies, "No reply received from Zenoh query"
    assert replies[0].ok.payload.to_bytes() == PAYLOAD

print("Zenoh point-in-time query example passed")
