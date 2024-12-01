from reduct import Client, BucketSettings, QuotaType


async def main():
    # 1. Create a ReductStore client
    async with Client("http://localhost:8383", api_token="my-token") as client:
        # 2. Get or create a bucket with 1Gb quota
        bucket = await client.create_bucket(
            "my-bucket",
            BucketSettings(quota_type=QuotaType.FIFO, quota_size=1_000_000_000),
            exist_ok=True,
        )

        # 3. Write some data with timestamps and labels to the 'entry-1' entry
        await bucket.write("sensor-1", b"<Blob data>", timestamp="2024-01-01T10:00:00Z",
                           labels={"score": 10})
        await bucket.write("sensor-1", b"<Blob data>", timestamp="2024-01-01T10:00:01Z",
                           labels={"score": 20})

        # 4. Query the data by time range and condition
        async for record in bucket.query("sensor-1",
                                         start="2024-01-01T10:00:00Z",
                                         end="2024-01-01T10:00:02Z",
                                         when={"&score": {"$gt": 10}}):
            print(f"Record timestamp: {record.timestamp}")
            print(f"Record size: {record.size}")
            print(await record.read_all())


# 5. Run the main function
if __name__ == "__main__":
    import asyncio

    asyncio.run(main())
