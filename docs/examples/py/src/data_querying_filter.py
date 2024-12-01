import time
import asyncio
from reduct import Client, Bucket


async def main():
    # Create a client instance, then get or create a bucket
    async with Client("http://127.0.0.1:8383", api_token="my-token") as client:
        bucket: Bucket = await client.get_bucket("example-bucket")

        # Query 10 photos from "imdb" entry which taken after 2006 but don't contain "Rowan Atkinson"
        async for record in bucket.query(
                "imdb",
                limit=10,
                when={
                    "&photo_taken": {"$gt": 2006},
                    "&name": {"$ne": "b'Rowan Atkinson'"},
                },
        ):
            print("Name", record.labels["name"])
            print("Phot taken", record.labels["photo_taken"])
            print("Gender", record.labels["gender"])
            _jpeg = await record.read_all()


loop = asyncio.get_event_loop()
loop.run_until_complete(main())
