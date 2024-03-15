---
title: "Optimal Image Storage Solutions for ROS-Based Computer Vision"
description: "This blog post will guide you through setting up ROS 2 with ReductStore—a time-series database optimized for unstructured data. More specifically, we'll go through a practical example to show how to capture and store raw camera images from a ROS topic in ReductStore."
authors: anthony
tags: [tutorials, ros, computer-vision]
slug: tutorials/ros/optimal-image-storage-solutions-for-ros-based-computer-vision
date: 2024-03-15
image: ./img/ros-reductstore-example.webp
---

![ROS with ReductStore](./img/ros-reductstore-example.webp)

The Robot Operating System (ROS) stands as a versatile framework for developing sophisticated robotic applications with various sensors, including cameras. These cameras are relatively inexpensive and widely used as they can provide a wealth of information about the robot's environment.

Processing camera output with computer vision requires efficient solutions to handle massive amounts of data in real time. ROS 2 is designed with this in mind, but it is a communication middleware and does not provide a built-in solution for storing and managing large volumes of image data.

Addressing this challenge, this blog post will guide you through setting up ROS 2 with ReductStore—a time-series database for unstructured data optimized for edge computing, ensuring your robotic applications can process and store camera outputs effectively.

<!--truncate-->

## ROS 2 Distributions
To install ROS 2, you'll need to select a distribution that aligns with your project requirements and system compatibility. As of now, multiple distributions are available for ROS 2 [**here**](<https://docs.ros.org/en/foxy/Releases.html>). 

Among them, two distributions are currently actively maintained :

- **Iron Irwini** (Release date: May 23rd, 2023; End of life: November 2024)

- **Humble Hawksbill** (Release date: May 23rd, 2022; End of life: May 2027)


<!-- -->

We recommend the "Humble Hawksbill" distribution for its long-term support until May 2027. This is the eighth release of ROS 2 and caters to various platforms including Ubuntu Linux, Windows, RHEL (Red Hat Enterprise Linux), or macOS.

