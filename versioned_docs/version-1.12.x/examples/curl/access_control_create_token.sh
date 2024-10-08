#!/bin/bash
set -e -x

API_PATH="http://127.0.0.1:8383/api/v1"
AUTH_HEADER="Authorization: Bearer my-token"

# Create a token with read and write access to the example-bucket
curl -X POST -H "$AUTH_HEADER"  -d '{
  "full_access": false,
  "read": ["example-bucket"],
  "write": ["example-bucket"]
  }' "$API_PATH/tokens/my-token"