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
                    "extract": {
                        "topic": "/test/geometry_msgs/accel",
                        "as_label": {
                            "lin_x": "linear.x",
                        },
                    },
                },
                "when": {
                    "@lin_x": {"$gt": 0.0},
                },
            }
        }

        # Query the data with the 'ros' extension
        async for record in bucket.query("rosbag", start=now, when=condition):
            print(f"Record entry: {record.entry}")
            print(f"Record timestamp: {record.timestamp}")
            print(f"Record labels: {record.labels}")

            json = await record.read_all()
            print(json.decode("utf-8").strip())


if __name__ == "__main__":
    import asyncio

    asyncio.run(main())
