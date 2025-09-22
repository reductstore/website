import React from "react";
import Layout from "@theme/Layout";
import styles from "./styles.module.css";
import UseCaseRow from "@site/src/components/useCases/UseCaseRow";
import Faq from "@site/src/components/shared/Faq";
import SimpleHeaderWithButton from "@site/src/components/shared/SimpleHeaderWithButton";
import useBaseUrl from "@docusaurus/useBaseUrl";
import ThemedImage from "@theme/ThemedImage";
import TestServerForm from "@site/src/components/forms/TestServerForm";

export default function CloudSolution(): JSX.Element {
  const title =
    "The Fastest and Most Cost-Effective Cloud Storage for Time Series Objects";
  const description =
    "Designed for time-series data with records larger than a few kilobytes such as images, video, files, text, logs, ReductStore delivers faster performance at a fraction of the cost of traditional time-series databases.";
  return (
    <Layout title={title} description={description}>
      <main>
        <SimpleHeaderWithButton
          scrollToId="cloud-signup"
          title={title}
          subtitle={description}
          benefits={[
            "10x Faster Performance",
            "1/10th the Storage Cost",
            "Scale to Petabytes",
          ]}
          imageSvg={
            <ThemedImage
              className={styles.SvgImage}
              alt="Cloud Storage"
              sources={{
                light: useBaseUrl(
                  "/img/solutions/cloud/cloud_solution_light.svg",
                ),
                dark: useBaseUrl(
                  "/img/solutions/cloud/cloud_solution_dark.svg",
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
          <div id="cloud-signup" className={styles.signUpSection}>
            <h2>Get Started with ReductStore</h2>
            <p className={styles.signUpDescription}>
              Submit the form and we'll provide you with a test server in the
              cloud (100% free). You can use it to explore ReductStore, stream
              data from your devices, and see its performance in action.
            </p>
            <TestServerForm title="Cloud Signup" defaultPlan="SaaS" />
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
    title: "10x Faster Performance",
    description: (
      <p>
        Designed for high-performance workloads, ReductStore ensures fast access
        and processing of time-series data, even under heavy demand. With faster
        read and write speeds than traditional time series and blob storage
        solutions, it is ideal for AI, IoT, and edge applications.
      </p>
    ),
    image: require("@site/static/img/solutions/cloud/faster-performance.png")
      .default,
    isImageLeft: true,
  },
  {
    title: "1/10th the Storage Cost",
    description: (
      <p>
        ReductStore leverages Google Cloud to provide a cost-effective solution.
        By integrating with blob storage, it optimizes storage costs while
        maintaining high performance. This allows you to store massive amounts
        of data at a lower cost without sacrificing access speed or reliability.
      </p>
    ),
    image: require("@site/static/img/solutions/cloud/lowest-cost.png").default,
    isImageLeft: false,
  },
  {
    title: "Scale to Petabytes",
    description: (
      <p>
        ReductStore integrates tightly with cloud storage to provide efficient
        access to billions of time series records. Its iterator-based approach
        minimizes storage usage while intelligently caching unnecessary cloud
        synchronization. By synchronizing data in blocks rather than individual
        records, ReductStore significantly reduces I/O costs, making large-scale
        data management both fast and cost-effective.
      </p>
    ),
    image: require("@site/static/img/solutions/cloud/scale-to-petabytes.png")
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
      "ReductStore's cloud solution is built on Google's infrastructure, but you can deploy it in your own account for full control over data access and security.",
  },
  {
    question: "How does ReductStore handle edge-to-cloud data synchronization?",
    answer:
      "ReductStore provides data replication between any instance, including edge devices and cloud storage, with label and metadata filtering to ensure only relevant data is copied.",
  },
];
