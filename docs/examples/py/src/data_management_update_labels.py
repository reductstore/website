import time
import asyncio
from reduct import Client, Bucket, Batch


async def main():
    # Create a client instance, then get or create a bucket
    client = Client("http://127.0.0.1:8383", api_token="my-token")
    bucket: Bucket = await client.create_bucket("my-bucket", exist_ok=True)

    # Send a record to the "py-example" entry with labels
    ts = time.time()
    await bucket.write("py-example", b"Some binary data", ts, labels={"key1": "value1", "key2": "value2"})
    await bucket.write("py-example", b"Some binary data", ts + 1, labels={"key1": "value1", "key2": "value2"})

    # Update labels of a record: remove "key2" and update "key1"
    await bucket.update("py-example", ts, labels={"key1": "new-value", "key2": ""})
    with bucket.read("py-example", ts) as record:
        assert record.labels["key1"] == "new-value"
        assert "key2" not in record.labels

    # Update labels in a batch
    batch = Batch()
    batch.add("py-example", ts, labels={"key1": "new-value", "key2": ""})
    batch.add("py-example", ts + 1, labels={"key3": "value3"})
    errors = await bucket.update_batch("py-example", batch)
    assert not errors


loop = asyncio.get_event_loop()
loop.run_until_complete(main())
