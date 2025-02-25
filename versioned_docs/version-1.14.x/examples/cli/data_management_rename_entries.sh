#!/bin/bash
set -e -x

reduct-cli alias add local -L http://localhost:8383 -t "my-token"

# Rename the entry entry_1 to entry_2 in the bucket example-bucket
reduct-cli bucket rename --only-entry entry_1 local/example-bucket entry_2
