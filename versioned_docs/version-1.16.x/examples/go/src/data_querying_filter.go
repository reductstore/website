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

	// Get a bucket with the name "example-bucket"
	bucket, err := client.GetBucket(context.Background(), "example-bucket")
	if err != nil {
		panic(err)
	}

	// Query 10 photos from "imdb" entry which taken after 2006 with the face score less than 4
	queryOptions := reduct.NewQueryOptionsBuilder().
		WithWhen(map[string]any{
			"&photo_taken": map[string]any{"$gt": 2006},
			"&face_score":  map[string]any{"$lt": 4},
			"$limit":       10,
		}).
		Build()

	query, err := bucket.Query(context.Background(), "imdb", &queryOptions)
	if err != nil {
		panic(err)
	}

	for record := range query.Records() {
		println("Name:", record.Labels()["name"].(string))
		println("Photo taken:", record.Labels()["photo_taken"].(string))
		println("Face score:", record.Labels()["face_score"].(string))
	}
}
