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

	// Create a token with read/write access, a 1 hour inactivity TTL,
	// and an IP allowlist for local access.
	permissions := model.TokenPermissions{
		FullAccess: false,
		Read:       []string{"example-bucket"},
		Write:      []string{"example-bucket"},
	}

	createResp, err := client.CreateTokenWithOptions(context.Background(), "new-token", model.TokenCreateOptions{
		Permissions: permissions,
		TTL:         3600,
		IPAllowlist: []string{"127.0.0.1", "::1"},
	})
	if err != nil {
		panic(err)
	}

	// Print the generated token
	println("generated token:", createResp.Value)
}
