#!/bin/bash
set -e -x

API_PATH="http://127.0.0.1:8383/api/v1"
AUTH_HEADER="Authorization: Bearer my-token"

# Change the quota size of the bucket
curl -X UPDATE \
  -d '{"quota_size":5000000000}' \
  -H "${AUTH_HEADER}" \
  -a "${API_PATH}"/b/my_data
