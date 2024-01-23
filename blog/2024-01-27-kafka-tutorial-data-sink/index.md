---
title: "How To Use Reductstore As A Data Sink For Kafka"
description: Discover how to use ReductStore as a data sink for Kafka. This guide covers the basics of setting up ReductStore to store and manage data from Kafka streams, providing a straightforward approach for efficiently storing binary data and its metadata, including labels, in a time series database.
authors: anthony
tags: [Tutorial, DataStreaming, Kafka]
slug: tutorial/datastreaming/kafka/data-sink-guide
date: 2024-01-27
image: ./img/kafka-reductstore-social.jpg
---

![Kafka Data Sink](./img/kafka-reductstore.webp)
<small>Kafka stream saved in ReductStore database</small>

In this guide, we will explore the process of storing Kafka messages that contain blob data into a time series database.

[**Apache Kafka**](<https://kafka.apache.org/>) is a distributed streaming platform capable of handling high throughput of data, while time series databases are optimized for storing and querying data that changes over time.

In the context of blob data, which can include binary large objects like images, video streams, or sensor data, a time series database like [**ReductStore**](<https://reduct.store/>) becomes particularly valuable.

It allows to easily setup a data sink to store blob data for applications that need precise time-based querying or a robust system optimized of edge computing.

This guide builds upon an existing tutorial which provides detailed steps for integrating a simple architecture with these systems and getting started.

Revisit "[**Easy Guide to Integrating Kafka: Practical Solutions for Managing Blob Data**](<https://www.reduct.store/blog/tutorial/datastreaming/kafka/easy-kafka-reductstore-integration-guide>)" if you need help setting up the initial infrastructure.

There is also a [**GitHub repository**](<https://github.com/reductstore/reduct-kafka-example>) that contains the code for this tutorial within the `kafka_to_reduct` demo.

<!--truncate-->

**Table of Contents**

- [Initializing Clients in Python for Kafka and ReductStore](#initializing-clients-in-python-for-kafka-and-reductstore)
    - [Configuring Kafka Producer and Admin Clients](#configuring-kafka-producer-and-admin-clients)
    - [Configuring Kafka Consumer and ReductStore Clients](#configuring-kafka-consumer-and-reductstore-clients)
- [Streaming Blob Data to Kafka and Storing in ReductStore](#streaming-blob-data-to-kafka-and-storing-in-reductstore)
    - [Publishing Binary Data with Kafka Producer Class](#publishing-binary-data-with-kafka-producer-class)
    - [Consuming Messages from Kafka and Persisting to ReductStore](#consuming-messages-from-kafka-and-persisting-to-reductstore)
- [Conclusion](#conclusion)


## Initializing Clients in Python for Kafka and ReductStore

### Configuring Kafka Producer and Admin Clients
To establish the foundation for streaming blob data from Kafka to a time series database, we must first initialize and configure our Kafka producer and admin clients in Python.

The `confluent_kafka` Python package provides us with the necessary classes to interact with Kafka.

Below is an example of how to configure both the Producer and AdminClient objects:

```python
from confluent_kafka import Producer
from confluent_kafka.admin import AdminClient

kafka_conf = {
    "bootstrap.servers": "localhost:9092",
}

kafka_producer = Producer(kafka_conf)
kafka_admin_client = AdminClient(kafka_conf)
```

These configurations instantiate a Producer and an AdminClient with the minimal required setting: the address of the Kafka bootstrap servers.

This setting is crucial as it allows the clients to discover all nodes in the Kafka cluster.

### Configuring Kafka Consumer and ReductStore Clients
We can also use `confluent_kafka` Python package to setup Kafka Consumer client, we need the `reduct` Package to use [ReductStore's Python Client](<https://py.reduct.store/en/latest/>).

Here's how to configure both clients:

```python
from confluent_kafka import Consumer
from reduct import Client

kafka_conf = {
    "bootstrap.servers": "localhost:9092",
    "group.id": "datasink_demo",
    "auto.offset.reset": "earliest",
}

reduct_client = Client("http://127.0.0.1:8383")
kafka_consumer = Consumer(kafka_conf)
```

This configuration prepares the Kafka Consumer to connect to the cluster and start consuming messages from the earliest offset. It specifies a group ID that identifies the consumer group for coordination.

Regarding ReductStore, the Client connects using the provided URL and is now ready to write data into a bucket.

## Streaming Blob Data to Kafka and Storing in ReductStore


### Publishing Binary Data with Kafka Producer Class
To send binary data with Kafka in Python, use the Confluent Kafka Producer. Here's how:

```python
import asyncio
import os
import random
from confluent_kafka import Producer

def generate_random_data(size_in_kb=1):
    return os.urandom(size_in_kb * 1024)


def callback(err, msg):
    if err is not None:
        print(f"Failed to deliver message to {msg.topic()}")
    else:
        print(f"Message {msg.topic()} sent to partition {msg.partition()}")


async def produce_binary_data(topic_name, num_messages=10):
    for _ in range(num_messages):
        data = generate_random_data(size_in_kb=random.randint(1, 900))
        metadata = {"size": str(len(data)), "type": "binary"}
        headers = [(key, value.encode("utf-8")) for key, value in metadata.items()]
        kafka_producer.produce(
            topic_name, value=data, headers=headers, callback=callback
        )
        kafka_producer.poll(0)
        await asyncio.sleep(1)
    kafka_producer.flush()
```

The above Python code sets up an asynchronous function that generates and publishes binary data to a Kafka topic.

The `generate_random_data` function creates a byte string with random bytes, simulating binary data such as images or sensor outputs.

The size of this data is variable, ranging from 1KB to 900KB. The reason of such size is that Kafka has a maximum message size of 1MB (headers included).

The `kafka_producer.poll(0)`call is a non-blocking call (when used with 0 second timeout) and is used to trigger the callback execution which can be used to acknowledge the message delivery to a Kafka broker.

From this callback, we can retrieve information, such as the specific partition to which a message has been sent.

### Consuming Messages from Kafka and Persisting to ReductStore
When integrating Kafka and ReductStore for robust data handling, it's imperative to craft a reliable mechanism for real-time consumption and persistence of messages. A Python coroutine, `consume_and_store`, adeptly demonstrates this process.

```python
async def consume_and_store(topic_name, bucket_name):
    try:
        bucket: Bucket = await reduct_client.create_bucket(bucket_name, exist_ok=True)

        kafka_consumer.subscribe([topic_name])
        while True:
            # Polling for messages from Kafka with async support
            msg = kafka_consumer.poll(0)
            if msg is None:
                await asyncio.sleep(1)
                continue
            if msg.error():
                if msg.error().code() == KafkaException._PARTITION_EOF:
                    continue
                else:
                    print(msg.error())
                    break

            # Extracting the metadata and data from the message
            headers = (
                {k: v.decode("utf-8") for k, v in msg.headers()}
                if msg.headers()
                else {}
            )
            data = msg.value()

            # Writing data to ReductStore asynchronously
            await bucket.write(topic_name, data, labels=headers)
            print(
                f"Stored binary data of size {len(data)} bytes with headers: {headers}"
            )
    finally:
        kafka_consumer.close()
```

The consumer subscribes to the specified Kafka topic, entering an endless loop that awaits new messages. Utilizing the `poll` function without timeouts allows for non-blocking message retrieval from Kafka, which is essential for maintaining an efficient event-driven architecture.

When a message is fetched successfully without errors, its headers can be decoded and paired with its binary payload.

Subsequently, this composite data structure is written asynchronously into ReductStore using the bucket's `write` method:

- The kafka headers information or any specific labels coming along with binary data can be stored in `labels`

- The binary data can be written in a bucket under a certain entry. In our case, we used the `topic_name` as the entry name for the bucket


<!-- -->

In summary, this code snippet provides a blueprint for connecting Kafka streams with a data sink that can accept labels and binary data with time-based querying capabilities.

## Conclusion
In conclusion, the integration of Kafka with ReductStore streamlines the process of managing large volumes and varieties of binary data. This setup is beneficial for applications that necessitate real-time processing and storage, such as those in edge computing environments.

ReductStore's capacity to handle blob data with time-series precision further enhances its utility for IoT and computer vision scenarios where temporal context and FIFO quota management are critical.

If you have questions about this post or want to learn more about ReductStore, please feel free to join our [**Discord**](<https://discord.com/channels/939475547065561088/1154679443407785984>) community and reach out for assistance.