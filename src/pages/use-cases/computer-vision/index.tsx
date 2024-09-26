import React from "react";
import SimpleHeader from "@site/src/components/SimpleHeader";
import Layout from "@theme/Layout";
import styles from "./styles.module.css";
import UseCaseRow from "@site/src/components/UseCaseRow";
import Faq from "@site/src/components/Faq";
import Link from "@docusaurus/Link";
import FreePoCBanner from "@site/src/components/FreePoCBanner";
import FreePoCForm from "@site/src/components/FreePoCForm";

export default function UseCaseComputerVision(): JSX.Element {
  return (
    <Layout
      title="High Performance Time Series Object Storage for Computer Vision"
      description="Fast storage and retrieval for high-speed image and video data on edge devices and in the cloud."
    >
      <FreePoCBanner elementId="free-poc-form" />
      <main>
        <SimpleHeader
          pageTitle="High Performance Time Series Object Storage for Computer Vision"
          subtitle="Fast storage and retrieval for high-speed image and video data on edge devices and in the cloud"
        />
        <div className="container">
          <>
            {useCases.map((useCase) => (
              <UseCaseRow
                key={useCase.title}
                title={useCase.title}
                description={useCase.description}
                illustration={useCase.illustration}
                isImageLeft={useCase.isImageLeft}
              />
            ))}
          </>
          <div className={styles.form}>
            <FreePoCForm elementId="free-poc-form" />
          </div>
          <div className={styles.faqs}>
            <Faq faqs={useCasesFaqs} defaultOpenCount={3} />
          </div>
        </div>
      </main>
    </Layout>
  );
}

const useCases = [
  {
    title: "The Fastest Time Series Object Store",
    description: (
      <p>
        Comparative performance tests show that ReductStore has a clear
        advantage in handling image and video data, consistently{" "}
        <Link to="/blog/comparisons/computer-vision/iot/performance-comparison-reductstore-vs-minio">
          <b>outperforming Minio</b>
        </Link>{" "}
        in both reads and writes across a range of file sizes. Thanks to its
        optimized architecture, ReductStore is also{" "}
        <Link to="/blog/comparisons/iot/reductstore-vs-mongodb">
          <b>faster than MongoDB for blobs</b>
        </Link>
        , with performance improvements ranging from 65% to 244%. It also{" "}
        <Link to="/blog/comparisons/iot/reductstore-vs-timescaledb">
          <b>outperforms TimescaleDB for blobs larger than 100KB</b>
        </Link>
        . This makes ReductStore a solid choice for high-speed image and video
        workloads where performance is critical.
      </p>
    ),
    illustration:
      require("@site/static/img/use-cases/ai-workflows/time-series-database-for-unstructured-data.webp")
        .default,
    isImageLeft: false,
  },
  {
    title: "Time Series Storage for High-FPS Image and Video Data",
    description: (
      <p>
        ReductStore's architecture is specifically designed for high FPS
        computer vision applications that generate large amounts of unstructured
        data such as images and video. For example, in scenarios where multiple
        cameras are processed by a single edge device, ReductStore can
        efficiently ingest, query, and manage each frame in a time series
        format, with each image or video frame associated with a timestamp. This
        gives computer vision models instant access to historical and real-time
        visual data, taking full advantage of disk speed for both read and write
        operations, making it ideal for high-throughput environments where
        performance is critical.
      </p>
    ),
    illustration:
      require("@site/static/img/use-cases/ai-workflows/real-time-fifo-quota.webp")
        .default,
    isImageLeft: true,
  },
  {
    title: "Store Images, Videos, and AI Models",
    description: (
      <p>
        ReductStore is designed to handle and manage large amounts of
        unstructured data, with no limits on the size or type of data you can
        store. It allows the creation of multiple buckets, making it easy to
        store images, videos, AI models, or any other type of data in one place.
        This flexibility makes ReductStore an ideal solution for managing
        diverse datasets, ensuring that computer vision models and associated
        data can be stored together for streamlined workflows and continuous
        tracking of model iterations.
      </p>
    ),
    illustration:
      require("@site/static/img/use-cases/ai-workflows/data-replication-with-label-filtering.webp")
        .default,
    isImageLeft: false,
  },
  {
    title: "Storing AI Labels and Metadata for Every Record",
    description: (
      <p>
        ReductStore can store metadata, including AI labels, for any image or
        video in its database. For example, in object recognition tasks, an
        image can be tagged with AI-generated labels that specify object
        categories within bounding boxes, segmentation masks, or other visual
        characteristics. This labeling enables efficient storage of AI model
        output, making it easier to access and analyze inference results. By
        integrating metadata directly into the storage layer, ReductStore
        simplifies the data pipeline architecture, streamlining the handling of
        AI-generated insights and improving overall operational efficiency.
      </p>
    ),
    illustration:
      require("@site/static/img/use-cases/ai-workflows/time-series-database-for-unstructured-data.webp")
        .default,
    isImageLeft: true,
  },
  {
    title: "Data Replication With Label Filtering",
    description: (
      <p>
        Label filtering in data replication processes acts as an effective
        reduction strategy by ensuring that only essential data is synchronized
        across storage buckets, whether in the cloud or at the edge. This method
        is particularly valuable for reducing storage and bandwidth consumption
        in distributed systems where resources are limited. By filtering data
        based on AI labels or classifications, replication is targeted to
        include only the most critical images or videos. As a result, this
        selective approach minimizes unnecessary storage and network traffic,
        ensuring that both cloud and edge environments contain only the most
        relevant operational data.
      </p>
    ),
    illustration:
      require("@site/static/img/use-cases/ai-workflows/store-records-and-ai-models.webp")
        .default,
    isImageLeft: false,
  },
  {
    title: "Real-Time FIFO Quota for Image and Video Streams",
    description: (
      <p>
        ReductStore's unique real-time FIFO (first-in, first-out) quotas based
        on data volume enable efficient management of high-throughput image and
        video streams. As new data is added, the system automatically removes
        the oldest data, ensuring continuous storage availability without manual
        intervention. This feature is particularly useful in scenarios such as
        surveillance, autonomous vehicles, and industrial monitoring, where
        large data streams can quickly fill storage. By focusing on volume
        rather than arbitrary time limits, ReductStore's FIFO quotas optimize
        storage utilization and keep systems running smoothly in high-speed data
        environments.
      </p>
    ),
    illustration:
      require("@site/static/img/use-cases/ai-workflows/ai-labels-and-metadata-for-every-record.webp")
        .default,
    isImageLeft: true,
  },
];

