package main

import (
	"context"
	reduct "github.com/reductstore/reduct-go"
	"time"
)

func toTimestamp(t string) int64 {
	timestamp, err := time.Parse(time.RFC3339, t)
	if err != nil {
		panic(err)
	}
	return timestamp.UnixMicro()
}

func main() {
	// Create a client and use the base URL and API token
	client := reduct.NewClient("http://localhost:8383", reduct.ClientOptions{
		APIToken: "my-token",
	})

	// Get or create a bucket with the name "my-bucket"
	bucket, err := client.CreateOrGetBucket(context.Background(), "my-bucket", nil)
	if err != nil {
		panic(err)
	}

	// Send a record to the "py-example" entry with the current timestamp
	batch := bucket.BeginWriteBatch(context.Background(), "py-example")

	batch.Add(toTimestamp("2024-02-02T10:00:00Z"), []byte("Records #1"), "application/octet-stream", nil)
	batch.Add(toTimestamp("2024-02-02T10:00:01Z"), []byte("Records #2"), "application/octet-stream", nil)
	batch.Add(toTimestamp("2024-02-02T10:00:02Z"), []byte("Records #3"), "application/octet-stream", nil)

	errMap, err := batch.Write(context.Background())
	if err != nil {
		panic(err)
	}

	// Check statuses and raise first error
	if len(errMap) > 0 {
		for timestamp, err := range errMap {
			panic("Error writing record at timestamp " + time.UnixMicro(timestamp).Format(time.RFC3339) + ": " + err.Error())
		}
	}

}
