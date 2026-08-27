import asyncio
import base64
import json
import os
from datetime import datetime, timedelta, timezone
from pathlib import Path

from reduct import Client


SERVER_URL = 'https://play.reduct.store/'
API_TOKEN = 'reductstore'
BUCKET_NAME = 'orion'
ENTRY_NAME = '/right_ir/rotated/image_raw'
OUTPUT_DIR = Path(os.environ.get('OUTPUT_DIR', 'orion-images'))


def last_hour_query(now=None):
    stop = now or datetime.now(timezone.utc)
    start = stop - timedelta(hours=1)
    condition = {
        '$and': [
            {'&gps_z': {'$gt': 100}},
            {'&gps_z': {'$lt': 120}},
        ],
        '$each_t': '30s',
        '#ext': {
            'ros': {
                'extract': {
                    'encode': {
                        'data': 'jpeg',
                    }
                },
            }
        },
    }
    return start, stop, condition


def save_jpeg(message, output_path):
    image = message[0]
    jpeg = base64.decodebytes(image['data'].encode('ascii'))
    output_path.write_bytes(jpeg)
    return {key: value for key, value in image.items() if key != 'data'}


async def main():
    start, stop, condition = last_hour_query()
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    async with Client(SERVER_URL, api_token=API_TOKEN) as client:
        bucket = await client.get_bucket(BUCKET_NAME)

        print(f"Run query: {start} to {stop} condition: {json.dumps(condition)}")
        async for record in bucket.query(
            ENTRY_NAME,
            start=start,
            stop=stop,
            when=condition,
        ):
            message = json.loads((await record.read_all()).decode('utf-8'))
            output_path = OUTPUT_DIR / f'{record.timestamp}.jpg'
            image_info = save_jpeg(message, output_path)

            print(record.entry, record.timestamp, record.labels['gps_z'])
            print(f'Saved JPEG to {output_path}')
            print(f'Image parameters: {json.dumps(image_info, sort_keys=True)}')


if __name__ == '__main__':
    asyncio.run(main())
