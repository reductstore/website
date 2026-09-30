import asyncio
from datetime import datetime, timedelta, timezone

from reduct import Client

URL = "https://play.reduct.store"
TOKEN = "reductstore"


async def main():
    async with Client(URL, api_token=TOKEN) as client:
        bucket = await client.get_bucket("orion")
        stop = datetime.now(timezone.utc)
        start = stop - timedelta(hours=1)
        when = {
            "$each_t": "30s",
            "$and": [{"&gps_z": {"$gt": 110}}, {"&gps_z": {"$lt": 120}}],
        }

        async for record in bucket.query(
            "right_camera/image_color/compressed",
            start=start,
            stop=stop,
            when=when,
        ):
            print(record.timestamp, record.labels["gps_z"], record.size)


asyncio.run(main())
