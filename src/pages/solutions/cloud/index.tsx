import React, { JSX } from "react";
import Layout from "@theme/Layout";
import styles from "./styles.module.css";
import UseCaseRow from "@site/src/components/useCases/UseCaseRow";
import Faq from "@site/src/components/shared/Faq";
import SimpleHeaderWithButton from "@site/src/components/shared/SimpleHeaderWithButton";
import DemoServerForm from "@site/src/components/forms/DemoServerForm";
import PerformanceComparison from "@site/src/components/tables/PerformanceComparison";

export default function CloudSolution(): JSX.Element {
  const title = "Cloud Storage for Time-Series Blob Data";
  const description =
    "Store images, sensor data, and logs in the cloud. Replicate from edge devices with S3 backend. Faster and more cost-effective than traditional time-series databases.";
  return (
    <Layout title={title} description={description}>
      <main>
        <SimpleHeaderWithButton
          scrollToId="cloud-signup"
          title={title}
          subtitle={description}
          benefits={[
            "S3-Compatible Backend",
            "Edge-to-Cloud Replication",
            "On Your Infrastructure or Ours",
          ]}
          imageSrc="/img/solutions/cloud/cloud.png"
          imageAlt="Cloud Storage"
        />
        <div className="container">
          <>
            {diagrams.map((diagram, index) => (
              <UseCaseRow
                key={diagram.title}
                title={diagram.title}
                description={diagram.description}
                illustration={diagram.image}
                isImageLeft={index % 2 === 0}
              >
                {diagram.component}
              </UseCaseRow>
            ))}
          </>
          <div id="cloud-signup" className={styles.signUpSection}>
            <DemoServerForm title="Cloud Signup" defaultPlan="SaaS" />
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
    title: "S3-Compatible Backend",
    description: (
      <p>
        Use any S3-compatible storage as the backend: AWS S3, Google Cloud
        Storage, Azure Blob, MinIO. Local cache for recent data, cloud storage
        for long-term retention.
      </p>
    ),
    image: require("@site/static/img/solutions/cloud/lowest-cost.png").default,
  },
  {
    title: "Performance Benchmarks",
    description: (
      <p>
        ReductStore outperforms traditional time-series databases and object
        storage for blob data. For example 100KB images: 10x faster writes than
        TimescaleDB and 15x faster reads than MinIO.
      </p>
    ),
    component: <PerformanceComparison />,
  },
  {
    title: "Edge-to-Cloud Replication",
    description: (
      <p>
        Replicate data from edge devices to cloud storage. Filter by labels and
        metadata to sync only what matters. Works with limited bandwidth and
        intermittent connectivity.
      </p>
    ),
    image: require("@site/static/img/solutions/cloud/scale-to-petabytes.png")
      .default,
  },
  {
    title: "Extensible Query Engine",
    description: (
      <p>
        Process data on the storage side during queries. Built-in extensions for
        CSV column selection, JSON parsing, and image scaling. ROS message
        decoding for robotics. Custom extensions on demand.
      </p>
    ),
    image: require("@site/static/img/solutions/cloud/faster-performance.png")
      .default,
  },
  {
    title: "Grafana Integration",
    description: (
      <p>
        Visualize time-series blob data in Grafana dashboards. Query images,
        sensor readings, and logs directly. Monitor data pipelines and
        replication status.
      </p>
    ),
    image: require("@site/static/img/solutions/cloud/cloud.png").default,
  },
  {
    title: "Robotics Support",
    description: (
      <p>
        ReductStore Agent for ROS2 records topics directly to storage. Foxglove
        integration for visualization and debugging. Store camera feeds, LiDAR
        scans, and sensor data with timestamps.
      </p>
    ),
    image: require("@site/static/img/solutions/cloud/cloud.png").default,
  },
];

const cloudFaqs = [
  {
    question: "What deployment options are available?",
    answer:
      "Deploy on your own infrastructure (AWS, GCP, Azure, on-prem) or use our managed cloud. Same software, same features.",
  },
  {
    question: "How does edge-to-cloud replication work?",
    answer:
      "Set up replication tasks to sync data from edge instances to cloud. Filter by labels to replicate only relevant data. Handles intermittent connectivity automatically.",
  },
  {
    question: "What S3-compatible backends are supported?",
    answer:
      "AWS S3, Google Cloud Storage, Azure Blob Storage, MinIO, and any S3-compatible object storage.",
  },
  {
    question: "How does data security work?",
    answer:
      "Token-based authentication, TLS encryption in transit, and your data stays in your infrastructure if you choose self-hosted deployment.",
  },
];
