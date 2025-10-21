import base64
import json
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
        # Write a mcap file with timestamps
        now = time_ns() // 1000

        data = b""
        with open(f"{HERE}/../data/camera_bag_0.mcap", "rb") as f:
            data = f.read()

        await bucket.write("mcap", data, content_length=len(data), timestamp=now, content_type="application/mcap")

        # Prepare the query with the 'ros' extension
        condition = {
            "#ext": {
                "ros": {  # name of the extension to use
                    "extract": {
                        "topic": "/image_raw",
                        # encode the data filed in http://docs.ros.org/en/noetic/api/sensor_msgs/html/msg/Image.html
                        "encode": {
                            "data": "jpeg",
                        },
                    },
                },
                "when": {  # optional filter to apply
                    "$limit": 1,  # return only one record
                }
            }
        }

        # Query the data with the 'ros' extension
        async for record in bucket.query("mcap", start=now, when=condition):
            print(f"Record timestamp: {record.timestamp}")
            print(f"Record labels: {record.labels}")
            content = await record.read_all()
            # Record content is a JSON object with metadata and base64-encoded data
            obj = json.loads(content)
            # Decode the base64-encoded data and save it as a JPEG file
            with open("output.jpg", "wb") as f:
                # Decode the base64-encoded data
                encoded = base64.decodebytes(obj["data"].encode("ascii"))
                f.write(encoded)

            # Print the image parameters without the data field
            del obj["data"]
            print(f"Image parameters: {obj}")


# 5. Run the main function
if __name__ == "__main__":
    import asyncio

    asyncio.run(main())
