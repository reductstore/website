#!/bin/bash
set -e -x

API_PATH="http://127.0.0.1:8383/api/v1"
AUTH_HEADER="Authorization: Bearer my-token"

# Send a record  with labels a
TIME=`date +%s000000`
curl -d "Some binary data" \
  -H "${AUTH_HEADER}" \
  -H "x-reduct-label-key1: value1" \
  -H "x-reduct-label-key2: value2" \
  -H "Content-Type: plain/text" \
  -X POST -a ${API_PATH}/b/example-bucket/entry_1?ts=${TIME}


# Update the "key1" label to "new_value1" and remove the "key2" label
curl -H "${AUTH_HEADER}" \
  -H "x-reduct-label-key1: new_value1" \
  -H "x-reduct-label-key2: " \
  -X PATCH -a ${API_PATH}/b/example-bucket/entry_1/labels
