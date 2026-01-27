#!/bin/bash
set -e -x

API_PATH="http://127.0.0.1:8383/api/v1"
AUTH_HEADER="Authorization: Bearer my-token"

curl -X PUT \
  -H "${AUTH_HEADER}" \
  "${API_PATH}/b/example-bucket/entry_1/rename" \
  -H "Content-Type: application/json" \
  -d '{"new_name": "entry_2"}'
