reduct-cli alias add local -L http://localhost:8383 -t "my-token"
# Delete only entry with name "example-entry"
reduct-cli bucket rm local/bucket-to-remove --only-entries example-entry
# Wait for the storage to finish removing blocks
sleep 1
# Delete entire bucket without confirmation
reduct-cli bucket rm local/bucket-to-remove -y
