import asyncio

from reduct import Client

URL = "https://play.reduct.store"
TOKEN = "reductstore"


async def main():
    async with Client(URL, api_token=TOKEN) as client:
        bucket = await client.get_bucket("datasets")
        when = {"&digit": {"$eq": 7}, "$limit": 5}

        async for record in bucket.query("mnist_training", when=when):
            with open(f"digit-{record.timestamp}.png", "wb") as file:
                file.write(await record.read_all())
            print(record.timestamp, record.labels["digit"], record.size)


asyncio.run(main())
