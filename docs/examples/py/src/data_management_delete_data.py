from reduct import Client, Bucket


async def browse_buckets():
    # Create a client with the base URL and API token
    async with Client("http://localhost:8383", api_token="my-token") as client:
        # Get bucket to remove
        bucket: Bucket = await client.get_bucket("bucket-to-remove")

        # Delete only entry with name "example-entry"
        await bucket.remove_entry("example-entry")

        # Remove entire bucket
        await bucket.remove()