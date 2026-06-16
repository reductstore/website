package main

import (
	"context"

	reduct "github.com/reductstore/reduct-go"
	model "github.com/reductstore/reduct-go/model"
)

func main() {
	client := reduct.NewClient("http://localhost:8383", reduct.ClientOptions{APIToken: "my-token"})

	if err := client.SetLifecycleMode(context.Background(), "my-lifecycle", model.LifecycleModeDryRun); err != nil {
		panic(err)
	}
	if err := client.SetLifecycleMode(context.Background(), "my-lifecycle", model.LifecycleModeDisabled); err != nil {
		panic(err)
	}
	if err := client.SetLifecycleMode(context.Background(), "my-lifecycle", model.LifecycleModeEnabled); err != nil {
		panic(err)
	}
}
