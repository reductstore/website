reduct-cli alias add local -L http://localhost:8383 -t "my-token"
# Change the quota size of the bucket
reduct-cli bucket update local/example-bucket --quota-size 10GB
