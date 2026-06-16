package main

import (
	"bytes"
	"context"
	reduct "github.com/reductstore/reduct-go"
	"io"
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

	// Create a data reader
	data := []byte("This is some example data that will be streamed in chunks.")
	size := len(data)
	var reader io.Reader = bytes.NewReader(data)

	// Stream the buffer to the "go-example" entry with the current timestamp
	err = bucket.BeginWrite(context.Background(), "go-example", &reduct.WriteOptions{
		Timestamp:   time.Now().UnixMicro(),
		ContentType: "application/octet-stream",
		Size:        int64(size),
	}).Write(reader)

	if err != nil {
		panic(err)
	}
}
