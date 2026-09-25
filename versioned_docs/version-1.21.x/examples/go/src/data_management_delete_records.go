package main

import (
	"context"
	reduct "github.com/reductstore/reduct-go"
	"time"
)

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

	// Send some records to the "go-example"
	ts := time.Now().UnixMicro()
	err = bucket.BeginWrite(context.Background(), "go-example", &reduct.WriteOptions{
		Timestamp: ts,
	}).Write([]byte("Some binary data"))
	if err != nil {
		panic(err)
	}

	err = bucket.BeginWrite(context.Background(), "go-example", &reduct.WriteOptions{
		Timestamp: ts + 1,
	}).Write([]byte("Some binary data"))
	if err != nil {
		panic(err)
	}

	// Delete a single record
	err = bucket.RemoveRecord(context.Background(), "go-example", ts)
	if err != nil {
		panic(err)
	}

	// Delete a batch of records
	batch := bucket.BeginRemoveBatch(context.Background(), "go-example")
	// Add the timestamp of the already deleted record
	batch.AddOnlyTimestamp(ts) // already deleted, so this error will be in the errors map
	batch.AddOnlyTimestamp(ts + 1)

	errors, err := batch.Write(context.Background())
	if err != nil {
		panic(err)
	}

	if len(errors) != 1 {
		panic("Expected 1 error, but got " + string(len(errors)))
	}
	for ts, err := range errors {
		println("Error deleting record with timestamp", ts, ":", err.Error())
	}
}
