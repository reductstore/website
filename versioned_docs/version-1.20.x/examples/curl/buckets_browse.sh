#!/bin/bash
set -e -x

API_PATH="http://127.0.0.1:8383/api/v1"
AUTH_HEADER="Authorization: Bearer my-token"

printf "Browse all buckets:\n"
curl -X GET \
  -H "${AUTH_HEADER}" \
  -a "${API_PATH}"/list

printf "\nBrowse a specific bucket:\n"
curl -X GET \
  -H "${AUTH_HEADER}" \
  -a "${API_PATH}"/b/my-bucket