package main

import (
	"context"
	reduct "github.com/reductstore/reduct-go"
	model "github.com/reductstore/reduct-go/model"
)

func main() {
	// Create a client using the server URL and API token
	client := reduct.NewClient("http://localhost:8383", reduct.ClientOptions{
		APIToken: "my-token",
	})

	// Create a bucket with the name "my-bucket" and a FIFO quota of 1GB
	settings := model.NewBucketSettingBuilder().
		WithQuotaType(model.QuotaTypeFifo).
		WithQuotaSize(1_000_000_000).
		Build()
	bucket, err := client.CreateOrGetBucket(context.Background(), "my-bucket", &settings)
	if err != nil {
		panic(err)
	}

	if bucket.Name != "my-bucket" {
		panic("Bucket was not created or retrieved correctly")
	}
}
