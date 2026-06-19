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
	// Browse all tokens and print their information
	tokens, err := client.GetTokens(context.Background())
	if err != nil {
		panic(err)

	}

	for _, token := range tokens {
		println("Token:", token.Name)
		println("Created:", token.CreatedAt)
		println("Provisioned:", token.IsProvisioned)

		// Get detailed information about a specific token
		details, err := client.GetToken(context.Background(), token.Name)
		if err != nil {
			panic(err)
		}
		println("Permissions:", details.Permissions)
	}
}
