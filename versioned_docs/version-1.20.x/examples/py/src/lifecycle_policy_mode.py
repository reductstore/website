import asyncio

from reduct import Client, LifecycleMode


async def main():
    async with Client("http://127.0.0.1:8383", api_token="my-token") as client:
        await client.set_lifecycle_mode("my-lifecycle", LifecycleMode.DRY_RUN)
        await client.set_lifecycle_mode("my-lifecycle", LifecycleMode.DISABLED)
        await client.set_lifecycle_mode("my-lifecycle", LifecycleMode.ENABLED)


asyncio.run(main())
