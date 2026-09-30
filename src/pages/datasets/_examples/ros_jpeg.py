import asyncio
import base64
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
        when = {
            "$each_t": "30s",
            "#ext": {"ros": {"extract": {"encode": {"data": "jpeg"}}}},
        }

        async for record in bucket.query(
            "right_ir/rotated/image_raw", start=start, stop=stop, when=when
        ):
            image = json.loads(await record.read_all())[0]
            with open(f"{record.timestamp}.jpg", "wb") as file:
                file.write(base64.b64decode(image["data"]))
            print(
                f"{record.timestamp}.jpg", image["width"], image["height"]
            )


asyncio.run(main())
