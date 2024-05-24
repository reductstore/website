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
      description="Learn how ReductStore stands out with vibration sensor data storage and management."
    >
      <main>
        <SimpleHeader
          pageTitle="Vibration Sensor Database"
          subtitle="You don't have to waste valuable raw sensor data like other solutions"
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
    title: "Get the Fastest Time Series Object Store on the Market",
    description: (
      <p>
        ReductStore consistently <Link to="/blog/comparisons/computer-vision/iot/performance-comparison-reductstore-vs-minio"><b>outperforms Minio</b></Link> in both writing and reading operations, regardless of chunk size.
        It is significantly <Link to="/blog/comparisons/iot/reductstore-vs-mongodb"><b>faster than MongoDB for blobs</b></Link>, with performance gains ranging from 65% to 244%.
        Additionally, <Link to="/blog/comparisons/iot/reductstore-vs-timescaledb"><b>ReductStore surpasses TimescaleDB for blobs sized 100KB and higher</b></Link>, achieving improvements between 205% and 1300%. This makes ReductStore the optimal choice for high-throughput applications such as vibration sensor data storage and management.
      </p>
    ),
    illustration: require("@site/static/img/logo.webp").default,
    isImageLeft: false
  },
  {
    title: "Store Both Raw and Pre-Processed Metrics",
    description: (
      <p>
        ReductStore supports all vibration sensors by accepting both raw and pre-processed data.
        The raw sensor output is stored as a blob, and each blob can be labeled with metadata.
        This allows storage of metrics such as peak, RMS, crest factor, or any other pre-processed data.
        Advanced filtering options allow efficient retrieval of either raw data or specific pre-processed metrics based on these labels.
        This functionality ensures that ReductStore can meet diverse vibration monitoring requirements while providing robust query capabilities to support complete data analysis workflows.
      </p>
    ),
    illustration: require("@site/static/img/logo.webp").default,
    isImageLeft: true
  },
  {
    title: "Eliminate Data Loss with Volume-Based Retention Policies",
    description: (
      <p>
        A real-time First-In-First-Out (FIFO) quota prevents disk space shortages in real time.
        Typically, databases implement retention policies based on time periods; in the case of ReductStore, retention can be set based on data volume.
        This is particularly useful when storing vibration sensor data on edge devices with limited storage capacity.
        By configuring a volume-based retention policy, you can ensure that all hours of operation are captured without interruption due to downtime or storage limitations.
        This enables continuous monitoring and historical analysis, which is critical for applications such as predictive maintenance and anomaly detection.
      </p>
    ),
    illustration: require("@site/static/img/logo.webp").default,
    isImageLeft: false
  },
  {
    title: "Decide on the Right Data Reduction Strategy",
    description: (
      <p>
        Raw sensor data is stored locally on the device to minimise latency, while selectively important or pre-processed data is replicated to the cloud for further analysis.
        This approach not only reduces storage overhead, but also optimises bandwidth usage.
        By employing reduction strategies based on metadata label filtering, only essential data are transmitted, enabling efficient resource utilisation without compromising analytical capabilities.
      </p>
    ),
    illustration: require("@site/static/img/logo.webp").default,
    isImageLeft: true
  },
  {
    title: "Optimise Condition Monitoring Applications",
    description: (
      <p>
        Condition monitoring applications can use ReductStore to efficiently manage and analyse vibration sensor data.
        Raw data is stored on the device as blobs, each tagged with pre-processed metrics such as algorithm labels, peaks, RMS or crest factors.
        These blobs can be automatically replicated to the cloud for further analysis or algorithm development.
        This dual storage approach and reduction strategy ensures real-time processing locally, while allowing extensive historical data analysis in the cloud.
      </p>
    ),
    illustration: require("@site/static/img/logo.webp").default,
    isImageLeft: false
  },
  {
    title: "Accelerate Diagnostic Processes",
    description: (
      <p>
        Volume-based FIFO quotas ensure that critical diagnostic data is retained even during off-peak hours, providing continuous data availability.
        Metadata-based replication enables full blob storage and retrieval, improving the integrity and completeness of diagnostic data sets.
        ReductStore's unmatched write and read speed accelerates the diagnostic process by providing fast access to critical vibration sensor data.
        This rapid access is critical for timely fault detection and resolution, making ReductStore an optimal solution for high performance diagnostics in vibration monitoring systems.
      </p>
    ),
    illustration: require("@site/static/img/logo.webp").default,
    isImageLeft: true
  }
];

const useCasesFaqs = [
  {
    question: "What is the maximum blob size that ReductStore can store?",
    answer: "ReductStore can store blobs of any size, limited only by the available disk space. The maximum blob size is determined by the underlying file system and the storage capacity of the device. ReductStore is designed to handle large blobs efficiently, making it suitable for storing raw sensor data from vibration sensors."
  },
  {
    question: "How can I retrieve specific metrics from the stored vibration sensor data?",
    answer: "ReductStore allows you to label each record with metadata, making it easy to retrieve specific records. By using labels, you can filter and query the raw sensor data along with any pre-processed metrics."
  },
  {
    question: "How does ReductStore handle data retention for vibration sensor data?",
    answer: "ReductStore offers flexible data retention policies based on data volume, allowing you to capture all operating hours of vibration sensor data. By setting retention policies based on data volume, you can ensure that critical data is not lost during periods of downtime or storage limitations. "
  },
  {
    question: "What are the performance benefits of using ReductStore for vibration sensor data storage?",
    answer: "ReductStore offers superior performance compared to other object stores and databases for storing vibration sensor data. It outperforms Minio in both writing and reading operations, surpasses MongoDB for blobs, and exceeds TimescaleDB for blobs sized 100KB and higher. These performance gains make ReductStore the optimal choice for high-throughput applications such as vibration sensor data storage and management."
  },
  {
    question: "Is ReductStore a data historian for vibration sensor data?",
    answer: "Yes, ReductStore can function as a data historian for vibration sensor data, capturing and storing historical sensor data for analysis and monitoring. By storing raw sensor data as blobs and labeling each blob with metadata, ReductStore enables efficient data retrieval and analysis for condition monitoring, predictive maintenance, and fault detection applications."
  }
]
