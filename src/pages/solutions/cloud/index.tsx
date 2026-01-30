import React, { JSX } from "react";
import Layout from "@theme/Layout";
import styles from "./styles.module.css";
import Faq from "@site/src/components/shared/Faq";
import HeroBanner from "@site/src/components/shared/HeroBanner";
import DemoServerForm from "@site/src/components/forms/DemoServerForm";
import { LuDatabase, LuGlobe, LuShield } from "react-icons/lu";
import CloudMainDiagram from "@site/static/img/solutions/cloud/cloud-main.drawio.svg";

export default function CloudSolution(): JSX.Element {
  const title = "Cloud Storage for Robotics and Industrial Workloads";
  const description =
    "Run on AWS, GCP, Hetzner, or on-prem. S3 backend with batching. High availability supported.";
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
          imageSvg={CloudMainDiagram}
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
      "Active-passive fault tolerant deployment with scalable read-only replicas. Zero-downtime updates. Built for production.",
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
      "Self-hosted on AWS, GCP, Hetzner, or on-prem. Managed cloud option on our infrastructure available. Active-passive fault tolerance with scalable read-only replicas supported.",
  },
];