To install the Humble Hawksbill distribution on your preferred operating system, follow the instructions provided in their [**installation guide**](<https://docs.ros.org/en/humble/Installation.html>). The installation process involves a series of commands specific to each platform and may require certain prerequisites like Python or C++ dependencies depending on your OS.

## Understanding the Advantages of Using ReductStore with ROS
Integrating ReductStore with ROS provides many benefits for robotic applications.

- **Best performance**: ReductStore's time-series design is tailored to the sequential nature of robotic applications and optimized for unstructured data, such as images, audio, and sensor readings.

- **Real-time data management**: ReductStore provides real-time First In First Out (FIFO) quota management, which is critical for maintaining a balance between storage space and continuous data flow on edge devices.

- **Metadata association**: It supports the association of labels or AI-generated analytics results directly with each stored image, enriching the dataset and facilitating subsequent processing or machine learning tasks.

- **Replication**: ReductStore offers the ability to replicate data across a distributed network based on user-defined filters, to copy important data to a central server or cloud storage for further analysis.


<!-- -->

## Example to Capture and Store Raw Camera Images
To capture and store raw camera images in a ROS-based system, you need to create a node that subscribes to the image topic, processes the image, and stores it in ReductStore.

You can use the [**reduct-ros-example**](<https://github.com/reductstore/reduct-ros-example>) as a guideline. This example demonstrates how to subscribe to a ROS topic, such as "/image\_raw", serialize the message in binary format, and store it in a bucket called "ros-bucket" under the entry "image".

### Setting Up Your Node: Integrating ReductStore with a ROS Client Instance
To set up your node for integrating ReductStore with a ROS client instance, you will need to create a custom ROS 2 Node that listens to image messages and uses ReductStore client for data storage.

Below is an example demonstrating this integration within a Python class:

```python
import asyncio
from reduct import Client, Bucket
from sensor_msgs.msg import Image
from rclpy.node import Node

class ImageListener(Node):
    """Node for listening to image messages and storing them in ReductStore."""
    def __init__(self, reduct_client: Client, loop: asyncio.AbstractEventLoop) -> None:
        """
        Initialize the image listener node.

        :param reduct_client: Client instance for interacting with ReductStore.
        :param loop: The asyncio event loop.
        """
        super().__init__("image_listener")
        self.reduct_client: Client = reduct_client
        self.loop: asyncio.AbstractEventLoop = loop
        self.bucket: Bucket = None
        self.subscription = self.create_subscription(
            Image, "/image_raw", self.image_callback, 10
        )
```

In this example `ImageListener` is a subclass of `Node`, which is part of ROS 2's client library (`rclpy`). It sets up a subscription to listen for incoming images from the `/image_raw` topic. When an image message is received by the node via `self.subscription`, it triggers `image_callback`.

In this callback function, each received frame is stored in the designated bucket in ReductStore using Python's built-in `asyncio` module, more on this later.

### Initialize a New ReductStore Bucket
This process involves setting up configuration parameters such as the bucket name and its storage quota settings.

In our example, we create a bucket named "ros-bucket" with a FIFO quota type, which is suitable for making sure that the disk doesn't run out of space.

The `exist_ok` parameter ensures that if the bucket already exists, it won't raise an exception but rather reuse the existing one.

Here's how you can define this initialization within our Python class:

```python
from reduct_py import BucketSettings, QuotaType

class ImageListener(Node):
    # ... [other parts of ImageListener class] ...

    async def init_bucket(self) -> None:
        """Asynchronously initialize the Reduct bucket for storing images."""
        self.get_logger().info("Initializing Reduct bucket")
        self.bucket = await self.reduct_client.create_bucket(
            "ros-bucket",
            BucketSettings(quota_type=QuotaType.FIFO, quota_size=1_000_000_000),
            exist_ok=True,
        )
```

This code snippet should be called within your existing `ImageListener` class during the node's initialization or before storing the first image. This ensures that the storage bucket is ready.

### Handling Images in Callbacks
When an image message from a ROS topic is received, it triggers the `image_callback` method. This method's role is to serialize the image data and organize its storage without blocking the main thread.

Serialization converts the ROS message format into a simpler binary representation that can be stored or transmitted more easily.

Here's an example code snippet demonstrating how to handle images in callbacks for storing them in ReductStore:

```python
class ImageListener(Node):
    # ... [previous parts of ImageListener class] ...

    @staticmethod
    def get_timestamp(msg: Image) -> int:
        """
        Extract the timestamp from a ROS message.

        :param msg: The ROS message.
        :return: The timestamp in microseconds.
        """
        return int(msg.header.stamp.sec * 1e6 + msg.header.stamp.nanosec / 1e3)
    
    @staticmethod
    def serialize_message(msg: Image) -> bytes:
        """
        Serialize a ROS message to bytes.

        :param msg: The ROS message.
        :return: The serialized message.
        """
        return bytes(msg.data)

    def image_callback(self, msg: Image) -> None:
        """
        Handle incoming image messages by scheduling storage.

        This callback is triggered by ROS message processing. It schedules
        the image storage coroutine to be executed in the asyncio event loop.
        """
        self.get_logger().info(f'Received image, storing to database')
        timestamp = self.get_timestamp(msg)
        binary_data = self.serialize_message(msg)
        asyncio.run_coroutine_threadsafe(self.store_data(timestamp, binary_data), self.loop)
```

In this context, `serialize_message` is used to convert the `Image` message object into a byte stream that can subsequently be passed along for storage.

Following serialization, an asynchronous coroutine (`store_data`) is scheduled on the event loop (`self.loop`) using `asyncio.run_coroutine_threadsafe`.

This function is particularly useful for integrating asynchronous operations within primarily synchronous ROS 2 callback handlers, ensuring that the processing doesn't block the executor.

### Store Images in a ReductStore Bucket Entry
The `store_data` method is designed to receive timestamped image data and write it into a specific Reduct bucket. 

Here's an explanation of how this method works:

- **Timestamp Parameter**: The `timestamp` argument ensures that each piece of data can be associated with the exact time it was captured.

- **Data Serialization**: The `data` parameter expects a byte stream, which implies that image messages from ROS need to be serialized before being passed to this function.


<!-- -->

With these considerations in mind, here's how you can define the `store_data` method within the `ImageListener` class:

```python
class ImageListener(Node):
    # ... [previous parts of ImageListener class] ...

    @staticmethod
    def display_timestamp(timestamp: int) -> str:
        """
        Format a timestamp for human-readable display.

        :param timestamp: The timestamp in microseconds.
        :return: The formatted timestamp string.
        """
        return datetime.fromtimestamp(timestamp / 1e6).isoformat()

    async def store_data(self, timestamp: int, data: bytes) -> None:
        """
        Store unstructured data in the Reduct bucket.

        :param timestamp: The timestamp for the data.
        :param data: The serialized data.
        """
        if not self.bucket:
            await self.init_bucket()

        self.get_logger().info(f"Storing data at {self.display_timestamp(timestamp)}")
        await self.bucket.write("image", data, timestamp)
```

When the `store_data` method is called, it first checks if the bucket has been initialized. If not, it calls the `init_bucket` method to create the bucket. Then, it writes the serialized data to the bucket entry "image" with the provided timestamp. 

As you can see, the `store_data` method is designed to be non-blocking, ensuring that the main thread can continue processing other tasks without waiting for the data to be stored.

<!-- -->

## Testing the Image Storage System

To test the image storage system, you can run the ROS 2 node and publish image messages to the `/image_raw` topic. You can use the `usb_cam` package to capture images from a USB camera and publish them to the `/image_raw` topic. 

To install the `usb_cam` package, you can use the following command:

```bash
sudo apt-get install ros-<ros2-distro>-usb-cam
```

Replace `<ros2-distro>` with the ROS 2 distribution you are using, such as `humble` or `iron`. 

Our custom ROS 2 node directly stores the binary data from the `Image` message to ReductStore. This means that we can control the format of the images we store by configuring the `usb_cam` package to publish images in the desired format.

MotionJPEG (MJPEG) is a common format for video compression and is often used for video streaming. If your camera supports MJPEG, you can set the `pixel_format` parameter to `raw_mjpeg` to publish JPEG images.

Here's an example of how to do this with a config file `usb_cam_params.yaml`:

```yaml
usb_cam:
  ros__parameters:
    video_device: "/dev/video0"
    image_width: 640
    image_height: 480
    pixel_format: "raw_mjpeg"
```

After configuring the `usb_cam` package, you can run the `usb_cam` node to start capturing images and publishing them to the `/image_raw` topic.

```bash
ros2 run usb_cam usb_cam_node_exe --ros-args --params-file ./usb_cam_params.yaml
```

Once the `usb_cam` node is running, you can start the custom ROS 2 node that listens to the `/image_raw` topic and stores the images in ReductStore.

```bash
ros2 run reduct_camera capture_and_store
```

The `capture_and_store` node will start listening to the `/image_raw` topic and store the images in ReductStore as they are received.


### Use ReductStore CLI to Inspect Stored Images

First of all, you need to install the ReductStore CLI. You can find the installation instructions [**here**](<https://cli.reduct.store/en/latest/>) and create an alias for the URL of your ReductStore instance.

Once you have the ReductStore CLI installed, you can create an alias for the URL of your ReductStore instance using the `rcli alias add` command. For example:

```bash
rcli alias add -L  https://play.reduct.store play
```

You can then use the `rcli` command to inspect the stored images. For instance, to export the image data from the `ros-bucket` bucket to a local directory, you can use the following command:

```bash
rcli export folder --ext jpeg play/ros-bucket ./exported-data
```

This command exports all the image data from the `ros-bucket` bucket to the `./exported-data` with the JPEG file extension.

## Best Practices

When integrating ReductStore with ROS-based computer vision applications, consider the following best practices:

- Create a ReductStore bucket with a **[FIFO](https://www.reduct.store/docs/how-does-it-work#bucket)** quota to prevent disk overwriting in the future.
- Use token authentication to protect your data. You can generate an access token using either the **[Web Console](https://github.com/reductstore/web-console)** or the **[CLI client](https://cli.reduct.store/)**.
- Use **[ReductCLI](http://cli.reduct.store/)** for data replication or backup purposes.

## Conclusion
In conclusion, this blog post has demonstrated how to capture and store raw camera images from a ROS topic in ReductStore. The provided code snippets serve as a practical guide for setting up such a system, highlighting the importance of non-blocking operations and proper serialization to maintain system performance.

Using [**ReductStore**](<https://reduct.store/>) is straightforward to deploy and provides a robust solution for managing large volumes of image data in real time. The FIFO quota management, metadata association, and replication features make it an ideal choice for managing unstructured data in ROS-based computer vision applications.

---

I hope this tutorial has been helpful. If you have any questions or feedback, don’t hesitate to reach out in [**Discord**](https://discord.gg/8wPtPGJYsn) or by opening a discussion on [**GitHub**](https://github.com/reductstore/reductstore/discussions).