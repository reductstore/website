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
	bucket, err := client.CreateOrGetBucket(context.Background(), "my-bucket", nil)
	if err != nil {
		panic(err)
	}

	// Write attachments for an entry
	err = bucket.WriteAttachments(context.Background(), "camera/front", map[string]any{
		"schema":      map[string]any{"type": "object", "version": "1.0"},
		"calibration": map[string]any{"fx": 1260.1, "fy": 1261.2},
	})
	if err != nil {
		panic(err)
	}

	// Read attachments
	attachments, err := bucket.ReadAttachments(context.Background(), "camera/front")
	if err != nil {
		panic(err)
	}
	schema, ok := attachments["schema"].(map[string]any)
	if !ok || schema["type"] != "object" {
		panic("schema attachment was not read correctly")
	}

	// Remove one attachment by key
	err = bucket.RemoveAttachments(context.Background(), "camera/front", []string{"calibration"})
	if err != nil {
		panic(err)
	}

	attachments, err = bucket.ReadAttachments(context.Background(), "camera/front")
	if err != nil {
		panic(err)
	}
	if _, exists := attachments["calibration"]; exists {
		panic("calibration attachment must be removed")
	}

	// Remove all attachments
	err = bucket.RemoveAttachments(context.Background(), "camera/front", nil)
	if err != nil {
		panic(err)
	}
}
