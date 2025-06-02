package main

/**

async def browse_buckets():
    # Create a client with the base URL and API token
    async with Client("http://localhost:8383", api_token="my-token") as client:
        # Browse all buckets and print their information
        buckets: List[BucketInfo] = await client.list()
        for info in buckets:
            print(f"Bucket: {info.name}")
            print(f"Size: {info.size}")
            print(f"Entry Count: {info.entry_count}")
            print(f"Oldest Record: {info.oldest_record}")
            print(f"Latest Record: {info.latest_record}")

        # Get information about a specific bucket
        bucket: Bucket = await client.get_bucket("example-bucket")
        info = await bucket.get_full_info()
        print(f"Bucket settings: {info.settings}")

        for entry in info.entries:
            print(f"Entry: {entry.name}")
            print(f"Size: {entry.size}")
            print(f"Oldest Record: {entry.oldest_record}")
            print(f"Latest Record: {entry.latest_record}")
*/
import (
	"context"
	reduct "github.com/reductstore/reduct-go"
)

func main() {
	// Create a client and use the base URL and API token
	client := reduct.NewClient("http://localhost:8383", reduct.ClientOptions{
		APIToken: "my-token",
	})

	// Browse all buckets and print their information
	buckets, err := client.GetBuckets(context.Background())
	if err != nil {
		panic(err)
	}

	for _, info := range buckets {
		println("Bucket:", info.Name)
		println("Size:", info.Size)
		println("Entry Count:", info.EntryCount)
		println("Oldest Record:", info.OldestRecord)
		println("Latest Record:", info.LatestRecord)
	}

	// Get information about a specific bucket
	// wait: https://github.com/reductstore/reduct-go/issues/24
}
