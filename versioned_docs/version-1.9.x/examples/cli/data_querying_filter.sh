reduct-cli alias add local -L http://localhost:8383 -t "my-token"

# Query 10 photos from "imdb" entry which taken in 2006 but don't contain "Rowan Atkinson"
reduct-cli cp local/example-bucket ./export --include "photo_taken=2011" --exclude "name=b'Rowan Atkinson'" --limit 100 --with-meta

