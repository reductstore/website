export API_PATH="http://127.0.0.1:8383/api/v1"
export AUTH_HEADER="Authorization: Bearer my-api-token"

curl -X DELETE \
  -H "${AUTH_HEADER}" \
  -a "${API_PATH}"/b/bucket-to-remove
