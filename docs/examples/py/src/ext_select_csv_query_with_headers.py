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
        await bucket.write("csv", "a,b,c,d,e\n1,2,3,4,5\n6,7,8,9,10\n11,12,13,14,15\n", timestamp=now, content_type="text/csv")
        await bucket.write("csv", "a,b,c,d,e\n1,2,3,4,5\n6,7,8,9,10\n11,12,13,14,15\n", timestamp=now+1, content_type="text/csv")

        # Prepare the query with the 'select' extension
        ext = {
            "select": {     # name of the extension to use
                "csv": {
                    "has_headers": True,  # Indicate that the CSV data has headers
                },
                "columns": [
                    # Select columns corresponding to the "e" header and map it to a label "col_e"'
                    {"name": "e", "as_label": "col_e"},
                ],
            },
            "when": {
                "@col_e": {"$lt": 10},  # Filter out rows where the "e" column is greater than or equal to 10
            },
        }

        # Query the data with the 'select' extension
        async for record in bucket.query("csv", start=now, ext=ext):
            print(f"Record timestamp: {record.timestamp}")
            print(f"Record labels: {record.labels}")

            csv = await record.read_all()
            print(csv.decode("utf-8").strip())


# 5. Run the main function
if __name__ == "__main__":
    import asyncio

    asyncio.run(main())
