import time
import asyncio
from reduct import Client, Bucket


async def main():
    # Create a client instance, then get or create a bucket
    async with Client("http://127.0.0.1:8383", api_token="my-token") as client:
        bucket: Bucket = await client.create_bucket("my-bucket", exist_ok=True)

        # Send a record to the "py-example" entry with the current timestamp
        ts = time.time()
        await bucket.write("py-example", b"Some binary data", ts)


loop = asyncio.get_event_loop()
loop.run_until_complete(main())
