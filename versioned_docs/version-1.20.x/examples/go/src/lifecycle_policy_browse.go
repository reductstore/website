package main

import (
	"context"

	reduct "github.com/reductstore/reduct-go"
)

func main() {
	client := reduct.NewClient("http://localhost:8383", reduct.ClientOptions{APIToken: "my-token"})

	lifecycles, err := client.GetLifecycles(context.Background())
	if err != nil {
		panic(err)
	}

	for _, lifecycle := range lifecycles {
		println("Lifecycle:", lifecycle.Name)
		println("Mode:", string(lifecycle.Mode))
		println("Running:", lifecycle.IsRunning)
		println("Provisioned:", lifecycle.IsProvisioned)
	}

	detail, err := client.GetLifecycle(context.Background(), "my-lifecycle")
	if err != nil {
		panic(err)
	}
	println("Lifecycle:", detail.Info.Name)
	println("Bucket:", detail.Settings.Bucket)
}
