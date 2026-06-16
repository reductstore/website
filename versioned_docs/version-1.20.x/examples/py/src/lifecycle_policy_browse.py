import asyncio

from reduct import Client


async def main():
    async with Client("http://127.0.0.1:8383", api_token="my-token") as client:
        for lifecycle in await client.get_lifecycles():
            print("Lifecycle:", lifecycle.name)
            print("Mode:", lifecycle.mode)
            print("Running:", lifecycle.is_running)
            print("Provisioned:", lifecycle.is_provisioned)

        details = await client.get_lifecycle_detail("my-lifecycle")
        print("Lifecycle:", details.info.name)
        print("Settings:", details.settings)


asyncio.run(main())
