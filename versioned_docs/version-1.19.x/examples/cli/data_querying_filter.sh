reduct-cli alias add local -L http://localhost:8383 -t "my-token"

# Query 10 photos from "imdb" entry which taken after 2006 with the face score less than 4
reduct-cli cp local/example-bucket ./export --when='{"&photo_taken": {"$gt": 2006}, "&face_score": {"$lt": 4}}' --limit 10 --with-meta
