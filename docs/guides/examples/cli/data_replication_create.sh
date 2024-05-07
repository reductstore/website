reduct-cli alias add local -L http://localhost:8383 -t "my-token"

# Create a source bucket
reduct-cli bucket create local/src-bucket
# Create a replication between the source bucket and the demo bucket at https://play.reduct.store
reduct-cli replica create local/my-replication src-bucket https://demo@play.reduct.store/demo
