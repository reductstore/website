package main

import (
	"bytes"
	"context"
	reduct "github.com/reductstore/reduct-go"
	"io"
	"time"
)

/**
async def main():
    # Create a client instance, then get or create a bucket
    async with Client("http://127.0.0.1:8383", api_token="my-token") as client:
        bucket: Bucket = await client.create_bucket("my-bucket", exist_ok=True)

        # Async iterator that reads data from in chunks
        async def data_reader():
            while True:
                data = IO_BUFFER.read(5)  # Read in chunks of 5 bytes
                if not data:
                    break
                yield data

        # Stream the buffer to the "py-example" entry with the current timestamp
        ts = time.time()
        await bucket.write(
            "py-example", data_reader(), ts, content_length=IO_BUFFER.tell()
        )

*/

func main() {
	// Create a client and use the base URL and API token
	client := reduct.NewClient("http://localhost:8383", reduct.ClientOptions{
		APIToken: "my-token",
	})

	// Get or create a bucket with the name "my-bucket"
	bucket, err := client.CreateOrGetBucket(context.Background(), "my-bucket", nil)
	if err != nil {
		panic(err)
	}

	// Create a data reader
	data := []byte("This is some example data that will be streamed in chunks.")
	size := len(data)
	var reader io.Reader = bytes.NewReader([]byte("This is some example data that will be streamed in chunks."))

	// Stream the buffer to the "py-example" entry with the current timestamp
	err = bucket.BeginWrite(context.Background(), "py-example", &reduct.WriteOptions{
		Timestamp:   time.Now().UnixMicro(),
		ContentType: "application/octet-stream",
		Size:        int64(size),
	}).Write(reader)

	if err != nil {
		panic(err)
	}
}
