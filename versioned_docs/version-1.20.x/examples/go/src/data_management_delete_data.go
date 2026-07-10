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

	// Get bucket to remove
	bucket, err := client.GetBucket(context.Background(), "bucket-to-remove")
	if err != nil {
		panic(err)
	}

	// Remove only entry with name "example-entry"
	err = bucket.RemoveEntry(context.Background(), "example-entry")
	if err != nil {
		panic(err)
	}

	// Wait for the storage to finish removing blocks
	time.Sleep(1 * time.Second)

	// Remove entire bucket
	err = bucket.Remove(context.Background())
	if err != nil {
		panic(err)
	}
}
