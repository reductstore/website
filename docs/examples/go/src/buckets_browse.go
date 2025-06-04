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

	// Browse all buckets and print their information
	buckets, err := client.GetBuckets(context.Background())
	if err != nil {
		panic(err)
	}

	for _, info := range buckets {
		println("Bucket:", info.Name)
		println("Size:", info.Size)
		println("Entry Count:", info.EntryCount)
		println("Oldest Record:", info.OldestRecord)
		println("Latest Record:", info.LatestRecord)
	}

	// Get information about a specific bucket
	bucket, err := client.GetBucket(context.Background(), "example-bucket")
	if err != nil {
		panic(err)
	}

	info, err := bucket.GetFullInfo(context.Background())
	if err != nil {
		panic(err)
	}

	println("Quota Type:", info.Settings.QuotaType)
	for _, entry := range info.Entries {
		println("Entry:", entry.Name)
		println("Size:", entry.Size)
		println("Oldest Record:", entry.OldestRecord)
		println("Latest Record:", entry.LatestRecord)
	}
}
