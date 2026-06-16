package main

import (
	"context"

	reduct "github.com/reductstore/reduct-go"
)

func main() {
	client := reduct.NewClient("http://localhost:8383", reduct.ClientOptions{APIToken: "my-token"})

	if err := client.RemoveLifecycle(context.Background(), "lifecycle-to-remove"); err != nil {
		panic(err)
	}
}
