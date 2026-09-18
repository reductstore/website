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

	// Send a record to the "go-example" entry with the current timestamp
	ts := time.Now().UnixMicro()
	err = bucket.BeginWrite(context.Background(), "go-example", &reduct.WriteOptions{
		Timestamp:   ts,
		ContentType: "application/octet-stream",
	}).Write([]byte("Some binary data"))
	if err != nil {
		panic(err)
	}

	// Read the record in the "go-example" entry of the bucket
	record, err := bucket.BeginRead(context.Background(), "go-example", &ts)
	if err != nil {
		panic(err)
	}

	// Print meta information
	println("Timestamp:", record.Time())
	println("Content Length:", record.Size())
	println("Content Type:", record.ContentType())
	println("Labels:", record.Labels())

	// Read the record content
	content, err := record.ReadAsString()
	if err != nil {
		panic(err)
	}

	if string(content) != "Some binary data" {
		panic("Content mismatch")
	}
}
