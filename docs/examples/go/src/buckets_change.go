package main

import (
	"context"
	reduct "github.com/reductstore/reduct-go"
	model "github.com/reductstore/reduct-go/model"
)

func main() {
	// Create a client and use the base URL and API token
	client := reduct.NewClient("http://localhost:8383", reduct.ClientOptions{
		APIToken: "my-token",
	})

	// Get an existing bucket
	bucket, err := client.GetBucket(context.Background(), "example-bucket")
	if err != nil {
		panic(err)
	}

	// Change the quota size of the bucket to 5GB
	newSettings := model.NewBucketSettingBuilder().
		WithQuotaType(model.QuotaTypeFifo).
		WithQuotaSize(5_000_000_000).
		Build()
	err = bucket.SetSettings(context.Background(), newSettings)
	if err != nil {
		panic(err)
	}

	settings, err := bucket.GetSettings(context.Background())
	if err != nil {
		panic(err)
	}

	if settings.QuotaSize != 5_000_000_000 {
		panic("Bucket settings were not updated correctly")
	}
}
