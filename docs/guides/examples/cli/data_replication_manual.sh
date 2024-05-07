reduct-cli alias add src-instance -L http://localhost:8383 -T my-token
reduct-cli alias add dst-instance -L https://play.reduct.store -T reductstore
reduct-cli cp src-instance/example-bucket dst-instance/demo --include "anomaly=true" --exclude "status=ok"