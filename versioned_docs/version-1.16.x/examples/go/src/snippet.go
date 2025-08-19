package main

import (
	"context"
	reduct "github.com/reductstore/reduct-go"
	"time"
)

func main() {
	ctx := context.Background()
	// 1. Create a ReductStore client
	client := reduct.NewClient("http://localhost:8383", reduct.ClientOptions{
		APIToken: "my-token",
	})
	bucket, err := client.CreateOrGetBucket(ctx, "my-bucket", nil)
	if err != nil {
		panic(err)
	}

	timestamp := time.Now().UnixMicro()
	writer := bucket.BeginWrite(ctx, "entry-1",
		&reduct.WriteOptions{Timestamp: timestamp})
	err = writer.Write("Hello, World!")
	if err != nil {
		panic(err)
	}

	record, err := bucket.BeginRead(ctx, "entry-1", &timestamp)
	if err != nil {
		panic(err)

	}

	println(record.ReadAsString())
}
