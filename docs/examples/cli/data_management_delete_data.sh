reduct-cli alias add local -L http://localhost:8383 -t "my-token"
# Delete only entry with name "example-entry"
reduct-cli bucket rm local/example-bucket --only-entries example-entry
# Delete entire bucket without confirmation
reduct-cli bucket rm local/example-bucket -y