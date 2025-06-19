from time import time_ns

from reduct import Client


async def main():
    async with Client("http://localhost:8383", api_token="my-token") as client:
        bucket = await client.create_bucket(
            "my-bucket",
            exist_ok=True,
        )
        # Write a mcap file with timestamps
        now = time_ns() // 1000

        data = b""
        with open("../data/file.mcap", "rb") as f:
            data = f.read()

        await bucket.write("mcap", data, content_length=len(data), timestamp=now, content_type="application/mcap")

        # Prepare the query with the 'ros' extension
        ext = {
            "ros": {     # name of the extension to use
                "extract": {
                    "topic": "/test"   # Specify the topic to extract from the mcap file
                },
            },
        }

        # Query the data with the 'ros' extension
        async for record in bucket.query("mcap", start=now, ext=ext):
            print(f"Record timestamp: {record.timestamp}")
            print(f"Record labels: {record.labels}")

            json = await record.read_all()
            print(json.decode("utf-8").strip())


# 5. Run the main function
if __name__ == "__main__":
    import asyncio

    asyncio.run(main())
