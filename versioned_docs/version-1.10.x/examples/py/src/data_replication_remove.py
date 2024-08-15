import asyncio

from reduct import Client, ReplicationSettings


async def main():
    # Create a client instance
    client = Client("http://127.0.0.1:8383", api_token="my-token")
    # Remove the `example-replication` replication
    await client.delete_replication("example-replication")


loop = asyncio.get_event_loop()
loop.run_until_complete(main())
