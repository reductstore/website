#!/bin/bash
set -e -x

API_PATH="http://127.0.0.1:8383/api/v1"
AUTH_HEADER="Authorization: Bearer my-token"

curl -X DELETE \
  -H "${AUTH_HEADER}" \
  -a "${API_PATH}"/b/example-bucket
