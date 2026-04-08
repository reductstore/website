import json
from pathlib import Path
from time import time_ns

from reduct import Client

HERE = Path(__file__).parent
DATA = HERE / '../data'


async def main():
    async with Client('http://localhost:8383', api_token='my-token') as client:
        bucket = await client.create_bucket('my-bucket', exist_ok=True)
        entry_a = f'sensor-pos-{time_ns()}'
        entry_b = f'sensor-pos-copy-{time_ns()}'

        with open(DATA / 'raw_ros_point_ros_attachment.json', 'r', encoding='utf-8') as f:
            base_attachment = json.load(f)

        attachment_a = dict(base_attachment)
        attachment_b = dict(base_attachment)
        attachment_b['topic'] = '/sensor/pos_copy'

        with open(DATA / 'raw_ros_point_records.json', 'r', encoding='utf-8') as f:
            records = json.load(f)

        await bucket.write_attachments(entry_a, {'$ros': attachment_a})
        await bucket.write_attachments(entry_b, {'$ros': attachment_b})

        for sample in records[:2]:
            payload = (DATA / sample['file']).read_bytes()
            await bucket.write(
                entry_a,
                payload,
                content_length=len(payload),
                timestamp=sample['timestamp'],
                labels=sample['labels'],
                content_type='application/ros1',
            )

        sample = records[2]
        payload = (DATA / sample['file']).read_bytes()
        await bucket.write(
            entry_b,
            payload,
            content_length=len(payload),
            timestamp=sample['timestamp'],
            labels=sample['labels'],
            content_type='application/ros1',
        )

        condition = {
            '#ext': {
                'ros': {
                    'export': {
                        'format': 'mcap',
                        'duration': '1m',
                    },
                },
            }
        }

        async for record in bucket.query('*', start=records[0]['timestamp'], when=condition):
            print(f'Record entry: {record.entry}')
            print(f'Record timestamp: {record.timestamp}')

            data = await record.read_all()
            print(f'Episode file size: {len(data)} bytes')


if __name__ == '__main__':
    import asyncio

    asyncio.run(main())
