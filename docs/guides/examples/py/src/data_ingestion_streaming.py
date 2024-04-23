import io
import time
import asyncio
from reduct import Client, Bucket

IO_BUFFER = io.BytesIO(b"Some let's say huge binary data")


async def main():
    # Create a client instance, then get or create a bucket
    client = Client('http://127.0.0.1:8383', api_token="my-token")
    bucket: Bucket = await client.create_bucket("my-bucket", exist_ok=True)

    # Async iterator that reads data from in chunks
    async def data_reader():
        while True:
            data = IO_BUFFER.read(5)  # Read in chunks of 5 bytes
            if not data:
                break
            yield data

    # Stream the buffer to the "entry-1" entry with the current timestamp
    ts = time.time()
    await bucket.write("entry-1", data_reader(), ts, content_length=IO_BUFFER.tell())


loop = asyncio.get_event_loop()
loop.run_until_complete(main())
