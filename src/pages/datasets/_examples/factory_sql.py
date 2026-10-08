import asyncio
from datetime import datetime, timedelta, timezone

from reduct import Client

URL = "https://play.reduct.store"
TOKEN = "reductstore"

SQL = """
SELECT round(avg(temperature), 1) AS temperature,
       round(max(pressure), 2) AS pressure
FROM ENTRY()
"""


async def main():
    async with Client(URL, api_token=TOKEN) as client:
        bucket = await client.get_bucket("factory")
        stop = datetime.now(timezone.utc)
        start = stop - timedelta(hours=1)
        when = {
            "$each_t": "30s",
            "#ext": {"select": {"sql": SQL, "export": {"format": "json"}}},
        }

        async for record in bucket.query(
            "plc", start=start, stop=stop, when=when
        ):
            print(record.timestamp, (await record.read_all()).decode())


asyncio.run(main())
