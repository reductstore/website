import React from "react";
import SimpleHeader from "@site/src/components/SimpleHeader";
import Layout from "@theme/Layout";
import styles from './styles.module.css';
import UseCaseRow from "@site/src/components/UseCaseRow";
import Faq from "@site/src/components/Faq";
import HelpForm from "@site/src/components/HelpForm";
import Link from "@docusaurus/Link";

export default function UseCaseVibrationSensors(): JSX.Element {
  return (
    <Layout
      title="Vibration Sensor Database"
      description="Learn how ReductStore stands out for high-throughput applications such as vibration sensor data storage and management"
    >
      <main>
        <SimpleHeader
          pageTitle="Vibration Sensor Database"
          subtitle="Learn how ReductStore stands out for high-throughput applications such as vibration sensor data storage and management"
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

          <Faq faqs={useCasesFaqs} defaultOpenCount={3} />

          <div className={styles.contactForm}>
            <h2>Contact Us</h2>
            <p>
              If you have any questions about using ReductStore, complete the form below. You can also connect with us at{" "}
              <a href="mailto:info@reduct.store"><b>info@reduct.store</b></a>
            </p>
            <HelpForm subject="VibrationSensors" />
          </div>

        </div>
      </main>
    </Layout>
  );
}

const useCases = [
  {
    title: "The Fastest Time Series Object Store on the Market",
    description: (
      <p>
        ReductStore consistently <Link to="/blog/comparisons/computer-vision/iot/performance-comparison-reductstore-vs-minio"><b>outperforms Minio</b></Link> in both writing and reading operations, regardless of chunk size.
        It is significantly <Link to="/blog/comparisons/iot/reductstore-vs-mongodb"><b>faster than MongoDB for blobs</b></Link>, with performance gains ranging from 65% to 244%.
        Additionally, <Link to="/blog/comparisons/iot/reductstore-vs-timescaledb"><b>ReductStore surpasses TimescaleDB for blobs sized 100KB and higher</b></Link>, achieving improvements between 200% and 1300%. This makes ReductStore the optimal choice for high-throughput applications such as vibration sensor data storage and management.
      </p>
    ),
    illustration: require("@site/static/img/logo.webp").default,

    isImageLeft: false
  },
  {
    title: "Compatible with All Vibration Sensors to Store Both Raw and Pre-Processed Data",
    description: (
      <p>
        ReductStore supports all vibration sensors by accepting both raw and pre-processed data.
        The raw sensor output is stored as a blob, and each blob can be tagged with metadata such as labels.
        This allows storage of metrics such as peak, RMS, crest factor, or AI labels.
        Advanced filtering options allow efficient retrieval of either raw data or specific pre-processed metrics based on these labels.
        This functionality ensures that ReductStore can meet diverse vibration monitoring requirements while providing robust query capabilities to support complete data analysis workflows.
      </p>
    ),
    illustration: require("@site/static/img/logo.webp").default,

    isImageLeft: true
  },
  {
    title: "Retention Policy Based on Volume to Capture All Operating Hours",
    description: (
      <p>
        A real-time FIFO quota prevents disk space shortages in real time.
        Typically, databases implement retention policies based on time periods; in the case of ReductStore, retention can be set based on data volume.
        This is particularly useful to avoid losing critical data when a sensor is offline for a period of time or during off-hours.
        By configuring a volume-based retention policy, you can ensure that all hours of operation are captured without interruption due to downtime or storage limitations.
        This enables continuous monitoring and historical analysis, which is critical for applications such as predictive maintenance and anomaly detection.
      </p>
    ),
    illustration: require("@site/static/img/logo.webp").default,

    isImageLeft: false
  },
  {
    title: "Distributed Architecture with Replication and Reduction Strategies",
    description: (
      <p>
        In a distributed architecture, data replication provides redundancy and fault tolerance by synchronising data across multiple nodes.
        For vibration sensor databases, implementing replication between edge devices and the cloud increases reliability.
        Raw sensor data is stored locally on the device to minimise latency, while selectively important or pre-processed data is replicated to the cloud for further analysis.
        This approach not only reduces storage overhead, but also optimises bandwidth usage.
        By employing reduction strategies such as metadata tag filtering, only essential metrics are transmitted, enabling efficient resource utilisation without compromising analytical capabilities.
      </p>
    ),
    illustration: require("@site/static/img/logo.webp").default,

    isImageLeft: true
  },
];

const useCasesFaqs = [
  {
    question: "What is the maximum blob size that ReductStore can store?",
    answer: "ReductStore can store blobs of any size, limited only by the available disk space. The maximum blob size is determined by the underlying file system and the storage capacity of the device. ReductStore is designed to handle large blobs efficiently, making it suitable for storing raw sensor data from vibration sensors."
  },
  {
    question: "How can I retrieve specific metrics from the stored vibration sensor data?",
    answer: "ReductStore allows you to tag each blob of sensor data with metadata such as labels, making it easy to retrieve specific metrics. By using metadata tags, you can filter and query the stored data to extract the desired information. This feature enables you to efficiently retrieve raw data or pre-processed metrics based on the labels associated with each blob."
  },
  {
    question: "Can ReductStore be used to store vibration sensor data from edge devices?",
    answer: "Yes, ReductStore is designed to support edge computing environments and can store vibration sensor data from edge devices. By implementing data replication between edge devices and the cloud, ReductStore ensures that data is synchronised across multiple nodes for redundancy and fault tolerance. This distributed architecture enables efficient storage and retrieval of sensor data, making it ideal for edge computing applications."
  },
  {
    question: "How does ReductStore handle data retention for vibration sensor data?",
    answer: "ReductStore offers flexible data retention policies based on data volume, allowing you to capture all operating hours of vibration sensor data. By setting retention policies based on data volume, you can ensure that critical data is not lost during periods of downtime or storage limitations. This feature enables continuous monitoring and historical analysis of vibration sensor data, supporting applications such as predictive maintenance and anomaly detection."
  },
  {
    question: "What are the performance benefits of using ReductStore for vibration sensor data storage?",
    answer: "ReductStore offers superior performance compared to other object stores and databases for storing vibration sensor data. It outperforms Minio in both writing and reading operations, surpasses MongoDB for blobs, and exceeds TimescaleDB for blobs sized 100KB and higher. These performance gains make ReductStore the optimal choice for high-throughput applications such as vibration sensor data storage and management."
  },
  {
    question: "Is ReductStore a data historian for vibration sensor data?",
    answer: "Yes, ReductStore can function as a data historian for vibration sensor data, capturing and storing historical sensor data for analysis and monitoring. By storing raw sensor data as blobs and tagging each blob with metadata, ReductStore enables efficient retrieval of specific metrics and historical trends. This functionality supports complete data analysis workflows, making ReductStore an ideal solution for vibration sensor data storage and management."
  }
]
