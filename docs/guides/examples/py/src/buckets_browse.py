from reduct import Client, BucketSettings, QuotaType

# Create a client with the base URL and API token
client = Client("http://localhost:8383", api_token="my-token")


async def browse_buckets():
    # Get all buckets
    buckets = await client.list()
    for bucket in buckets:
        print(f"Bucket: {bucket.name}")
        print(f"Size: {bucket.size}")
        print(f"Entry Count: {bucket.entry_count}")
        print(f"Oldest Record: {bucket.oldest_record}")
        print(f"Latest Record: {bucket.latest_record}")

    # Get information about a specific bucket
    bucket = await client.get_bucket("my-bucket")
    info = await bucket.get_full_info()
    print(f"Bucket settings: {info.settings}")

    for entry in info.entries:
        print(f"Entry: {entry.name}")
        print(f"Size: {entry.size}")
        print(f"Oldest Record: {entry.oldest_record}")
        print(f"Latest Record: {entry.latest_record}")


if __name__ == "__main__":
    import asyncio

    asyncio.run(browse_buckets())
