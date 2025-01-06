import asyncio

from reduct import Client, ReplicationSettings


async def main():
    # Create a client instance, then create a bucket as source bucket
    async with Client("http://127.0.0.1:8383", api_token="my-token") as client:
        await client.create_bucket("my-bucket", exist_ok=True)

        # Set up a replication to a destination bucket for records
        # from the "py-example" entry and with labels "anomaly=1"
        replication_settings = ReplicationSettings(
            src_bucket="my-bucket",
            dst_bucket="demo",
            dst_host="https://play.reduct.store",
            dst_token="reductstore",
            entries=["py-example"],
            when= {"&anomaly": {"$eq": 1}},
        )
        await client.create_replication("my-replication", replication_settings)


loop = asyncio.get_event_loop()
loop.run_until_complete(main())
