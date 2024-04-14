from reduct import Client, ReductError

# Create a client with the base URL and API token
client = Client("http://localhost:8383", api_token="my-token")


async def remove_bucket():
    # Remove the bucket with the name "bucket-to-remove"
    bucket = await client.get_bucket("bucket-to-remove")
    await bucket.remove()

    # Check that the bucket no longer exists
    try:
        await client.get_bucket("bucket-to-remove")
    except ReductError as e:
        # The bucket should not exist anymore
        assert e.status_code == 404


if __name__ == "__main__":
    import asyncio

    asyncio.run(remove_bucket())
