import asyncio
import json
from datetime import datetime, timedelta, timezone

from reduct import Client

URL = "https://play.reduct.store"
TOKEN = "reductstore"


async def main():
    async with Client(URL, api_token=TOKEN) as client:
        bucket = await client.get_bucket("orion")
        stop = datetime.now(timezone.utc)
        start = stop - timedelta(hours=1)
        when = {"$each_t": "30s", "#ext": {"ros": {"extract": {}}}}

        async for record in bucket.query(
            "Pablo05/sensor/gps/fix", start=start, stop=stop, when=when
        ):
            fix = json.loads(await record.read_all())[0]
            print(
                fix["header"]["stamp"]["sec"],
                fix["latitude"],
                fix["longitude"],
            )


asyncio.run(main())
