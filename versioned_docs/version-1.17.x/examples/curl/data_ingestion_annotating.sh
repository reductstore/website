#!/bin/bash
set -e -x

API_PATH="http://127.0.0.1:8383/api/v1"
AUTH_HEADER="Authorization: Bearer my-token"

# Send a record  with labels and content type
TIME=`date +%s000000`
curl -d "Some binary data" \
  -H "${AUTH_HEADER}" \
  -H "x-reduct-label-name: example" \
  -H "x-reduct-label-score: 0.9" \
  -H "Content-Type: plain/text" \
  -X POST ${API_PATH}/b/example-bucket/entry_1?ts=${TIME}
