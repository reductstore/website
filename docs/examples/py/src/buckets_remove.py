from reduct import Client, ReductError


async def remove_bucket():
    # Create a client with the base URL and API token
    async with Client("http://127.0.0.1:8383", api_token="my-token") as client:
        # Remove the bucket with the name "example-bucket"

        bucket = await client.get_bucket("example-bucket")
        await bucket.remove()

        # Check that the bucket no longer exists
        try:
            await client.get_bucket("example-bucket")
        except ReductError as e:
            # The bucket should not exist anymore
            assert e.status_code == 404


if __name__ == "__main__":
    import asyncio

    asyncio.run(remove_bucket())
