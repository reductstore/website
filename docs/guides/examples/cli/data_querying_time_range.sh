reduct-cli alias add local -L http://localhost:8383 -t "my-token"

# Query data for a specific time range and export it to a local directory
reduct-cli cp local/datasets ./export --start "2021-01-01T00:00:00Z" --stop "2021-01-02T00:00:00Z"
