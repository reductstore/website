import asyncio
from reduct import Client, ReductError


async def remove_bucket():
    # Create a client with the base URL and API token
    async with Client("http://127.0.0.1:8383", api_token="my-token") as client:
        # Remove the bucket with the name "bucket-to-remove"

        bucket = await client.get_bucket("bucket-to-remove")
        await bucket.remove()

        # Check that the bucket no longer exists
        try:
            await client.get_bucket("bucket-to-remove")
        except ReductError as e:
            # The bucket should not exist anymore or still be in the process of being removed
            assert e.status_code in [404, 409]


if __name__ == "__main__":
    asyncio.run(remove_bucket())
