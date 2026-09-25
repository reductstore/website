from reduct import Client, ReductError


async def rename_bucket():
    # Create a client with the base URL and API token
    async with Client("http://127.0.0.1:8383", api_token="my-token") as client:

        # Rename the bucket with the name "bucket-to-rename"
        bucket = await client.get_bucket("bucket-to-rename")
        await bucket.rename("bucket-renamed")

        # Check that the bucket was renamed
        assert await client.get_bucket("bucket-renamed")
        try:
            await client.get_bucket("bucket-to-rename")
        except ReductError as e:
            # The bucket should not exist anymore
            assert e.status_code == 404


if __name__ == "__main__":
    import asyncio

    asyncio.run(rename_bucket())
