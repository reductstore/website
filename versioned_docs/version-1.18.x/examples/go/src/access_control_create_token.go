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

	// Create a token with read/write access to the bucket "example-bucket"
	permissions := model.TokenPermissions{
		FullAccess: false,
		Read:       []string{"example-bucket"},
		Write:      []string{"example-bucket"},
	}

	token, err := client.CreateToken(context.Background(), "new-token", permissions)
	if err != nil {
		panic(err)
	}

	// Print the generated token
	println("generated token:", token)
}
