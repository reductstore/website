#!/bin/bash
set -e -x

API_PATH="http://127.0.0.1:8383/api/v1"
AUTH_HEADER="Authorization: Bearer my-token"

curl -X POST \
  -H "${AUTH_HEADER}" \
  -d '{"bucket":"my-bucket","entries":["curl-example"],"max_age":"30d","interval":"1h","when":{"&anomaly":{"$eq":1}}}' \
  "${API_PATH}"/lifecycles/my-lifecycle
