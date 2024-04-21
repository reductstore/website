export API_PATH="http://127.0.0.1:8383/api/v1"
# Write a record to bucket "example-bucket" and entry "entry_1"
export TIME=`date +%s000000`
curl -d "Some binary data"   -X POST -a ${API_PATH}/b/example-bucket/entry_1?ts=${TIME}