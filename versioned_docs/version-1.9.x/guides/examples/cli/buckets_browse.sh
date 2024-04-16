reduct-cli alias add local -L http://localhost:8383 -t "my-token"
reduct-cli bucket ls local --full

# Output:
#| Name        | Entries | Size     | Oldest record (UTC)      | Latest record (UTC)      |
#|-------------|---------|----------|--------------------------|--------------------------|
#| example-bucket    | 3       | 30.7 GB  | 1970-01-01T00:00:00.000Z | 1970-01-01T00:00:00.060Z |


reduct-cli bucket show local/example-bucket --full

# Output:
#Name:                datasets                       Quota Type:         NONE
#Entries:             3                              Quota Size:         0 B
#Size:                30.7 GB                        Max. Block Size:    64.0 MB
#Oldest Record (UTC): 1970-01-01T00:00:00.000Z       Max. Block Records: 256
#Latest Record (UTC): 1970-01-01T00:00:00.060Z
#
#| Name           | Records | Blocks | Size    | Oldest Record (UTC)      | Latest Record (UTC)      |
#|----------------|---------|--------|---------|--------------------------|--------------------------|
#| cats           | 9993    | 40     | 2.0 GB  | 1970-01-01T00:00:00.000Z | 1970-01-01T00:00:00.016Z |
#| imdb           | 46641   | 459    | 28.7 GB | 1970-01-01T00:00:00.000Z | 1970-01-01T00:00:00.046Z |
#| mnist_training | 60000   | 236    | 17.5 MB | 1970-01-01T00:00:00.000Z | 1970-01-01T00:00:00.060Z |
