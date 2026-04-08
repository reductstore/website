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

	// Remove the replication with the name "repl-to-remove"
	err := client.RemoveReplicationTask(context.Background(), "repl-to-remove")
	if err != nil {
		panic(err)
	}
}
