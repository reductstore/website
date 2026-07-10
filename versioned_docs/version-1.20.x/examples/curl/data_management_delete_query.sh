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


# Delete all records from TIME
curl -H "${AUTH_HEADER}" \
  -d '{"query_type": "DELETE", "start": "'${TIME}'"}' \
  -X POST -a ${API_PATH}/b/example-bucket/entry_1/q

# You can also delete all records with a specific label
curl -H "${AUTH_HEADER}" \
  -d '{"query_type": "DELETE", "when": {"&key1": {"$eq": "value1"}}' \
  -X POST -a ${API_PATH}/b/example-bucket/entry_1/q

# Or each second record
curl -H "${AUTH_HEADER}" \
  -d '{"query_type": "DELETE", "when": {"$each_n: 2"}}' \
  -X POST -a ${API_PATH}/b/example-bucket/entry_1/q
