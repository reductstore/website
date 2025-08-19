from time import time_ns
from pathlib import Path

from reduct import Client

HERE = Path(__file__).parent

from time import time_ns
from pathlib import Path

from reduct import Client

async def main():
    async with Client("http://localhost:8383", api_token="my-token") as client:
        bucket = await client.create_bucket(
            "my-bucket",
            exist_ok=True,
        )
        # Write an MCAP file with timestamps
        now = time_ns() // 1000
        with open(f"{HERE}/../data/multi_topic_5min.mcap", "rb") as f:
            data = f.read()

        await bucket.write(
            "mcap",
            data,
            content_length=len(data),
            timestamp=now,
            content_type="application/mcap",
        )

        # Prepare the query with the 'ros' extension (transform)
        ext = {
            "ros": {
                "transform": {
                    "include": ["/topic-.*"],
                    "exclude": ["/topic-b", "/ext-.*"],
                    "duration": "1m",
                    "size": "100MB"
                },
            }
        }

        # Query the data with the 'ros' extension
        async for record in bucket.query("mcap", start=now, ext=ext):
            print(f"Record timestamp: {record.timestamp}")

            # Each record corresponds to a new MCAP episode
            data = await record.read_all()
            print(f"Episode file size: {len(data)} bytes")


if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
