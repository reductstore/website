
import asyncio
from reduct import Client, Bucket


async def main():
    # Create a client with the base URL and API token
    async with Client("http://localhost:8383", api_token="my-token") as client:
        # Get bucket to remove
        bucket: Bucket = await client.get_bucket("bucket-to-remove")

        # Delete only entry with name "example-entry"
        await bucket.remove_entry("example-entry")

        # Wait for the storage to finish removing blocks
        await asyncio.sleep(1)

        # Remove entire bucket
        await bucket.remove()


if __name__ == "__main__":
    asyncio.run(main())
