#!/bin/bash
set -e -x

API_PATH="http://127.0.0.1:8383/api/v1"
AUTH_HEADER="Authorization: Bearer my-token"

# Create a token with read/write access, a 1 hour inactivity TTL,
# and an IP allowlist for local access.
curl -X POST -H "$AUTH_HEADER"  -d '{
  "permissions": {
    "full_access": false,
    "read": ["example-bucket"],
    "write": ["example-bucket"]
  },
  "ttl": 3600,
  "ip_allowlist": ["127.0.0.1", "::1"]
}' "$API_PATH/tokens/new-token"
