reduct-cli alias add local -L http://localhost:8383 -t "my-token"
reduct-cli bucket create local/my-bucket
reduct-cli lifecycle create local/my-lifecycle my-bucket --max-age 30d --interval 1h --entries cli-example --when '{"&anomaly":{"$eq":1}}'
