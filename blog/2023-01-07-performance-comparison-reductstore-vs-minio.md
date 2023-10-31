---
title: "Performance comparison: ReductStore vs. Minio"
description: Benchmarking ReductStore and Minio to compare their performance for writing and reading blob data with different sizes in time series manner.
authors: alexey
tags: [comparisons, computer-vision, iot]
slug: comparisons/computer-vision/iot/performance-comparison-reductstore-vs-minio
date: 2023-01-07
---


We often use blob storage like S3, if we need to store data of different formats and sizes somewhere in the cloud or in
our internal storage. [Minio][2] is an S3 compatible storage which you can run on your private cloud, bare-metal server
or even on an edge device. You can also adapt it to keep historical data as a time series of blobs. The most
straightforward solution would be to create a folder for each data source and save objects with timestamps in their
names:

```
bucket
 |
 |---cv_camera
        |---1666225094312397.bin
        |---1666225094412397.bin
        |---1666225094512397.bin
```

<!--truncate-->

If you need to query data, you should request a list of objects in the `cv_camera` folder and filter them by name
according to the given time interval.
This approach is simple to implement, but it has some disadvantages:

- the more objects the folder has, the longer the querying takes.
- big overhead for small objects: timestamps as strings and minimum file size is 1Kb or 512 due to the block size of the
  file system.
- FIFO quota, to remove old data when we reach a certain limit, may not work for intensive write operations.

[ReductStore][1] aims to solve these issues. It has a strong FIFO quota, an HTTP API for querying data via time
intervals, and it composes objects (or records) into blocks for efficient disk usage and search.

[Minio][2] and [ReductStore][1] have Python SDKs, so we can use them to implement read and write operations and compare
the performance.

## Read/Write Data With Minio

For benchmarks, we create two functions to write and read `CHUNK_COUNT` chunks:

```python
from minio import Minio
import time

minio_client = Minio("127.0.0.1:9000", access_key="minioadmin", secret_key="minioadmin", secure=False)


def write_to_minio():
    count = 0
    for i in range(CHUNK_COUNT):
        count += CHUNK_SIZE
        object_name = f"data/{str(int(time.time_ns() / 1000))}.bin"
        minio_client.put_object(BUCKET_NAME, object_name, io.BytesIO(CHUNK),
                                CHUNK_SIZE)
    return count  # count data to print it in main function


def read_from_minio(t1, t2):
    count = 0

    t1 = str(int(t1 * 1000_000))
    t2 = str(int(t2 * 1000_000))

    for obj in minio_client.list_objects("test", prefix="data/"):
        if t1 <= obj.object_name[5:-4] <= t2:
            resp = minio_client.get_object("test", obj.object_name)
            count += len(resp.read())

    return count
```

You can see that `minio_client` doesn't provide any API query data with patterns, so we have to browse the whole folder
on the client side to find the needed object. If you have billions of objects, it stops working. You have to store
object paths in some time series database or create a hierarchy of folders, e.g., create one new folder per day.

## Read/Write Data With ReductStore

With [ReductStore][1] this is a much easier:

```python
from reduct import Client as ReductClient

reduct_client = ReductClient("http://127.0.0.1:8383")


async def write_to_reduct():
    count = 0
    bucket = await reduct_client.create_bucket("test", exist_ok=True)
    for i in range(CHUNK_COUNT):
        await bucket.write("data", CHUNK)
        count += CHUNK_SIZE
    return count


async def read_from_reduct(t1, t2):
    count = 0
    bucket = await reduct_client.get_bucket("test")
    async for rec in bucket.query("data", int(t1 * 1000000), int(t2 * 1000000)):
        count += len(await rec.read_all())
    return count
```

## Benchmarks

When we have the write/read functions, we can finally write our benchmarks:

```python
import io
import random
import time
import asyncio

from minio import Minio
from reduct import Client as ReductClient

CHUNK_SIZE = 100000
CHUNK_COUNT = 10000
BUCKET_NAME = "test"

CHUNK = random.randbytes(CHUNK_SIZE)

minio_client = Minio("127.0.0.1:9000", access_key="minioadmin", secret_key="minioadmin", secure=False)
reduct_client = ReductClient("http://127.0.0.1:8383")

# Our function were here..

if __name__ == "__main__":
    print(f"Chunk size={CHUNK_SIZE / 1000_000} Mb, count={CHUNK_COUNT}")
    ts = time.time()
    size = write_to_minio()
    print(f"Write {size / 1000_000} Mb to Minio: {time.time() - ts} s")

    ts_read = time.time()
    size = read_from_minio(ts, time.time())
    print(f"Read {size / 1000_000} Mb from Minio: {time.time() - ts_read} s")

    loop = asyncio.new_event_loop();
    ts = time.time()
    size = loop.run_until_complete(write_to_reduct())
    print(f"Write {size / 1000_000} Mb to ReductStore: {time.time() - ts} s")

    ts_read = time.time()
    size = loop.run_until_complete(read_from_reduct(ts, time.time()))
    print(f"Read {size / 1000_000} Mb from ReductStore: {time.time() - ts_read} s")

```

For testing, we need to run the databases. It is easy to do with docker-compose:

```yml
services:
  reduct-storage:
    image: reductstorage/engine:v1.0.1
    volumes:
      - ./reduct-data:/data
    ports:
      - 8383:8383

  minio:
    image: minio/minio
    volumes:
      - ./minio-data:/data
    command: minio server /data --console-address :9002
    ports:
      - 9000:9000
      - 9002:9002
```

Run the docker compose configuration and the benchmarks:

```shell
docker-compose up -d
python3 main.py
```

## Results

The script print the results for given CHUNK_SIZE and `CHUNK_COUNT`. On my device, I got the following numbers:

| Chunk                  | Operation | Minio   | ReductStore |
|------------------------|-----------|---------|-------------|
| 10.0 Mb (100 requests) | Write     | 8.69 s  | 0.53 s      | 
|                        | Read      | 1.19 s  | 0.57 s      |   
| 1.0 Mb (1000 requests) | Write     | 12.66 s | 1.30 s      | 
|                        | Read      | 2.04 s  | 1.38 s      |   
| .1 Mb (10000 requests) | Write     | 61.86 s | 13.73 s     | 
|                        | Read      | 9.39 s  | 15.02 s     |   

As you can see, [ReductStore][1] is always faster for write operations (16 times faster for 10 Mb blobs!!!) and a bit
slower for reading when we have many small objects. You may notice that the speed decreases for both databases when we
reduce the size of the chunks. This can be explained with HTTP overhead because we spend a dedicated HTTP request for
each write or read operation.

## Conclusions

[ReductStore][1] could be a good option for applications where you need to store blobs historically with timestamps and
write data continuously. It has a strong FIFO quota to avoid problems with disk space, and it is very fast for intensive
write operations.

## References:

* [ReductStore][1]
* [Minio][2]
* [ReductStore Client SDK for Python](https://github.com/reductstore/reduct-py)
* [Full Example on GitHub](https://github.com/reductstore/reduct-vs-minio)

[1]:https://wwww.reduct.store/

[2]:https://min.io
