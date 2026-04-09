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

	// Rename the bucket with the name "bucket-to-rename"
	bucket, err := client.GetBucket(context.Background(), "bucket-to-rename")
	if err != nil {
		panic(err)
	}

	err = bucket.Rename(context.Background(), "bucket-renamed")
	if err != nil {
		panic(err)
	}

	// Check that the bucket was renamed
	_, err = client.GetBucket(context.Background(), "bucket-renamed")
	if err != nil {
		panic(err)
	}
}
