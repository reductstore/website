import asyncio

from reduct import Client

URL = "https://play.reduct.store"
TOKEN = "reductstore"


async def main():
    async with Client(URL, api_token=TOKEN) as client:
        bucket = await client.get_bucket("datasets")
        when = {"&left-eye-x": {"$gt": 150}, "$limit": 5}

        async for record in bucket.query("cats", when=when):
            with open(f"cat-{record.timestamp}.jpg", "wb") as file:
                file.write(await record.read_all())
            print(
                record.timestamp,
                record.labels["left-eye-x"],
                record.labels["left-eye-y"],
            )


asyncio.run(main())
