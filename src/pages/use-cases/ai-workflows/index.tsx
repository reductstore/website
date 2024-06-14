import React from "react";
import SimpleHeader from "@site/src/components/SimpleHeader";
import Layout from "@theme/Layout";
import styles from './styles.module.css';
import UseCaseRow from "@site/src/components/UseCaseRow";
import Faq from "@site/src/components/Faq";
import Link from "@docusaurus/Link";
import FreePoCBanner from "@site/src/components/FreePoCBanner";
import FreePoCForm from "@site/src/components/FreePoCForm";

export default function UseCaseAI(): JSX.Element {

  return (
    <Layout
      title="Optimize Your AI Workflows"
      description="Learn how ReductStore can improve the performance of your projects with an optimal infrastructure."
    >
      <FreePoCBanner elementId="free-poc-form" />
      <main>
        <SimpleHeader
          pageTitle="Optimize Your AI Workflows"
          subtitle="Learn how ReductStore can improve the performance of your projects with an optimal infrastructure"
        />
        <div className="container">
          <>
            {useCases.map(useCase => (
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
    title: "The Fastest Object Store",
    description: (
      <p>
        Comparative performance analysis has underscored its superiority, consistently <Link to="/blog/comparisons/computer-vision/iot/performance-comparison-reductstore-vs-minio"><b>outperforming MinIO for write and read operations</b></Link> across a range of record sizes.
        In addition, ReductStore demonstrated remarkable speed improvements when <Link to="/blog/comparisons/iot/reductstore-vs-mongodb"><b>compared to MongoDB, achieving 65 to 244% faster performance rates</b></Link> for blob storage use cases.
        For records larger than 100KB, it significantly <Link to="/blog/comparisons/iot/reductstore-vs-timescaledb"><b>outperformed TimescaleDB by a margin of 200 to 1300%</b></Link>.
        These metrics clearly establish ReductStore as the leading choice for high-speed data environments where optimal performance is essential.

      </p>
    ),
    illustration: require("@site/static/img/ai-workflows/the-fastest-object-store.webp").default,
    isImageLeft: false
  },
  {
    title: "Time Series Database for Unstructured Data",
    description: (
      <p>
        The integration of ReductStore's architecture is ideal for AI applications that require the handling of unstructured data aligned with temporal contexts.
        This integration facilitates efficient ingesting, querying, and managing large datasets where each blob can be associated with a timestamp.
        As a result, AI models benefit from streamlined access to historical and real-time data for analysis and prediction.
      </p>
    ),
    illustration: require("@site/static/img/ai-workflows/time-series-database-for-unstructured-data.webp").default,
    isImageLeft: true
  },
  {
    title: "Store Records and AI Models",
    description: (
      <p>
        Flexible data management in the context of AI applications requires a storage solution that is both versatile and robust, capable of accommodating a wide range of data types.
        ReductStore provides this versatility by allowing <Link to="/docs/how-does-it-work"><b>the creation of multiple buckets and entries</b></Link> to effectively address different data storage needs.
        Records can be neatly organized within time-series structures, which improves analytical capabilities and temporal query performance.
        What's more, AI models can be stored in the same storage, enabling developers and data scientists to systematically track model iterations, ensuring integrity and reproducibility across AI workflows.
      </p>
    ),
    illustration: require("@site/static/img/ai-workflows/store-records-and-ai-models.webp").default,
    isImageLeft: false
  },
  {
    title: "AI Labels and Metadata for Every Record",
    description: (
      <p>
        ReductStore provides the ability to assign metadata, including AI-generated labels, to each record in its database.
        For example, in computer vision tasks, an image file can be augmented with metadata specifying attributes such as object categories within bounding boxes, descriptive tags of visual content, or labels indicating the presence of anomalies.
        This level of detail ensures that AI models and analytics tools can easily access annotated datasets, accelerating training and inference processes.
        In addition, by embedding AI-generated metadata directly into the storage layer, ReductStore simplifies the data pipeline architecture and improves overall operational efficiency.
      </p>
    ),
    illustration: require("@site/static/img/ai-workflows/ai-labels-and-metadata-for-every-record.webp").default,
    isImageLeft: true
  },
  {
    title: "Data Replication With Label Filtering",
    description: (
      <p>
        Implementing label filtering in data replication processes increases efficiency by ensuring that only relevant information is synchronized across storage buckets.
        This optimization is critical for maintaining high availability and implementing disaster recovery strategies, especially in distributed systems where bandwidth and storage resources are at a premium.
        By filtering data based on AI labels or classifications, replication can be targeted to include only the most critical records.
        As a result, this selective approach reduces unnecessary costs associated with storage and network traffic, and ensures that replicated environments remain up to date with all relevant operational data while excluding irrelevant information.
      </p>
    ),
    illustration: require("@site/static/img/ai-workflows/data-replication-with-label-filtering.webp").default,
    isImageLeft: false
  },
  {
    title: "Real-Time FIFO Quota",
    description: (
      <p>
        The implementation of real-time FIFO (First-In, First-Out) quotas in ReductStore is a significant improvement in the efficient management of data volumes.
        By enforcing FIFO quotas, ReductStore ensures that the oldest data is automatically discarded to make room for new entries once pre-defined storage thresholds are reached.
        This mechanism is critical in environments such as edge computing, computer vision, and IoT, where high-speed data streams can quickly consume available storage.
        It also simplifies management requirements by maintaining an automated retention policy based on actual usage rather than arbitrary timeframes, optimizing both storage utilization and system robustness.
      </p>
    ),
    illustration: require("@site/static/img/ai-workflows/real-time-fifo-quota.webp").default,
    isImageLeft: true
  },
];



const useCasesFaqs = [
  {
    question: "What types of AI applications is ReductStore ideal for?",
    answer: "ReductStore is built specifically for applications that deal with unstructured data in temporal contexts, such as real-time analytics, computer vision, and predictive modeling.",
  },
  {
    question: "How does ReductStore handle querying large datasets?",
    answer: "In ReductStore, queries act as iterators, ensuring efficient and consistent performance regardless of the number of records stored. This allows each record or batch to be retrieved sequentially, maintaining stable query speeds as the dataset grows."
  },
  {
    question: "What type of metadata can be assigned to records in ReductStore?",
    answer: "ReductStore allows the assignment of arbitrary key-value pairs that can be used to classify and categorize data."
  },
  {
    question: "Is ReductStore scalable?",
    answer: "Yes, ReductStore is designed to scale as your data needs grow, supporting large data storage requirements without compromising performance.",
  },
  {
    question: "What is the advantage of using ReductStore for time series data?",
    answer: "ReductStore provides optimized storage and retrieval mechanisms for time series data, ensuring fast access and efficient processing of time series queries.",
  },
  {
    question: "What makes ReductStore suitable for edge computing and IoT?",
    answer: "Designed for edge computing, ReductStore features FIFO quotas to effectively manage data retention, replication based on label filtering to reduce network traffic, and the use of HTTP batching for efficient record handling.",
  },
]
