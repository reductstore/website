import json
from time import time_ns
from reduct import Client


async def main():
    async with Client("http://localhost:8383", api_token="my-token") as client:
        bucket = await client.create_bucket(
            "my-bucket",
            exist_ok=True,
        )
        # Write some JSON data with timestamps
        now = time_ns() // 1000
        await bucket.write("data", json.dumps({"temp": {"value": 10.0, "status": "ok"}, "src": "#1"}), timestamp=now,
                           content_type="application/json")
        await bucket.write("data", json.dumps({"temp": {"value": -4.0, "status": "bad"}, "src": "#1"}),
                           timestamp=now + 1000, content_type="application/json")

        # Prepare the query with the 'select' extension
        condition = {
            "#ext": {
                "select": {  # name of the extension to use
                    "json": {},  # Specify JSON format for the data
                    "columns": [
                        # Select temperature data
                        {"name": "temp"},
                        # Select status of the temperature sensor
                        {"name": "temp.status", "as_label": "status"},
                    ],
                },
                "when": {
                    "@status": {"$eq": "ok"},  # Filter records where status is 'ok'
                },
            }
        }

        # Query the data with the 'select' extension
        async for record in bucket.query("data", start=now, when=condition):
            print(f"Record timestamp: {record.timestamp}")
            print(f"Record labels: {record.labels}")

            json_data = json.loads(await record.read_all())
            print(f"JSON data: {json_data}")


# 5. Run the main function
if __name__ == "__main__":
    import asyncio

    asyncio.run(main())
