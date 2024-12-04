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

        # Delete all records within a time range
        removed_records = await bucket.remove_query("py-example", ts, ts + 2)
        assert removed_records == 2

        # You can also delete all records with a specific label
        await bucket.remove_query("py-example", ts, ts + 2, when={"&key1": {"$eq": "value1"}})

        # Or each N-th record
        await bucket.remove_query("py-example", ts, ts + 2, each_n=2)

if __name__ == "__main__":
    import asyncio

    asyncio.run(main())
