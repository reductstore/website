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
	// Create a bucket as source bucket
	_, err := client.CreateOrGetBucket(context.Background(), "my-bucket", nil)
	if err != nil {
		panic(err)
	}

	// Set up a replication to a destination bucket for records
	// from the "go-example" entry and with labels "anomaly=1"
	replicationSettings := model.ReplicationSettings{
		SrcBucket: "my-bucket",
		DstBucket: "demo",
		DstHost:   "https://play.reduct.store",
		DstToken:  "reductstore",
		Entries:   []string{"go-example"},
		When: map[string]any{
			"&anomaly": map[string]any{
				"$eq": 1,
			},
		},
	}

	err = client.CreateReplicationTask(context.Background(), "my-replication", replicationSettings)
	if err != nil {
		panic(err)
	}
}
