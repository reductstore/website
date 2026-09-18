from time import time_ns
from pathlib import Path

from reduct import Client

HERE = Path(__file__).parent
CHUNKS_DIR = HERE / "../data/h264_chunks"


async def main():
    async with Client("http://localhost:8383", api_token="my-token") as client:
        bucket = await client.create_bucket("my-bucket", exist_ok=True)

        # Store pre-made H.264 chunks
        now = time_ns() // 1000
        for idx, chunk_path in enumerate(sorted(CHUNKS_DIR.glob("*.h264"))):
            await bucket.write(
                "h264",
                chunk_path.read_bytes(),
                timestamp=now + idx * 1_000_000,
                content_type="video/h264",
                labels={"fps": "10"},
            )

        # Export as MP4 episodes split by duration
        episode = 0
        async for record in bucket.query(
            "h264",
            start=now,
            when={"#ext": {"video": {"export": {"duration": "2s"}}}},
        ):
            episode += 1
            mp4 = await record.read_all()
            print(
                f"Episode {episode}: timestamp={record.timestamp}, size={len(mp4)} bytes"
            )

        print(f"Total episodes: {episode}")


if __name__ == "__main__":
    import asyncio

    asyncio.run(main())
