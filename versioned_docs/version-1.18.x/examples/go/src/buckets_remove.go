package main

import (
	"context"
	reduct "github.com/reductstore/reduct-go"
)

func main() {
	// Create a client and use the base URL and API token
	client := reduct.NewClient("http://localhost:8383", reduct.ClientOptions{
		APIToken: "my-token",
	})

	// Remove the bucket with the name "bucket-to-remove"
	bucket, err := client.GetBucket(context.Background(), "bucket-to-remove")
	if err != nil {
		panic(err)
	}

	err = bucket.Remove(context.Background())
	if err != nil {
		panic(err)
	}

	// Check that the bucket no longer exists or is in the process of being removed
	_, err = client.GetBucket(context.Background(), "bucket-to-remove")
	if err == nil {
		panic("Bucket should not exist anymore")
	}

}
