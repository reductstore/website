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

	// List all replications and print their information
	replications, err := client.GetReplicationTasks(context.Background())
	if err != nil {
		panic(err)
	}

	for _, replication := range replications {
		println("Replication Name:", replication.Name)
		println("Active:", replication.IsActive)
		println("Pending Records:", replication.PendingRecords)
		println("Provisioned:", replication.IsProvisioned)
	}

	// Get details of a specific replication
	replicationDetail, err := client.GetReplicationTask(context.Background(), "example-replication")
	if err != nil {
		panic(err)
	}

	println("Replication Name:", replicationDetail.Info.Name)
	println("Settings:", replicationDetail.Settings)
	println("Failed Records (Last Hour):", replicationDetail.Diagnostics.Hourly.Errored)
}
