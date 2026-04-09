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
	err = bucket.BeginWrite(context.Background(), "go-example", &reduct.WriteOptions{
		Timestamp: time.Now().UnixMicro(),
	}).Write("Some binary data")

	if err != nil {
		panic(err)
	}
}
