#!/bin/bash
set -e -x

API_PATH="http://127.0.0.1:8383/api/v1"
AUTH_HEADER="Authorization: Bearer my-token"

# Write a record to bucket "example-bucket" and entry "entry_1"
TIME=`date +%s000000`
curl -d "Some binary data" \
  -H "${AUTH_HEADER}" \
  -X POST -a ${API_PATH}/b/example-bucket/entry_1?ts=${TIME}