const useCasesFaqs = [
  {
    question:
      "What types of computer vision applications is ReductStore ideal for?",
    answer:
      "ReductStore is ideal for applications that deal with large volumes of unstructured visual data in temporal context. These include object recognition, video surveillance, autonomous driving, real-time image analysis, and any other computer vision task that requires efficient storage and retrieval of images and video.",
  },
  {
    question: "Can ReductStore be deployed on cloud and edge environments?",
    answer:
      "Yes, ReductStore supports deployment in both cloud and edge environments. It integrates with Azure using BlobFuse to minimize storage costs while providing scalability. This flexibility allows you to process data locally on edge devices or in the cloud, optimizing performance based on your needs.",
  },
  {
    question:
      "How does ReductStore handle querying large image and video datasets?",
    answer:
      "In ReductStore, queries act as iterators, ensuring efficient and consistent performance regardless of the number of records stored. This allows each image or video frame to be retrieved sequentially, maintaining stable query speeds as your dataset grows.",
  },
  {
    question:
      "What type of metadata can be assigned to images and videos in ReductStore?",
    answer:
      "ReductStore allows you to assign arbitrary key-value pairs as metadata to any image or video. This can include annotations such as labels, bounding boxes, segmentation masks, or any other descriptive information relevant to your computer vision tasks.",
  },
  {
    question:
      "Is ReductStore scalable for large-scale computer vision projects?",
    answer:
      "Yes, ReductStore is designed to scale as your data needs grow. It supports large image and video storage requirements without compromising performance, making it suitable for large-scale computer vision projects.",
  },
  {
    question:
      "What is the advantage of using ReductStore for time-series image and video data?",
    answer:
      "ReductStore provides optimized storage and retrieval mechanisms for time-series image and video data. It ensures fast access and efficient processing of temporal queries, which is essential for applications such as video analytics, surveillance, and any scenario where the timing of visual data is critical.",
  },
  {
    question:
      "What makes ReductStore suitable for handling high-throughput image and video streams?",
    answer:
      "ReductStore provides real-time FIFO quotas to effectively manage data retention in high-throughput environments. It also supports data replication with label filtering to reduce network traffic and uses HTTP batching to efficiently handle large numbers of image and video records.",
  },
];
