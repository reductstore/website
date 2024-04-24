import React from "react";
import SimpleHeader from "@site/src/components/SimpleHeader";
import Layout from "@theme/Layout";
import styles from './styles.module.css';
import UseCaseRow from "@site/src/components/UseCaseRow";
import Faq from "@site/src/components/Faq";
import HelpForm from "@site/src/components/HelpForm";
import clsx from "clsx";
import Link from "@docusaurus/Link";

export default function UseCaseAI(): JSX.Element {
  return (
    <Layout
      title="Run AI Workflows with ReductStore"
      description="Learn how Reduct can help you transform your AI workflows."
    >
      <main>
        <SimpleHeader pageTitle="Run AI Workflows with ReductStore" />

        <div className={clsx("container", styles.container)}>

          <>
            {useCases.map(useCase => (
              <UseCaseRow
                key={useCase.title}
                title={useCase.title}
                description={useCase.description}
                imageUrl={useCase.imageUrl}
                imageLeft={useCase.imageLeft}
              />
            ))}
          </>

          <Faq faqs={aiFaqs} defaultOpenCount={2} />

          <div className={styles.contactForm}>
            <h2>Contact Us</h2>
            <p>
              If you have any questions about using ReductStore, complete the form below. You can also connect with us at{" "}
              <a href="mailto:info@reduct.store">info@reduct.store</a>
            </p>
            <HelpForm subject="AIUseCase" />
          </div>

        </div>
      </main>
    </Layout>
  );
}

const useCases = [
  {
    title: "Blob and Time Series Capabilities",
    description: (
      <p>
        Incorporating ReductStore's architecture, which combines Blob storage with Time Series capabilities,
        is pivotal for AI applications that necessitate the handling of unstructured data aligned with temporal contexts.
        This integration facilitates the efficient ingestion, querying, and management of large datasets where each blob
        can be associated with a timestamp or a sequence of timestamps.
        Consequently, AI models benefit from streamlined access to historical and real-time data for analysis and prediction.
      </p>
    ),
    imageUrl: require("./img/image.png").default,
    imageLeft: true
  },
  {
    title: "The Fastest Blob Storage Solutions",
    description: (
      <p>
        Comparative performance analyses have underscored its superiority; consistently eclipsing MinIO in write and read operations across various chunk sizes as documented at <Link to="https://www.reduct.store/blog/comparisons/computer-vision/iot/performance-comparison-reductstore-vs-minio"><b>ReductStore vs. Minio Performance Comparison</b></Link>.
        Moreover, when compared with MongoDB for blob storage use cases, ReductStore exhibited remarkable speed enhancements—achieving 65 to 244% faster performance rates (<Link to="https://www.reduct.store/blog/comparisons/iot/reductstore-vs-mongodb"><b>ReductStore vs. MongoDB Analysis</b></Link>).
        For blobs exceeding 100KB, it significantly outperformed TimescaleDB by a margin of 200 to 1300%. These metrics clearly establish ReductStore as a leading choice for high-velocity data environments where optimal performance is imperative.
      </p>
    ),
    imageUrl: require("./img/image.png").default,
    imageLeft: false
  },
  {
    title: "Store Records and AI Models",
    description: (
      <p>
        Versatile data management in the context of AI applications mandates a storage solution that is both flexible and robust, capable of accommodating a diverse array of data types. ReductStore offers such versatility, allowing for the creation of multiple buckets to address different storage requirements effectively.
        Records can be neatly organized within time series structures, enhancing analytical capabilities and temporal query performance.
        Additionally, inference results can be stored alongside blobs, providing a unified repository for both raw and processed data.
        The ability to store AI models in the same storage further empowers developers and data scientists to track model iterations systematically, ensuring integrity and reproducibility across AI workflows.
      </p>
    ),
    imageUrl: require("./img/image.png").default,
    imageLeft: true
  },
  {
    title: "AI Labels and Metadata for Every Record",
    description: (
      <p>
        The organization of data is crucial for AI-driven applications and workflows. ReductStore's approach to this entails the ability to assign metadata, including AI-generated labels, to each blob within its database.
        For instance, in computer vision tasks, an image file can be augmented with metadata specifying attributes such as object categories within bounding boxes, descriptive tags of visual content, or labels indicating the presence of anomalies.
        This level of detail ensures that AI models and analytics tools can access precisely annotated datasets for improved training accuracy and inferential insights.
        Moreover, by embedding AI-generated metadata directly into the storage layer, ReductStore simplifies the data pipeline architecture and enhances overall operational efficiency.
      </p>
    ),
    imageUrl: require("./img/image.png").default,
    imageLeft: false
  },
  {
    title: "Data Replication With Label Filtering",
    description: (
      <p>
        Implementing label filtering in data replication processes enhances efficiency by ensuring that only pertinent information is synchronized across storage buckets.
        This optimization is critical for maintaining high availability and implementing disaster recovery strategies, particularly in distributed systems where bandwidth and storage resources are at a premium.
        By employing AI to identify and filter data based on predefined labels or classifications, replication can be targeted to include only the most crucial datasets.
        As a result, this selective approach minimizes latency, reduces unnecessary network traffic, and ensures that replicated environments maintain an up-to-date state with all relevant operational data while excluding extraneous information.
      </p>
    ),
    imageUrl: require("./img/image.png").default,
    imageLeft: true
  },
  {
    title: "Real-Time FIFO Quota",
    description: (
      <p>
        The implementation of real-time FIFO (First-In, First-Out) quotas in data processing within the context of ReductStore is a significant advancement for managing data volume efficiently.
        By enforcing FIFO quotas, ReductStore ensures that the oldest data is automatically purged to make room for new entries once predefined storage thresholds are reached.
        This mechanism is vital in environments like edge computing, computer vision, and IoT where high-velocity data streams can rapidly consume available disk space.
        It also facilitates adherence to compliance requirements by maintaining an automated retention policy based on actual usage rather than arbitrary timeframes, optimizing both storage utility and system performance without compromising on data integrity.
      </p>
    ),
    imageUrl: require("./img/image.png").default,
    imageLeft: false
  },
  {
    title: "Data Batching and HTTP(S) APIs",
    description: (
      <p>
        In the realm of IoT and edge computing, efficient data batching coupled with HTTP(S) APIs plays a pivotal role in enhancing operational efficiency.
        By aggregating multiple records into single batched HTTP responses, network overhead is significantly reduced, which is particularly beneficial in environments with high latency or limited bandwidth.
        This approach not only conserves network resources but also expedites the data retrieval process, enabling IoT devices and edge computing nodes to operate more effectively.
        Through the implementation of intelligent data batching strategies and robust HTTP(S) API endpoints, systems can achieve greater throughput while minimizing response times, thus bolstering overall performance in distributed computing landscapes.
      </p>
    ),
    imageUrl: require("./img/image.png").default,
    imageLeft: true
  }
];



