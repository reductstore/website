import React, { JSX } from "react";
import Layout from "@theme/Layout";
import ThemedImage from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";
import UseCaseRow from "@site/src/components/useCases/UseCaseRow";
import Faq from "@site/src/components/shared/Faq";
import HeroBanner from "@site/src/components/shared/HeroBanner";
import DemoServerForm from "@site/src/components/forms/DemoServerForm";
import PerformanceComparison from "@site/src/components/tables/PerformanceComparison";
import { LuDatabase, LuGlobe, LuShield } from "react-icons/lu";

export default function CloudSolution(): JSX.Element {
  const title = "Cloud Storage for Robotics and Industrial Workloads";
  const description =
    "Run on AWS, GCP, Hetzner, or on-prem. S3 backend with batching. High availability supported.";
  const sectionsWithImages = [
    {
      title: "Observability",
      description: (
        <p>
          Visualize time-series data in Grafana dashboards. Query labels and
          content of records (e.g. CSV columns, JSON fields, ROS message
          fields). Set up alerts for anomalies.
        </p>
      ),
      image: useBaseUrl("/img/solutions/cloud/grafana.png"),
    },
    {
      title: "Robotics Support",
      description: (
        <p>
          ReductStore Agent records ROS2 topics directly to storage. Store
          camera feeds, LiDAR scans, and sensor data with timestamps. Foxglove
          for visualization and debugging.
        </p>
      ),
      image: (
        <ThemedImage
          sources={{
            light: useBaseUrl(
              "/img/solutions/cloud/cloud-robotics-light.drawio.svg",
            ),
            dark: useBaseUrl(
              "/img/solutions/cloud/cloud-robotics-dark.drawio.svg",
            ),
          }}
          alt="Robotics Support"
        />
      ),
    },
  ];
  return (
    <Layout title={title} description={description}>
      <main>
        <HeroBanner
          scrollToId="cloud-signup"
          title={title}
          subtitle={description}
          benefits={[
            "Any Infrastructure",
            "S3 Backend with Batching",
            "High Availability",
          ]}
          imageSrcDark="/img/solutions/cloud/cloud-main-dark.drawio.svg"
          imageSrcLight="/img/solutions/cloud/cloud-main-light.drawio.svg"
          imageAlt="Cloud Storage"
        />
        <div className="container">
          {/* Feature Cards */}
          <div className={styles.featureCards}>
            {features.map((feature) => (
              <div key={feature.title} className={styles.featureCard}>
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Performance Section */}
          <UseCaseRow
            title="High Performance"
            description={
              <p>
                Optimized for robotics and industrial workloads. 100KB images:
                10x faster writes than TimescaleDB, 16x faster reads than MinIO.
              </p>
            }
            isImageLeft={false}
          >
            <PerformanceComparison />
          </UseCaseRow>

          {/* Sections with images */}
          {sectionsWithImages.map((section, index) => (
            <UseCaseRow
              key={section.title}
              title={section.title}
              description={section.description}
              illustration={section.image}
              isImageLeft={index % 2 === 0}
            />
          ))}

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

const features = [
  {
    title: "S3 Backend with Batching",
    description:
      "Store data on any S3-compatible storage. Batches small records into larger blobs to reduce API calls and costs.",
    icon: <LuDatabase size={32} />,
  },
  {
    title: "Run Anywhere",
    description:
      "Deploy on AWS, Google Cloud, Hetzner, or on-prem with MinIO. Switch infrastructure when needed. Same API everywhere.",
    icon: <LuGlobe size={32} />,
  },
  {
    title: "High Availability",
    description:
      "Run multiple instances for redundancy. Blue-green deployments for zero-downtime updates. Built for production.",
    icon: <LuShield size={32} />,
  },
];

const cloudFaqs = [
  {
    question: "What S3-compatible backends are supported?",
    answer:
      "AWS S3, Google Cloud Storage, MinIO, and any S3-compatible object storage.",
  },
  {
    question: "How does edge-to-cloud replication work?",
    answer:
      "Configure replication tasks to copy data from edge instances to cloud. Filter by labels. Handles intermittent connectivity automatically.",
  },
  {
    question: "What deployment options are available?",
    answer:
      "Self-hosted on AWS, GCP, Hetzner, or on-prem. Managed cloud option on our infrastructure available. High availability and blue-green deployments supported.",
  },
];
