export API_PATH="http://127.0.0.1:8383/api/v1"
export AUTH_HEADER="Authorization: Bearer my-token"

curl -X POST \
  -d '{"quota_type":"FIFO", "quota_size":1000000000}' \
  -H "${AUTH_HEADER}" \
  -a "${API_PATH}"/b/my_data
