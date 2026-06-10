import asyncio

from reduct import Client, Bucket, RecordBatch


async def main():
    # Create a client instance, then get or create a bucket
    async with Client("http://127.0.0.1:8383", api_token="my-token") as client:
        bucket: Bucket = await client.create_bucket("my-bucket", exist_ok=True)

        # Prepare a batch of records for different entries
        batch = RecordBatch()
        batch.add(
            "sensor-1",
            "2024-02-02T10:00:00",
            b"Temperature: 20.5",
            content_type="text/plain",
            labels={"unit": "C"},
        )
        batch.add(
            "sensor-1",
            "2024-02-02T10:00:01",
            b"Temperature: 20.6",
            content_type="text/plain",
            labels={"unit": "C"},
        )
        batch.add(
            "camera-1",
            "2024-02-02T10:00:02",
            b"Frame #1",
            content_type="text/plain",
        )

        # Write records from multiple entries in one request
        errors = await bucket.write_record_batch(batch)

        # Check statuses and raise first error
        for entry_errors in errors.values():
            for _timestamp, err in entry_errors.items():
                raise err


loop = asyncio.get_event_loop()
loop.run_until_complete(main())
