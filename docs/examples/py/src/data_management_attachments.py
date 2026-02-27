import asyncio
from reduct import Client, Bucket


async def main():
    # Create a client instance, then get or create a bucket
    async with Client("http://127.0.0.1:8383", api_token="my-token") as client:
        bucket: Bucket = await client.create_bucket("my-bucket", exist_ok=True)

        # Write attachments for an entry
        await bucket.write_attachments(
            "camera/front",
            {
                "schema": {"type": "object", "version": "1.0"},
                "calibration": {"fx": 1260.1, "fy": 1261.2},
            },
        )

        # Read attachments
        attachments = await bucket.read_attachments("camera/front")
        assert attachments["schema"]["type"] == "object"

        # Remove one attachment by key
        await bucket.remove_attachments("camera/front", ["calibration"])
        attachments = await bucket.read_attachments("camera/front")
        assert "calibration" not in attachments

        # Remove all attachments
        await bucket.remove_attachments("camera/front")
        assert await bucket.read_attachments("camera/front") == {}


if __name__ == "__main__":
    asyncio.run(main())
