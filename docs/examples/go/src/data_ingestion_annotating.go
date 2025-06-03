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

	// Send a record with labels and content type
	err = bucket.BeginWrite(context.Background(), "py-example", &reduct.WriteOptions{
		Timestamp:   time.Now().UnixMicro(),
		Labels:      map[string]any{"name": "example", "score": 0.9},
		ContentType: "text/plain",
	}).Write([]byte("Some binary data"))

	if err != nil {
		panic(err)
	}
}
