import React from "react";
import Layout from "@theme/Layout";
import styles from "./styles.module.css";
import UseCaseRow from "@site/src/components/UseCaseRow";
import Faq from "@site/src/components/Faq";
import SimpleHeaderWithForm from "@site/src/components/SimpleHeaderWithForm";
import PromotionalWaitingList from "@site/src/components/PromotionalWaitingList";
import CloudStorageSvg from "@site/static/img/solutions/cloud/cloud_storage.drawio.svg";

export default function CloudSolution(): JSX.Element {
  return (
    <Layout
      title="Cloud Time Series Object Storage"
      description="High-performance cloud storage for data of any size—images, text, sensor data, and more."
    >
      <main>
        <SimpleHeaderWithForm
          title="Cloud Time Series Object Storage"
          subtitle="High-performance cloud storage for data of any size—images, text, sensor data, and more"
          benefits={[
            "Faster Data Access",
            "Scalable Data Management",
            "Cost-Effective Storage",
          ]}
          imageSvg={<CloudStorageSvg className={styles.SvgImage} />}
        />
        <div className="container">
          <>
            {diagrams.map((diagram) => (
              <UseCaseRow
                key={diagram.title}
                title={diagram.title}
                description={diagram.description}
                illustration={diagram.image}
                isImageLeft={diagram.isImageLeft}
              />
            ))}
          </>
          <div className={styles.form}>
            <PromotionalWaitingList
              title="Join the Waiting List"
              subtitle="Join the waiting list for early access to ReductStore's cloud storage solution and updates"
            />
          </div>
          <div className={styles.faqs}>
            <Faq faqs={cloudFaqs} defaultOpenCount={3} />
          </div>
        </div>
      </main>
    </Layout>
  );
}

const diagrams = [
  {
    title: "Optimized for Speed",
    description: (
      <p>
        Designed for high-performance workloads, ReductStore ensures fast access
        and processing of time-series data, even under heavy demand. With faster
        read and write speeds than traditional time series and blob storage
        solutions, it is ideal for AI, IoT, and edge applications.
      </p>
    ),
    image:
      require("@site/static/img/solutions/cloud/performance-comparison.webp")
        .default,
    isImageLeft: true,
  },
  {
    title: "Easy to Scale",
    description: (
      <p>
        ReductStore grows with your data. Whether you're managing petabytes of
        data or billions of time-series records, the platform automatically
        scales to meet your needs without complex configuration, ensuring that
        your data infrastructure is always ready to grow.
      </p>
    ),
    image:
      require("@site/static/img/solutions/cloud/scalable-data-pipeline.webp")
        .default,
    isImageLeft: false,
  },
  {
    title: "Reduce Storage Costs",
    description: (
      <p>
        ReductStore leverages Google Cloud to provide a cost-effective solution.
        By integrating with blob storage, it optimizes storage costs while
        maintaining high performance. This allows you to store massive amounts
        of data at a lower cost without sacrificing access speed or reliability.
      </p>
    ),
    image: require("@site/static/img/solutions/cloud/real-time-fifo-quota.webp")
      .default,
    isImageLeft: true,
  },
];

const cloudFaqs = [
  {
    question: "How does ReductStore optimize data management for the cloud?",
    answer:
      "ReductStore is designed to handle high-frequency time series data and unstructured blobs, ensuring fast access and processing in cloud environments. It's optimized for AI and IoT applications, providing scalable and efficient data storage.",
  },
  {
    question: "What makes ReductStore secure in the cloud?",
    answer:
      "ReductStore Cloud is built on Google infrastructure with regional isolation, deep security controls, and SOC2 certification to ensure robust protection. Deploy on our account or yours and manage access with granular permissions.",
  },
  {
    question: "How does ReductStore handle edge-to-cloud data synchronization?",
    answer:
      "ReductStore provides data replication between any endpoint, including edge devices and cloud storage, with label and metadata filtering to ensure only relevant data is copied.",
  },
  {
    question: "What are the benefits of joining the ReductStore waiting list?",
    answer:
      "By joining the waiting list, you'll be among the first to explore ReductStore's cloud solution and receive updates on new features and optimizations for managing time series data in the cloud.",
  },
];
