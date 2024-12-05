#!/bin/bash
set -e -x

reduct-cli alias add local -L http://localhost:8383 -t "my-token"
# Delete all records from timestamp 10 to 20
reduct-cli rm local/example-bucket --entries entry_1 --start 10 --stop 20

# You can also delete all records with a specific label
reduct-cli rm local/example-bucket --entries entry_1 --include label1=value1

# Or each N-th record
reduct-cli rm local/example-bucket --entries entry_1 --each-n 2
