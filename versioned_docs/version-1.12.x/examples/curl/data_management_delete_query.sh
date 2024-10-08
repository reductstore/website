#!/bin/bash
set -e -x

API_PATH="http://127.0.0.1:8383/api/v1"
AUTH_HEADER="Authorization: Bearer my-token"

# Send a record  with labels a
TIME=`date +%s000000`
curl -d "Some binary data" \
  -H "${AUTH_HEADER}" \
  -H "Content-Type: plain/text" \
  -X POST -a ${API_PATH}/b/example-bucket/entry_1?ts=${TIME}


# Delete all records from TIME
curl -H "${AUTH_HEADER}" \
  -X DELETE -a ${API_PATH}/b/example-bucket/entry_1/q?start=${TIME}

# You can also delete all records with a specific label
curl -H "${AUTH_HEADER}" \
  -X DELETE -a ${API_PATH}/b/example-bucket/entry_1/q?include-label1=value1

# Or each N-th record
curl -H "${AUTH_HEADER}" \
  -X DELETE -a ${API_PATH}/b/example-bucket/entry_1/q?each_n=2