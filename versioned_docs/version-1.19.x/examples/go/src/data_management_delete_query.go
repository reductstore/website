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

	// Delete all records within a time range
	queryRequest := &reduct.QueryOptions{
		Start: ts,
		Stop:  ts + 2,
	}
	removedRecords, err := bucket.RemoveQuery(context.Background(), "go-example", queryRequest)
	if err != nil {
		panic(err)
	}
	if removedRecords != 2 {
		panic("Expected to remove 2 records, but got " + string(removedRecords))
	}

	// You can also delete all records with a specific label
	_, err = bucket.RemoveQuery(context.Background(), "go-example", &reduct.QueryOptions{
		Start: ts,
		Stop:  ts + 2,
		When:  map[string]any{"&key1": map[string]any{"$eq": "value1"}},
	})

	if err != nil {
		panic(err)
	}

	// Or each second record in a time range
	_, err = bucket.RemoveQuery(context.Background(), "go-example", &reduct.QueryOptions{
		Start: ts,
		Stop:  ts + 2,
		When:  map[string]any{"$each_n": 2},
	})

	if err != nil {
		panic(err)
	}
}
