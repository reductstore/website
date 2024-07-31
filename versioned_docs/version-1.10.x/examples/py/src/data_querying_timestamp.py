import time
import asyncio
from reduct import Client, Bucket


async def main():
    # Create a client instance, then get or create a bucket
    client = Client("http://127.0.0.1:8383", api_token="my-token")
    bucket: Bucket = await client.create_bucket("my-bucket", exist_ok=True)

    ts = time.time()
    await bucket.write(
        "py-example",
        b"Some binary data",
        ts,
    )

    # Query records in the "py-example" entry of the bucket
    async with bucket.read("py-example", ts) as record:
        # Print  meta information
        print(f"Timestamp: {record.timestamp}")
        print(f"Content Length: {record.size}")
        print(f"Content Type: {record.content_type}")
        print(f"Labels: {record.labels}")

        # Read the record content
        content = await record.read_all()
        assert content == b"Some binary data"


loop = asyncio.get_event_loop()
loop.run_until_complete(main())
