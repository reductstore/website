package main

import (
	"context"

	reduct "github.com/reductstore/reduct-go"
	model "github.com/reductstore/reduct-go/model"
)

func main() {
	client := reduct.NewClient("http://localhost:8383", reduct.ClientOptions{APIToken: "my-token"})
	_, err := client.CreateOrGetBucket(context.Background(), "my-bucket", nil)
	if err != nil {
		panic(err)
	}

	settings := model.LifecycleSettings{
		LifecycleType: model.LifecycleTypeDelete,
		Bucket:        "my-bucket",
		Entries:       []string{"go-example"},
		OlderThan:     "30d",
		Interval:      "1h",
		When: map[string]any{
			"&anomaly": map[string]any{"$eq": 1},
		},
	}

	err = client.CreateLifecycle(context.Background(), "my-lifecycle", settings)
	if err != nil {
		panic(err)
	}
}
