#!/bin/bash
set -e -x

API_PATH="http://127.0.0.1:8383/api/v1"
AUTH_HEADER="Authorization: Bearer my-token"

# Write a record
TIME=`date +%s000000`
curl -d "Some binary data" \
  -H "${AUTH_HEADER}" \
  -H "Content-Type: plain/text" \
  -X POST -a ${API_PATH}/b/example-bucket/entry_1?ts=${TIME}


# Delete a single record
curl -H "${AUTH_HEADER}" \
  -X DELETE -a ${API_PATH}/b/example-bucket/entry_1?ts=${TIME}
