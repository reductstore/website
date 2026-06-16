from time import time_ns
from pathlib import Path

from reduct import Client

HERE = Path(__file__).parent


async def main():
    async with Client("http://localhost:8383", api_token="my-token") as client:
        bucket = await client.create_bucket(
            "my-bucket",
            exist_ok=True,
        )
        # Write a rosbag ZIP archive with timestamps
        now = time_ns() // 1000

        with open(f"{HERE}/../data/rosbag_test.zip", "rb") as f:
            data = f.read()

        await bucket.write(
            "rosbag",
            data,
            content_length=len(data),
            timestamp=now,
            content_type="application/rosbag",
        )

        # Prepare the query with the 'ros' extension
        condition = {
            "#ext": {
                "ros": {
                    "rosbag": {},
                    "transform": {
                        "include": ["/test/geometry_msgs/accel"],
                        "duration": "1m",
                        "size": "100KB",
                    },
                }
            }
        }

        # Query the data with the 'ros' extension
        async for record in bucket.query("rosbag", start=now, when=condition):
            print(f"Record entry: {record.entry}")
            print(f"Record timestamp: {record.timestamp}")

            # Each record corresponds to a new rosbag episode
            data = await record.read_all()
            print(f"Episode file size: {len(data)} bytes")


if __name__ == "__main__":
    import asyncio

    asyncio.run(main())
