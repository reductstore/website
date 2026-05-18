import asyncio

from reduct import Client, LifecycleSettings, LifecycleType


async def main():
    async with Client("http://127.0.0.1:8383", api_token="my-token") as client:
        await client.create_bucket("my-bucket", exist_ok=True)

        settings = LifecycleSettings(
            type=LifecycleType.DELETE,
            bucket="my-bucket",
            entries=["py-example"],
            max_age="30d",
            interval="1h",
            when={"&anomaly": {"$eq": 1}},
        )
        await client.create_lifecycle("my-lifecycle", settings)


asyncio.run(main())