const aiFaqs = [
  {
    question: "How does ReductStore's architecture support AI applications?",
    answer: "ReductStore's architecture, which combines Blob storage with Time Series capabilities, is pivotal for AI applications that necessitate the handling of unstructured data aligned with temporal contexts.",
  },
  {
    question: "What is the significance of integrating Blob and Time Series capabilities in AI applications?",
    answer: "Incorporating ReductStore's architecture, which combines Blob storage with Time Series capabilities, is pivotal for AI applications that necessitate the handling of unstructured data aligned with temporal contexts.",
  },
  {
    question: "Why is ReductStore considered superior in Blob storage performance?",
    answer: "ReductStore demonstrates superior performance in Blob storage by consistently outperforming competitors like MinIO and MongoDB across various metrics, offering faster read and write speeds, which is critical for high-velocity data environments.",
  },
  {
    question: "What makes ReductStore versatile in managing different data types?",
    answer: "ReductStore is designed to handle a wide variety of data types, offering multiple bucket creation for diverse storage needs and integrating time series capabilities for enhanced data organization and query performance.",
  },
  {
    question: "How does ReductStore enhance data organization in AI applications?",
    answer: "ReductStore enhances data organization by assigning detailed AI-generated metadata and labels to each blob, facilitating improved data accessibility and precision for AI models and analytics.",
  },
  {
    question: "How does label filtering optimize data replication in ReductStore?",
    answer: "Label filtering in ReductStore optimizes data replication by ensuring only essential data is synchronized across storage systems, reducing latency and unnecessary network traffic, and enhancing overall efficiency.",
  },
  {
    question: "What is the importance of FIFO quotas in ReductStore's data processing?",
    answer: "FIFO quotas in ReductStore help manage data efficiently by automatically purging older entries to accommodate new data, crucial for maintaining system performance and compliance in dynamic environments.",
  },
  {
    question: "How do HTTP(S) APIs and data batching contribute to operational efficiency in ReductStore?",
    answer: "HTTP(S) APIs and efficient data batching in ReductStore minimize network overhead and speed up data retrieval, enabling more effective operations in IoT and edge computing environments."
  }
];
