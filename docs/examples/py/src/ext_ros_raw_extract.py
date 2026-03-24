import json
from pathlib import Path
from time import time_ns

from reduct import Client

HERE = Path(__file__).parent
DATA = HERE / '../data'


async def main():
    async with Client('http://localhost:8383', api_token='my-token') as client:
        bucket = await client.create_bucket('my-bucket', exist_ok=True)
        entry = f'sensor-pos-{time_ns()}'

        with open(DATA / 'raw_ros_point_ros_attachment.json', 'r', encoding='utf-8') as f:
            ros_attachment = json.load(f)

        with open(DATA / 'raw_ros_point_records.json', 'r', encoding='utf-8') as f:
            records = json.load(f)

        await bucket.write_attachments(entry, {'$ros': ros_attachment})

        for sample in records:
            payload = (DATA / sample['file']).read_bytes()
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
                        'as_label': {
                            'coord_x': 'x',
                        },
                    },
                },
                'when': {
                    '@coord_x': {'$eq': 2.0},
                },
            }
        }

        async for record in bucket.query(entry, start=records[0]['timestamp'], when=condition):
            print(f'Record timestamp: {record.timestamp}')
            print(f"Record labels: {dict(sorted(record.labels.items()))}")

            payload = await record.read_all()
            message = json.loads(payload.decode('utf-8'))
            print(json.dumps(message, sort_keys=True, separators=(',', ':')))


if __name__ == '__main__':
    import asyncio

    asyncio.run(main())
