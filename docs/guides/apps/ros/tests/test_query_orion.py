import base64
import importlib.util
import unittest
from datetime import datetime, timedelta, timezone
from pathlib import Path
from tempfile import TemporaryDirectory


EXAMPLE_PATH = Path(__file__).parents[1] / 'example' / 'query_orion.py'
SPEC = importlib.util.spec_from_file_location('query_orion', EXAMPLE_PATH)
query_orion = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(query_orion)


class TestOrionQuery(unittest.TestCase):
    def test_uses_public_orion_dataset(self):
        self.assertEqual(query_orion.SERVER_URL, 'https://play.reduct.store/replica')
        self.assertEqual(query_orion.API_TOKEN, 'reductstore')
        self.assertEqual(query_orion.BUCKET_NAME, 'orion')
        self.assertEqual(query_orion.ENTRY_NAME, 'right_ir/rotated/image_raw')

    def test_queries_previous_hour(self):
        now = datetime(2026, 8, 3, 12, 30, tzinfo=timezone.utc)

        start, stop, _ = query_orion.last_hour_query(now)

        self.assertEqual(start, now - timedelta(hours=1))
        self.assertEqual(stop, now)

    def test_filters_gps_z_between_exclusive_bounds(self):
        _, _, condition = query_orion.last_hour_query()

        self.assertEqual(
            condition,
            {
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
            },
        )

    def test_decodes_and_saves_jpeg(self):
        jpeg = b'\xff\xd8example-jpeg\xff\xd9'
        message = [
            {
                'height': 480,
                'width': 640,
                'data': base64.b64encode(jpeg).decode('ascii'),
            }
        ]

        with TemporaryDirectory() as directory:
            output_path = Path(directory) / 'image.jpg'

            image_info = query_orion.save_jpeg(message, output_path)

            self.assertEqual(output_path.read_bytes(), jpeg)
            self.assertEqual(image_info, {'height': 480, 'width': 640})


if __name__ == '__main__':
    unittest.main()
