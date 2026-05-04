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
        await bucket.write(
            "csv",
            "a,b,c,d,e\n1,2,3,4,5\n6,7,8,9,10\n11,12,13,14,15\n",
            timestamp=now,
            content_type="text/csv",
        )
        await bucket.write(
            "csv",
            "a,b,c,d,e\n1,2,3,4,5\n6,7,8,9,10\n11,12,13,14,15\n",
            timestamp=now + 1,
            content_type="text/csv",
        )

        # Prepare the query with the 'select' extension
        condition = {
            "#ext": {
                "select": {  # name of the extension to use
                    "csv": {
                        "has_headers": True,  # Indicate that the CSV data has headers
                    },
                    # Select the "e" column and filter out rows where it is 10 or more.
                    "sql": "SELECT e FROM ENTRY() WHERE e < 10",
                },
            }
        }

        # Query the data with the 'select' extension
        async for record in bucket.query("csv", start=now, when=condition):
            print(f"Record timestamp: {record.timestamp}")
            print(f"Record labels: {record.labels}")

            csv = await record.read_all()
            print(csv.decode("utf-8").strip())


# 5. Run the main function
if __name__ == "__main__":
    import asyncio

    asyncio.run(main())
