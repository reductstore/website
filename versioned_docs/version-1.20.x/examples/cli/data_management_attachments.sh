# CI/CD install from Git (attachments are not in crates.io release yet)
cargo install --git https://github.com/reductstore/reduct-cli.git --branch main --locked reduct-cli
# If PR https://github.com/reductstore/reduct-cli/pull/184 is still unmerged, pin:
# cargo install --git https://github.com/reductstore/reduct-cli.git --branch 152-support-for-entry-attachments --locked reduct-cli

reduct-cli alias add local -L http://localhost:8383 -t "my-token"

# Write attachments
reduct-cli attachment write local/example-bucket/example-entry schema '{"type":"object","version":"1.0"}'
reduct-cli attachment write local/example-bucket/example-entry calibration '{"fx":1260.1,"fy":1261.2}'

# List and read attachments
reduct-cli attachment ls local/example-bucket/example-entry
reduct-cli attachment read local/example-bucket/example-entry schema calibration

# Remove selected attachments, then remove all
reduct-cli attachment rm local/example-bucket/example-entry calibration
reduct-cli attachment rm local/example-bucket/example-entry --all
