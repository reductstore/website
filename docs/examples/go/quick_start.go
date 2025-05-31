package main

import (
	"context"
	reduct "github.com/reductstore/reduct-go"
	model "github.com/reductstore/reduct-go/model"
	"time"
)

func main() {
	ctx := context.Background()
	// 1. Create a ReductStore client
	client := reduct.NewClient("http://localhost:8383", reduct.ClientOptions{
		APIToken: "my-token",
	})

	// 2. Get or create a bucket with 1Gb quota
	settings := model.NewBucketSettingBuilder().
		WithQuotaType(model.QuotaTypeFifo).
		WithQuotaSize(1_000_000_000).
		Build()

	bucket, err := client.CreateOrGetBucket(ctx, "my-bucket", &settings)
	if err != nil {
		panic(err)
	}

	// 3. Write some data with timestamps in the 'entry-1' entry
	ts := time.Now().UnixMicro()
	writer := bucket.BeginWrite(ctx, "entry-1", &reduct.WriteOptions{Timestamp: ts, Labels: map[string]any{"score": 10}})
	err = writer.Write("<Blob data>")
	if err != nil {
		panic(err)
	}
	writer = bucket.BeginWrite(ctx, "entry-1", &reduct.WriteOptions{Timestamp: ts + 1, Labels: map[string]any{"score": 20}})
	err = writer.Write("<Blob data 2>")
	if err != nil {
		panic(err)
	}

	// 4. Query the data by time range and condition
	queryOptions := reduct.NewQueryOptionsBuilder().
		WithStart(ts).
		WithStop(ts + 2).
		WithWhen(map[string]any{"&score": map[string]any{"$gt": 15}}).
		Build()

	records, err := bucket.Query(ctx, "entry-1", &queryOptions)
	if err != nil {
		panic(err)
	}

	for rec := range records.Records() {
		data, err := rec.Read()
		if err != nil {
			panic(err)
		}
		timestamp := rec.Time()
		labels := rec.Labels()
		println("Record at time:", timestamp)
		println("Labels:", labels)
		println("Data:", string(data))
	}
}
