export API_PATH="http://127.0.0.1:8383/api/v1"
export AUTH_HEADER="Authorization: Bearer my-token"

# Write a record to bucket "example-bucket" and entry "entry_1"
export TIME=`date +%s000000`
curl -d "Some binary data" \
  -H "${AUTH_HEADER}" \
  -X POST -a ${API_PATH}/b/example-bucket/entry_1?ts=${TIME}

# Query data for a specific time range
export STOP_TIME=`date +%s000000`
curl -H "${AUTH_HEADER}" -X GET -a "${API_PATH}/b/example-bucket/entry_1/q?start=${TIME}&stop=${STOP_TIME}" | jq -r ".id"
ID=$(!!)
# Fetch the data (without batching)
curl -H "${AUTH_HEADER}" -X GET -a "${API_PATH}/b/example-bucket/entry_1?id=${ID}"
curl -H "${AUTH_HEADER}" -X GET -a "${API_PATH}/b/example-bucket/entry_1?id=${ID}"
