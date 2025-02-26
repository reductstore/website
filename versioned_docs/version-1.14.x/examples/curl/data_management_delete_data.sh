#!/bin/bash
set -e -x

API_PATH="http://127.0.0.1:8383/api/v1"
AUTH_HEADER="Authorization: Bearer my-token"

# Delete only entry with name "example-entry"
curl -X DELETE \
  -H "${AUTH_HEADER}" \
  -a "${API_PATH}"/b/bucket-to-remove/example-entry

# Delete entire bucket
curl -X DELETE \
  -H "${AUTH_HEADER}" \
  -a "${API_PATH}"/b/bucket-to-remove
