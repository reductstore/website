from reduct import Client, BucketSettings, QuotaType




async def create_bucket():
    # Create a client with the base URL and API token
    with Client("http://localhost:8383", api_token="my-token") as client:
        # Create a bucket with the name "my-bucket" and a FIFO quota of 1GB
        settings = BucketSettings(
            quota_type=QuotaType.FIFO,
            quota_size=1000_000_000,
        )
        bucket = await client.create_bucket("my-bucket", settings, exist_ok=True)
        assert bucket.name == "my-bucket"


if __name__ == "__main__":
    import asyncio

    asyncio.run(create_bucket())
