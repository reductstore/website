#!/bin/bash
set -e -x

API_PATH="http://127.0.0.1:8383/api/v1"
AUTH_HEADER="Authorization: Bearer my-token"

# Query 10 photos from "imdb" entry which taken in 2006 but don't contain "Rowan Atkinson"
ID=`curl -H "${AUTH_HEADER}" \
  -d '{"query_type": "QUERY", "include": {"photo_taken": "2006"}, "exclude": {"name": "b%39Rowan%20Atkinson%39"}, "limit": 10}' \
  -X POST -a "${API_PATH}/b/example-bucket/imdb/q" | jq -r ".id"`

# Fetch the data (without batching) until the end
curl -H "${AUTH_HEADER}" -X GET -a "${API_PATH}/b/example-bucket/imdb?q=${ID}" --output ./phot_1.jpeg
curl -H "${AUTH_HEADER}" -X GET -a "${API_PATH}/b/example-bucket/imdb?q=${ID}" --output ./phot_2.jpeg