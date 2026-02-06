import asyncio

from reduct import Client, ReplicationMode


async def main():
    # Update replication mode without altering other settings
    async with Client("http://127.0.0.1:8383", api_token="my-token") as client:
        # Pause to queue transactions without sending them
        await client.set_replication_mode("my_replication", ReplicationMode.PAUSED)

        # Disable to ignore new transactions
        await client.set_replication_mode("my_replication", ReplicationMode.DISABLED)

        # Re-enable to resume sending queued data
        await client.set_replication_mode("my_replication", ReplicationMode.ENABLED)


asyncio.run(main())
