package main

import (
	"context"

	reduct "github.com/reductstore/reduct-go"
	model "github.com/reductstore/reduct-go/model"
)

func main() {
	// Update replication mode without changing other settings
	client := reduct.NewClient("http://localhost:8383", reduct.ClientOptions{
		APIToken: "my-token",
	})

	// Pause to queue transactions without sending them
	if err := client.SetReplicationMode(context.Background(), "my_replication", model.ReplicationModePaused); err != nil {
		panic(err)
	}

	// Disable to ignore new transactions
	if err := client.SetReplicationMode(context.Background(), "my_replication", model.ReplicationModeDisabled); err != nil {
		panic(err)
	}

	// Re-enable to resume sending queued data
	if err := client.SetReplicationMode(context.Background(), "my_replication", model.ReplicationModeEnabled); err != nil {
		panic(err)
	}
}
