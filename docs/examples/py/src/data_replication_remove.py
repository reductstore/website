import asyncio

from reduct import Client, ReplicationSettings


async def main():
    # Create a client instance
    async with Client("http://127.0.0.1:8383", api_token="my-token") as client:
        # Remove the `example-replication` replication
        await client.delete_replication("example-replication")


loop = asyncio.get_event_loop()
loop.run_until_complete(main())
