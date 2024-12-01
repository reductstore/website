#!/bin/bash
set -e -x

API_PATH="http://127.0.0.1:8383/api/v1"
AUTH_HEADER="Authorization: Bearer my-token"

# Query 10 photos from "imdb" entry which taken after 2006 but don't contain "Rowan Atkinson"
ID=`curl -H "${AUTH_HEADER}" \
  -d '{
  "query_type": "QUERY",
  "limit": 10,
  "where": {
      "&photo_taken": {"$gt": 2006},
      "&name": {"$ne": "b%39Rowan Atkinsonb%39"},
}' -X POST -a "${API_PATH}/b/example-bucket/imdb/q" | jq -r ".id"`

# Fetch the data (without batching) until the end
curl -H "${AUTH_HEADER}" -X GET -a "${API_PATH}/b/example-bucket/imdb?q=${ID}" --output ./phot_1.jpeg
curl -H "${AUTH_HEADER}" -X GET -a "${API_PATH}/b/example-bucket/imdb?q=${ID}" --output ./phot_2.jpeg
