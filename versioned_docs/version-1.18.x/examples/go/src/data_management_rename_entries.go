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

	// Get or create a bucket with the name "my-bucket"
	bucket, err := client.CreateOrGetBucket(context.Background(), "example-bucket", nil)
	if err != nil {
		panic(err)
	}

	// Rename the entry "entry_1" to "entry_2"
	err = bucket.RenameEntry(context.Background(), "entry_1", "entry_2")
	if err != nil {
		panic(err)
	}

	// Check that the entry was renamed
	entries, err := bucket.GetEntries(context.Background())
	if err != nil {
		panic(err)
	}
	entryNames := make([]string, len(entries))
	for i, entry := range entries {
		entryNames[i] = entry.Name
	}
}
