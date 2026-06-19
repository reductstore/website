import asyncio

from reduct import Client, ReplicationSettings


async def main():
    # Create a client instance
    async with Client("http://127.0.0.1:8383", api_token="my-token") as client:
        # List all replications
        for replication in await client.get_replications():
            print("Replication: ", replication.name)
            print("Active: ", replication.is_active)
            print("Pending records: ", replication.pending_records)
            print("Provisioned: ", replication.is_provisioned)

        # Get all details of a replication
        replication = await client.get_replication_detail("example-replication")
        print("Replication: ", replication.info.name)
        print("Settings: ", replication.settings)
        print("Failed records (last hour): ", replication.diagnostics.hourly.errored)
        print("Successful records (last hour): ", replication.diagnostics.hourly.ok)
        print("Errors (last hour): ", replication.diagnostics.hourly.errors)


loop = asyncio.get_event_loop()
loop.run_until_complete(main())
