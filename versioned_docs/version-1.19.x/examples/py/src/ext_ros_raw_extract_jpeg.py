import json
from pathlib import Path
from time import time_ns

from reduct import Client

HERE = Path(__file__).parent
DATA = HERE / '../data'


async def main():
    async with Client('http://localhost:8383', api_token='my-token') as client:
        bucket = await client.create_bucket('my-bucket', exist_ok=True)
        entry = f'camera-raw-{time_ns()}'

        with open(DATA / 'raw_ros_image_ros_attachment.json', 'r', encoding='utf-8') as f:
            ros_attachment = json.load(f)

        with open(DATA / 'raw_ros_image_records.json', 'r', encoding='utf-8') as f:
            records = json.load(f)

        sample = records[0]
        payload = (DATA / sample['file']).read_bytes()

        await bucket.write_attachments(entry, {'$ros': ros_attachment})
        await bucket.write(
            entry,
            payload,
            content_length=len(payload),
            timestamp=sample['timestamp'],
            labels=sample['labels'],
            content_type='application/ros1',
        )

        condition = {
            '#ext': {
                'ros': {
                    'extract': {
                        'encode': {
                            'data': 'jpeg',
                        },
                    },
                },
            }
        }

        async for record in bucket.query(entry, start=sample['timestamp'], when=condition):
            print(f'Record timestamp: {record.timestamp}')
            print(f"Record labels: {dict(sorted(record.labels.items()))}")

            message = json.loads((await record.read_all()).decode('utf-8'))
            image_info = {k: v for k, v in message.items() if k != 'data'}
            print(f'Image parameters: {json.dumps(image_info, sort_keys=True)}')


if __name__ == '__main__':
    import asyncio

    asyncio.run(main())
