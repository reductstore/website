from reduct import Client


async def rename_entry():
    # Create a client with the base URL and API token
    async with Client("http://127.0.0.1:8383", api_token="my-token") as client:

        # Get the bucket with the name "example-bucket"
        bucket = await client.get_bucket("example-bucket")

        # Rename the entry "entry_1" to "entry_2"
        await bucket.rename_entry("entry_1", "entry_2")

        # Check that the entry was renamed
        entries = await bucket.get_entry_list()
        entry_names = [entry.name for entry in entries]
        assert "entry_2" in entry_names
        assert "entry_1" not in entry_names


if __name__ == "__main__":
    import asyncio

    asyncio.run(rename_entry())
