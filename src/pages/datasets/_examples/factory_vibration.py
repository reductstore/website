import asyncio
from datetime import datetime, timedelta, timezone

from reduct import Client

URL = "https://play.reduct.store"
TOKEN = "reductstore"


async def main():
    async with Client(URL, api_token=TOKEN) as client:
        bucket = await client.get_bucket("factory")
        stop = datetime.now(timezone.utc)
        start = stop - timedelta(hours=1)
        when = {"$each_t": "30s", "&rms": {"$gt": 0.8}}

        async for record in bucket.query(
            "vibration", start=start, stop=stop, when=when
        ):
            print(
                record.timestamp,
                record.labels["rms"],
                record.labels["peak"],
                record.size,
            )


asyncio.run(main())
