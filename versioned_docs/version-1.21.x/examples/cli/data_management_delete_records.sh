reduct-cli alias add local -L http://localhost:8383 -t "my-token"
# Delete records with the specified timestamps
reduct-cli rm local/example-bucket --entries cats --time 10 20
