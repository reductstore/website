#!/bin/bash
set -e -x

API_PATH="http://127.0.0.1:8383/api/v1"
AUTH_HEADER="Authorization: Bearer my-token"

curl -X PATCH \
  -H "${AUTH_HEADER}" \
  -d '{"mode":"dry_run"}' \
  "${API_PATH}"/lifecycles/my-lifecycle/mode

curl -X PATCH \
  -H "${AUTH_HEADER}" \
  -d '{"mode":"disabled"}' \
  "${API_PATH}"/lifecycles/my-lifecycle/mode

curl -X PATCH \
  -H "${AUTH_HEADER}" \
  -d '{"mode":"enabled"}' \
  "${API_PATH}"/lifecycles/my-lifecycle/mode
