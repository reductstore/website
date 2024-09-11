from time import time

from reduct import Client, Bucket, Batch


async def main():
    # Create a client with the base URL and API token
    async with Client("http://localhost:8383", api_token="my-token") as client:
        bucket: Bucket = await client.create_bucket("my-bucket", exist_ok=True)

        # Send some records to the "py-example"
        ts = time()
        await bucket.write(
            "py-example",
            b"Some binary data",
            ts
        )
        await bucket.write(
            "py-example",
            b"Some binary data",
            ts + 1
        )

        # Delete a sole record
        await bucket.remove_record("py-example", ts)

        # Delete a batch of records
        batch = Batch()
        batch.add(ts)  # already deleted, so this error will be in the errors map
        batch.add(ts + 1)

        errors = await bucket.remove_batch("py-example", batch)
        assert len(errors) == 1
        print(errors)

if __name__ == "__main__":
    import asyncio

    asyncio.run(main())
