import asyncio

from reduct import Client


async def main():
    async with Client("http://127.0.0.1:8383", api_token="my-token") as client:
        await client.delete_lifecycle("lifecycle-to-remove")


asyncio.run(main())
