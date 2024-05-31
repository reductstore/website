---
title: "Benchmark against MinIO and InfluxDB"
description: The article presents the result of benchmrking ReductStore vs. MinIO and InfluxDB on an edge device.
authors: anthony
tags: [comparison, iot]
slug: comparison/iot/reductstore-benchmark
date: 2023-09-13
image: ./img/social-card.jpg
---

Benchmarks don't lie, let's put the systems to the ultimate test.

![Diagram of ReductStore vs MinIO and InfluxDB benchmark on Edge Device HX401](./img/reductstore-benchmark.webp "Diagram of ReductStore vs MinIO and InfluxDB benchmark on Edge Device HX401")<small>ReductStore vs. MinIO & InfluxDB on Edge Device HX401</small>

For anyone deeply immersed in the engineering world of Edge Computing, Computer Vision, or IoT, you'll want to read further to understand why a time series database for blob data is needed and where it stands out.

Enter our contest: First, we have [**ReductStore**](https://www.reduct.store)—a time series database for blob data—specifically designed for edge devices. 

Its counterpart? The duo of [**MinIO**](https://min.io) and [**InfluxDB**](https://www.influxdata.com), each optimized for their niche in blob storage and time-series data respectively. 

In a head-to-head comparison, which system really leads in performance and wins the speed race?

Let's roll up our sleeves and deep-dive into this benchmarking analysis to separate fact from fiction.

<!--truncate-->

## Benchmarking Setup

In the world of IoT, while we usually see data being written piece by piece, following a time-series pattern, but it's a different story when we transfer it to the cloud. Here, we're reading data in big batches, especially when we're talking about performing data backups, running large-scale analytics, or feeding machine learning models.

Hence, the focus for this benchmark is to understand batch read performance over an LTE network. We track the read times of precisely 1,000 blobs, striking a balance between large-scale operations and fine-grained performance metrics. 

The blob size is not static; it varies from a small 1KiB to a larger 1MiB. This variation allows us to observe how system performance adjusts with fluctuating data sizes, an essential aspect given the dynamic nature of real-world data. 

And, of course, we kept an eye on the clock. For each batch read of the 1,000 blobs, our stopwatch was on, capturing the efficiency with which each system accessed and retrieved the data.

For more details and code, you can visit our **[**Benchmark GitHub Repository**](https://github.com/reductstore/benchmark)**.

To get a better idea of the environment, let's take a look at the system architectures shown in the figure below.

![Block Diagram of the Benchmarking Setup](./img/benchmark-network.webp "Block Diagram of the Benchmarking Setup")
<small>Block Diagram of the Benchmarking Setup</small>

Both systems are installed on an edge device, Helix 401 (HX401), typically used for data acquisition in an industrial environment. The computer conducting the benchmark retrieves data from the edge device via a network overseen by ZeroTier with a maximum speed of 100Mbps.

ZeroTier provides a virtual network which ensures that the data transfer between the Helix 401 and the computer that runs the benchmark is secure. Given the critical nature of industrial data, setups like this are quite common. 

Building on this secure foundation, when the benchmarking process is initiated, the designated computer taps into the stored data on the HX401, simulating real-world data retrieval scenarios.

With the stage set and our compass pointing north, let’s delve deeper into the results.

## Result

As my professors often said, "A picture is worth a thousand words." With that in mind, let's dive into our graphs.

The bar plots compare batch read times for 1,000 blobs. Specifically, one graph shows the times for blob sizes under 32KiB, while another highlights those for blob sizes starting from and exceeding 64KiB.

If the error bars on the graph have caught your attention, allow me to clarify: We ran the experiment several times. The central value represents the average read time across all runs, and the error bar indicates the inter-quartile range, capturing the span between the 25th and 75th percentiles of our experiments.


![Read Time vs Blob Size for Batches of 1000 Blobs under 32 KiB](./img/batch-read-time-small.webp "Read Time vs Blob Size for Batches of 1000 Blobs under 32 KiB")

![Read Time vs Blob Size for Batches of 1000 Blobs above 32 KiB](./img/batch-read-time-large.webp "Read Time vs Blob Size for Batches of 1000 Blobs above 32 KiB")

The optimization of ReductStore for smaller objects certainly plays a part in its standout performance. Nevertheless, it's worth mentioning that for larger blobs, network constraints emerge as the primary bottleneck. In our case, the benchmark was run over a network with a maximum speed of 100Mbps, and you would get an even larger performance gap with a faster network.


## Real-World Implications

### Batching

ReductStore allows multiple records to be read in one request, improving latency for transactions involving numerous records. The system automatically sorts these records by time and sends them as a single concatenated blob.

One thing to note is that the benefits of reduced overhead from batching become less significant when dealing with larger blobs. The actual data transmission time for these large blobs naturally becomes the more substantial part of the operation, overshadowing any gains made by reducing the initial overhead of setting up individual operations.

### Retention Policy

When storage approaches its maximum capacity, it becomes crucial to ensure effective and efficient retention policy. When a device is running out of disk, it's advisable to apply a first-in-first-out (FIFO) policy. 

Essentially, this means that older data is replaced by newer data. However, care must be taken to safeguard essential data. Another pragmatic approach would be to prioritize data on the basis of specific labels or metadata, to ensure that critical information remains intact while making room for new entries.

### Maintaining Multiple Databases

Maintaining consistency between multiple databases, like MinIO and InfluxDB, adds a layer of complexity. In our setup, MinIO, used for blob storage, is linked to data points in InfluxDB via its filename. Any inconsistencies or mismatches between the two could potentially result in data loss. Furthermore, we need to query both databases, which is quite inefficient. Lastly, their tight interdependence implies that a problem in one database can indirectly impact the other, potentially compromising the system's reliability.

## Conclusion

In the constantly evolving landscape of Edge Computing, selecting the right database can serve as a cornerstone for success. Our benchmarking analysis comparing ReductStore with the pairing of MinIO and InfluxDB specifically on batched read times shines a light on this reality.

ReductStore clearly stands out for its speed and time series nature. The absence of a limit for the maximum size of a blob ensures that as data scales, the database remains robust and adaptive. This is further complemented by its real-time FIFO bucket quota based on size, acting as a safety net against disk space shortages—a crucial feature in the demanding environment of edge devices.

Traditional time-series databases, typically come with a size restriction, maxing out at 64kB for InfluxDB. While they excel in handling numbers, they often falter when tasked with processing larger chunks of data. S3-like storage systems, such as MinIO, might initially seem like a viable alternative, but the intricacies of extracting data based on specific time frames render them less ideal.

In conclusion, ReductStore not only shines bright in our benchmarking tests but also comes fortified with a feature set tailored for IoT, computer vision, and edge devices.