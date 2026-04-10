import React from "react";
import type { JSX } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import SimpleHeader from "@site/src/components/shared/SimpleHeader";
import DemoLicenseForm from "@site/src/components/forms/DemoLicenseForm";
import Faq from "@site/src/components/shared/Faq";
import BulletPointItem from "@site/src/components/shared/BulletPointItem";
import styles from "./styles.module.css";
import clsx from "clsx";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {
  LuRadioTower,
  LuTags,
  LuMonitorDot,
  LuCloud,
  LuWrench,
  LuShieldCheck,
} from "react-icons/lu";

const services = [
  {
    icon: LuRadioTower,
    title: "Protocol Integration",
    description: "MQTT, ROS1 and ROS2, zenoh, and custom protocols for robotics and IIoT data ingestion.",
  },
  {
    icon: LuTags,
    title: "AI Orchestration",
    description:
      "Automated orchestration workflows to process and annotate your data.",
  },
  {
    icon: LuMonitorDot,
    title: "Dashboards",
    description: "Grafana and Foxglove dashboards for data visualization and monitoring.",
  },
  {
    icon: LuCloud,
    title: "Infrastructure",
    description: "AWS, Google Cloud, Azure, or Hetzner.",
  },
  {
    icon: LuWrench,
    title: "Pipeline Setup",
    description: "From edge ingestion to cloud storage and analysis.",
  },
  {
    icon: LuShieldCheck,
    title: "Production Support",
    description: "SLA-backed support, architecture reviews, and maintenance.",
  },
];

const demoLicenseFaqs = [
  {
    question: "What does the demo license include?",
    answer:
      "Full access to all ReductStore Pro features for 30 days, including extensions, cloud storage backends, replication, and commercial support.",
  },
  {
    question: "How long is the demo license valid?",
    answer:
      "30 days by default. Contact us if you need more time for evaluation.",
  },
  {
    question: "What happens when the demo license expires?",
    answer:
      "The database continues running without data loss. Pro features show license warnings in CLI, Web Console, and SDKs until a valid license is applied.",
  },
  {
    question: "What is a co-development project?",
    answer:
      "We work with your engineering team to set up a full data pipeline, from protocol integration and data ingestion to AI orchestration workflows, dashboards, and cloud infrastructure.",
  },
  {
    question: "Which protocols and platforms do you support?",
    answer:
      "MQTT, ROS, zenoh, and custom protocols. For visualization: Grafana, Foxglove. Infrastructure: AWS, Google Cloud, Azure, or Hetzner.",
  },
  {
    question: "Do I need a demo license for ReductStore Core?",
    answer: (
      <>
        No. ReductStore Core is open source under Apache-2.0 and free to use.
        The demo license is only for ReductStore Pro features. See the{" "}
        <Link to="/pricing">
          <strong>Pricing</strong>
        </Link>{" "}
        page for details.
      </>
    ),
  },
];

export default function DemoLicensePage(): JSX.Element {
  return (
    <Layout
      title="Demo License"
      description="Get a free ReductStore Pro demo license and explore co-development services for robotics and industrial IoT data pipelines."
    >
      <main>
        <SimpleHeader pageTitle="Demo License" />
        <div className={clsx("container", styles.pageContainer)}>
          {/* Intro */}
          <h2 className={styles.sectionTitle}>Co-Development and Licensing</h2>
          <p className={styles.introText}>
            Get a free 30 day ReductStore Pro license with full access to all
            commercial features. We also offer co-development projects at a
            preferred rate to help you build production-ready data pipelines.
          </p>

          {/* Service cards */}
          <section className={styles.servicesSection}>
            <div className={styles.servicesGrid}>
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div key={index} className={styles.serviceCard}>
                    <div className={styles.serviceIcon}>
                      <IconComponent size={32} />
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* What you get + Form */}
          <div className="row">
            <div className="col col--5">
              <p className={styles.bulletTitle}>What you get</p>
              <p className={styles.bulletSubtitle}>
                A full ReductStore Pro evaluation license for 30 days, no credit
                card required.
              </p>
              <ul className={styles.bulletPoints}>
                <BulletPointItem>
                  Full access to all Pro extensions
                </BulletPointItem>
                <ul className={styles.subBulletPoints}>
                  <BulletPointItem icon={faArrowRight} size="xs">
                    CSV and JSON column selection during queries
                  </BulletPointItem>
                  <BulletPointItem icon={faArrowRight} size="xs">
                    MCAP/ROS topic filtering and rosbag support
                  </BulletPointItem>
                </ul>
                <BulletPointItem>Cloud object storage backend</BulletPointItem>
                <ul className={styles.subBulletPoints}>
                  <BulletPointItem icon={faArrowRight} size="xs">
                    S3, Azure Blob Storage, and Google Cloud Storage
                  </BulletPointItem>
                  <BulletPointItem icon={faArrowRight} size="xs">
                    Batching to reduce API calls and cost
                  </BulletPointItem>
                </ul>
                <BulletPointItem>
                  Replication between edge and cloud instances
                </BulletPointItem>
                <BulletPointItem>
                  Web Console and CLI without license warnings
                </BulletPointItem>
                <BulletPointItem>
                  Commercial support with guaranteed response times
                </BulletPointItem>
                <BulletPointItem>Architecture review session</BulletPointItem>
              </ul>
              <p className={styles.bulletTitle}>Co-development</p>
              <ul className={styles.bulletPoints}>
                <BulletPointItem>
                  Available at a preferred rate
                </BulletPointItem>
                <BulletPointItem>
                  Full pipeline setup from edge ingestion to cloud
                </BulletPointItem>
                <BulletPointItem>
                  Protocol integration, AI orchestration, dashboards
                </BulletPointItem>
              </ul>
              <p className={styles.cloudNote}>
                Need a cloud-hosted instance instead?{" "}
                <Link to="/solutions/cloud">
                  <strong>Get a demo server</strong>
                </Link>
              </p>
            </div>

            <div className="col col--7">
              <div className={styles.formColumn}>
                <DemoLicenseForm />
              </div>
            </div>
          </div>

          {/* FAQ */}
          <section className={styles.faqSection}>
            <SimpleHeader
              pageTitle="Frequently Asked Questions"
              pageTitleAs="h2"
            />
            <Faq faqs={demoLicenseFaqs} defaultOpenCount={3} />
          </section>
        </div>
      </main>
    </Layout>
  );
}
