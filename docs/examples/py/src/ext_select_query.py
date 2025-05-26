from time import time_ns
from reduct import Client


async def main():
    async with Client("http://localhost:8383", api_token="my-token") as client:
        bucket = await client.create_bucket(
            "my-bucket",
            exist_ok=True,
        )
        # Write some CSV data with timestamps
        now = time_ns() // 1000
        await bucket.write("csv", "1,2,3,4,5\n6,7,8,9,10\n11,12,13,14,15\n", timestamp=now, content_type="text/csv")

        # Prepare the query with the 'select' extension
        ext = {
            "select": {     # name of the extension to use
                "columns": [
                    # Select the first column and label it as 'col1'
                    {"index": 0, "as_label": "col1"},
                    # Select columns from 2nd to 4th column without labeling
                    {"from": 2, "to": 4},
                ]
            }
        }

        # Query the data with the 'select' extension
        # and filter out records where the first column is less than 10
        async for record in bucket.query("csv", start=now, when={"@col1": {"$lt": 10}}, ext=ext):
            print(f"Record timestamp: {record.timestamp}")
            print(f"Record labels: {record.labels}")

            csv = await record.read_all()
            print(csv.decode("utf-8").strip())


# 5. Run the main function
if __name__ == "__main__":
    import asyncio

    asyncio.run(main())
