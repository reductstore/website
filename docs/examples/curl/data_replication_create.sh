#!/bin/bash
set -e -x

API_PATH="http://127.0.0.1:8383/api/v1"
AUTH_HEADER="Authorization: Bearer my-token"

curl -X POST \
  -d '{"src_bucket":"example-bucket", "dst_bucket":"demo", "dst_host": "https://play.reduct.store", "dst_token": "my-token"}' \
  -H "${AUTH_HEADER}" \
  -a "${API_PATH}"/replications/my_replication
