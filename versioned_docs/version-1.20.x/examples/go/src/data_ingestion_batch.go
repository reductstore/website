package main

import (
	"context"
	reduct "github.com/reductstore/reduct-go"
	"time"
)

func toTimestamp(t string) int64 {
	timestamp, err := time.Parse(time.RFC3339, t)
	if err != nil {
		panic(err)
	}
	return timestamp.UnixMicro()
}

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

	ctx := context.Background()

	// Prepare a batch of records for different entries
	batch := bucket.BeginWriteRecordBatch(ctx)

	batch.Add("sensor-1", toTimestamp("2024-02-02T10:00:00Z"), []byte("Temperature: 20.5"), "text/plain", reduct.LabelMap{"unit": "C"})
	batch.Add("sensor-1", toTimestamp("2024-02-02T10:00:01Z"), []byte("Temperature: 20.6"), "text/plain", reduct.LabelMap{"unit": "C"})
	batch.Add("camera-1", toTimestamp("2024-02-02T10:00:02Z"), []byte("Frame #1"), "text/plain", nil)

	// Write records from multiple entries in one request
	errMap, err := batch.Send(ctx)
	if err != nil {
		panic(err)
	}

	// Check statuses and raise first error
	if len(errMap) > 0 {
		for entry, entryErrors := range errMap {
			for timestamp, err := range entryErrors {
				panic("Error writing record to " + entry + " at timestamp " + time.UnixMicro(timestamp).Format(time.RFC3339) + ": " + err.Error())
			}
		}
	}

}
