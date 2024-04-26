export API_PATH="http://127.0.0.1:8383/api/v1"
export AUTH_HEADER="Authorization: Bearer my-token"

# Send a record  with labels and content type
export TIME=`date +%s000000`
curl -d "Some binary data" \
  -H "${AUTH_HEADER}" \
  -H "x-reduct-label-name: example" \
  -H "x-reduct-label-type: simple" \
  -H "Content-Type: plain/text" \
  -X POST -a ${API_PATH}/b/example-bucket/entry_1?ts=${TIME}