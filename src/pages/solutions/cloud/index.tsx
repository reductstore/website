import React from "react";
import Layout from "@theme/Layout";
import styles from "./styles.module.css";
import UseCaseRow from "@site/src/components/useCases/UseCaseRow";
import Faq from "@site/src/components/shared/Faq";
import SimpleHeaderWithButton from "@site/src/components/shared/SimpleHeaderWithButton";
import useBaseUrl from "@docusaurus/useBaseUrl";
import ThemedImage from "@theme/ThemedImage";

export default function CloudSolution(): JSX.Element {
  const title = "Cloud Time Series Object Storage";
  const description =
    "Store and manage time series data at a low blob storage cost. Designed for images, vibration data, text, logs, and more, ReductStore offers faster performance at a fraction of the cost compared to traditional time series solutions.";
  return (
    <Layout title={title} description={description}>
      <main>
        <SimpleHeaderWithButton
          title={title}
          subtitle={description}
          benefits={[
            "Faster Data Access",
            "Scalable Data Management",
            "Cost-Effective Storage",
          ]}
          imageSvg={
            <ThemedImage
              className={styles.SvgImage}
              alt="Cloud Storage"
              sources={{
                light: useBaseUrl(
                  "/img/solutions/cloud/cloud_storage_light.drawio.svg",
                ),
                dark: useBaseUrl(
                  "/img/solutions/cloud/cloud_storage_dark.drawio.svg",
                ),
              }}
            />
          }
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
    isImageLeft: false,
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
    isImageLeft: true,
  },
];

const cloudFaqs = [
  {
    question: "How does ReductStore optimize data management for the cloud?",
    answer:
      "ReductStore simplifies cloud data management by providing fast, scalable storage specifically for time-series unstructured data, leveraging Google Cloud for cost efficiency and easy scaling.",
  },
  {
    question: "What makes ReductStore secure in the cloud?",
    answer:
      "ReductStore's cloud solution is built on Google infrastructure with deep security controls and SOC2 certification to ensure robust protection. Deploy on our account or yours and manage access with granular permissions.",
  },
  {
    question: "How does ReductStore handle edge-to-cloud data synchronization?",
    answer:
      "ReductStore provides data replication between any instance, including edge devices and cloud storage, with label and metadata filtering to ensure only relevant data is copied.",
  },
  {
    question: "What are the benefits of joining the ReductStore waiting list?",
    answer:
      "By joining the waiting list, you'll be among the first to explore ReductStore's cloud solution and receive updates on new features and optimizations for managing time series data in the cloud.",
  },
];
