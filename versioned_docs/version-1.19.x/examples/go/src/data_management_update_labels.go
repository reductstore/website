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

	// Update labels of a record: remove "key2" and update "key1"
	err = bucket.Update(context.Background(), "go-example", ts, map[string]any{"key1": "new-value", "key2": ""})
	if err != nil {
		panic(err)
	}

	record, err := bucket.BeginRead(context.Background(), "go-example", &ts)
	if err != nil {
		panic(err)
	}

	if record.Labels()["key1"] != "new-value" || record.Labels()["key2"] != nil {
		panic("Labels not updated correctly")
	}

	// Update labels in a batch
	batch := bucket.BeginUpdateBatch(context.Background(), "go-example")
	batch.AddOnlyLabels(ts, map[string]any{"key1": "new-value", "key2": ""})
	batch.AddOnlyLabels(ts+1, map[string]any{"key3": "value3"})

	errors, err := batch.Write(context.Background())
	if err != nil {
		panic(err)
	}

	if len(errors) != 0 {
		panic("Expected no errors, but got " + string(len(errors)))
	}
}
