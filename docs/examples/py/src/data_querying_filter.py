import time
import asyncio
from reduct import Client, Bucket


async def main():
    # Create a client instance, then get or create a bucket
    async with Client("http://127.0.0.1:8383", api_token="my-token") as client:
        bucket: Bucket = await client.get_bucket("example-bucket")

        # Query 10 photos from "imdb" entry which taken after 2006 with the face score less than 4
        async for record in bucket.query(
                "imdb",
                limit=10,
                when={
                    "&photo_taken": {"$gt": 2006},
                    "&face_score": {"$gt": 4},
                },
        ):
            print("Name", record.labels["name"])
            print("Photo taken", record.labels["photo_taken"])
            print("Face score", record.labels["face_score"])
            _jpeg = await record.read_all()


loop = asyncio.get_event_loop()
loop.run_until_complete(main())
