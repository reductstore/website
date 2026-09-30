import asyncio
from datetime import datetime, timedelta, timezone

from reduct import Client

URL = "https://play.reduct.store"
TOKEN = "reductstore"

TOPICS = [
    "mqtt/line1/temperature",
    "mqtt/line1/pressure",
    "mqtt/line1/state",
]


async def main():
    async with Client(URL, api_token=TOKEN) as client:
        bucket = await client.get_bucket("factory")
        stop = datetime.now(timezone.utc)
        start = stop - timedelta(hours=1)

        for topic in TOPICS:
            async for record in bucket.query(
                topic, start=start, stop=stop, when={"$each_t": "30s"}
            ):
                print(
                    topic,
                    record.timestamp,
                    (await record.read_all()).decode(),
                )


asyncio.run(main())
