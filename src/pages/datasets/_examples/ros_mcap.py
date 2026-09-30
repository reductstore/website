import asyncio
from datetime import datetime, timedelta, timezone

from reduct import Client

URL = "https://play.reduct.store"
TOKEN = "reductstore"

TOPICS = [
    "right_camera/image_color/compressed",
    "Pablo05/sensor/gps/fix",
    "Pablo05/odom",
    "tf",
]


async def main():
    async with Client(URL, api_token=TOKEN) as client:
        bucket = await client.get_bucket("orion")
        stop = datetime.now(timezone.utc)
        start = stop - timedelta(hours=1)
        when = {
            "$each_t": "30s",
            "#ext": {
                "ros": {"export": {"format": "mcap", "duration": "1h"}}
            },
        }

        async for record in bucket.query(
            TOPICS, start=start, stop=stop, when=when
        ):
            with open("orion.mcap", "wb") as file:
                file.write(await record.read_all())
            print("orion.mcap", record.content_type, record.size, "bytes")


asyncio.run(main())
