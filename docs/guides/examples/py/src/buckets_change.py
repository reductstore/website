from reduct import Client, BucketSettings, QuotaType

# Create a client with the base URL and API token
client = Client("http://localhost:8383", api_token="my-token")


async def change_bucket():
    # Get an existing bucket
    bucket = await client.get_bucket("existing-bucket")

    # Change the quota size of the bucket to 5GB
    new_settings = BucketSettings(
        quota_size=5000_000_000
    )
    await bucket.set_settings(new_settings)

    assert (await bucket.get_settings()).quota_size == 5000_000_000


if __name__ == "__main__":
    import asyncio

    asyncio.run(change_bucket())
