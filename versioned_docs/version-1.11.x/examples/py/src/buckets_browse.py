from typing import List

from reduct import Client, Bucket, BucketInfo


async def browse_buckets():
    # Create a client with the base URL and API token
    async with Client("http://localhost:8383", api_token="my-token") as client:
        # Browse all buckets and print their information
        buckets: List[BucketInfo] = await client.list()
        for info in buckets:
            print(f"Bucket: {info.name}")
            print(f"Size: {info.size}")
            print(f"Entry Count: {info.entry_count}")
            print(f"Oldest Record: {info.oldest_record}")
            print(f"Latest Record: {info.latest_record}")

        # Get information about a specific bucket
        bucket: Bucket = await client.get_bucket("example-bucket")
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
