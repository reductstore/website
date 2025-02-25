reduct-cli alias add local -L http://localhost:8383 -t "my-token"
reduct-cli bucket create local/my-bucket --quota-type FIFO --quota-size 1GB
