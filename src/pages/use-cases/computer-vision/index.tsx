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
      title="The Fastest Time Series Object Store for Computer Vision"
      description="Optimized storage and retrieval for high speed image and video data on edge AI devices and cloud infrastructure."
    >
      <FreePoCBanner elementId="free-poc-form" />
      <main>
        <SimpleHeader
          pageTitle="The Fastest Time Series Object Store for Computer Vision"
          subtitle="Optimized storage and retrieval for high speed image and video data on edge AI devices and cloud infrastructure."
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
        Comparative performance analysis has underscored the superiority of ReductStore
        superiority in handling image and video data, consistently outperforming traditional storage
        storage solutions for read and write operations across a range of file sizes.
        ReductStore's optimized architecture ensures minimal latency and high throughput,
        which is critical when dealing with the large datasets typical of computer vision
        applications. These metrics clearly establish ReductStore as the leading choice for
        for high-speed image and video environments where optimal performance is critical.
      </p>
    ),
    illustration:
      require("@site/static/img/use-cases/ai-workflows/time-series-database-for-unstructured-data.webp")
        .default,
    isImageLeft: false,
  },
  {
    title: "Time Series Database for Images and Video Data",
    description: (
      <p>
        ReductStore's architecture is ideal for computer vision applications that require
        unstructured data, such as images and video, in temporal context.
        This integration facilitates the efficient ingestion, querying, and management of large data sets.
        where each image or video frame can be associated with a timestamp.
        As a result, computer vision models benefit from streamlined access to historical and
        and real-time visual data for analysis and prediction.
      </p>
    ),
    illustration:
      require("@site/static/img/use-cases/ai-workflows/real-time-fifo-quota.webp")
        .default,
    isImageLeft: true,
  },
  {
    title: "Store Images, Videos, and Models",
    description: (
      <p>
        Flexible data management in computer vision requires a storage solution that is both
        that is both versatile and robust enough to accommodate a wide range of data types.
        ReductStore provides this versatility by allowing the creation of multiple buckets and in
        to effectively address different data storage needs. Images and videos can be
        organized neatly within time-series structures, improving analytical capabilities and temporal
        temporal query performance. What's more, computer vision models can be stored in the same
        the same storage, allowing developers and data scientists to systematically track model
        iterations, ensuring integrity and reproducibility across computer vision workflows.
      </p>
    ),
    illustration:
      require("@site/static/img/use-cases/ai-workflows/data-replication-with-label-filtering.webp")
        .default,
    isImageLeft: false,
  },
  {
    title: "Annotations and Metadata for Every Image and Video",
    description: (
      <p>
        ReductStore provides the ability to assign metadata, including annotations and labels, to any image or video in its database,
        to any image or video in its database. For example, in object recognition tasks, an image file can be
        file can be tagged with metadata that specifies attributes such as object categories within
        bounding boxes, segmentation masks, or labels indicating specific visual characteristics.
        This level of detail ensures that computer vision models and analysis tools can easily
        annotated datasets, speeding up training and inference processes. In addition,
        metadata directly into the storage layer, ReductStore simplifies the data pipeline architecture and improves
        pipeline architecture and improves overall operational efficiency.
      </p>
    ),
    illustration:
      require("@site/static/img/use-cases/ai-workflows/time-series-database-for-unstructured-data.webp")
        .default,
    isImageLeft: true,
  },
  {
    title: "Data Replication With Metadata Filtering",
    description: (
      <p>
        Implementing metadata filtering in data replication processes increases efficiency by
        ensuring that only relevant information is synchronized across storage buckets.
        This optimization is critical for maintaining high availability and implementing disaster recovery strategies, especially in
        disaster recovery strategies, especially in distributed systems where bandwidth and storage
        and storage resources are at a premium. By filtering data based on annotations or
        based on annotations or classifications, replication can be targeted to include only the most critical images or
        or videos. As a result, this selective approach reduces unnecessary storage and network
        and network traffic, and ensures that replicated environments are always
        with all relevant operational data while excluding irrelevant information.
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
        The implementation of real-time FIFO (First-In, First-Out) quotas in ReductStore
        significantly improves the efficient management of data volumes, especially for high-throughput
        high-throughput image and video streams common in computer vision applications.
        By enforcing FIFO quotas, ReductStore ensures that the oldest data is automatically discarded to make room for newer data.
        This mechanism is critical in environments such as surveillance, autonomous vehicles, and industrial
        vehicles, and industrial monitoring, where high-speed data streams can quickly consume
        of available storage. It also simplifies management requirements by providing an automated
        based on actual usage rather than arbitrary timeframes, optimizing both storage utilization and system
        storage utilization and system robustness.
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
    question:
      "How does ReductStore handle querying large image and video datasets?",
    answer:
      "In ReductStore, queries act as iterators, ensuring efficient and consistent performance regardless of the number of records stored. This allows each image or video frame to be retrieved sequentially, maintaining stable query speeds as your dataset grows.",
  },
  {
    question:
      "What type of metadata can be assigned to images and videos in ReductStore?",
    answer:
      "ReductStore allows you to assign arbitrary key-value pairs as metadata to any image or video. This can include annotations such as labels, bounding boxes, segmentation masks, timestamps, or any other descriptive information relevant to your computer vision tasks.",
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
      "ReductStore provides real-time FIFO quotas to effectively manage data retention in high-throughput environments. It also supports data replication with metadata filtering to reduce network traffic and uses HTTP batching to efficiently handle large numbers of image and video records.",
  },
];
