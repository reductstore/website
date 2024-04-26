import time
import asyncio
from typing import Dict

from reduct import Client, Bucket, Batch, ReductError


async def main():
    # Create a client instance, then get or create a bucket
    client = Client("http://127.0.0.1:8383", api_token="my-token")
    bucket: Bucket = await client.create_bucket("my-bucket", exist_ok=True)

    # Prepare a batch of records
    batch = Batch()
    batch.add("2024-02-02T10:00:00", b"Records #1", )
    batch.add("2024-02-02T10:00:01", b"Records #2", )
    batch.add("2024-02-02T10:00:02", b"Records #3", )

    # Write the batch to the "entry-1" entry of the bucket
    errors: Dict[int, ReductError] = await bucket.write_batch("entry-1", batch)

    # Check statuses and raise first error
    for timestamp, err in errors.items():
        raise err


loop = asyncio.get_event_loop()
loop.run_until_complete(main())
