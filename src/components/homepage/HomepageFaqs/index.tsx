import React from "react";
import styles from "./styles.module.css";
import Faq from "../../shared/Faq";
import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";

export default function HomepageFaqs() {
  return (
    <section className={styles.section}>
      <Heading as="h2" className={styles.sectionTitle}>
        Frequently Asked Questions
      </Heading>
      <Faq faqs={landingFaqs} defaultOpenCount={3} />
    </section>
  );
}

const landingFaqs = [
  {
    question: "What is ReductStore?",
    answer: (
      <p>
        ReductStore is a time-series database for blob data—images, sensor
        readings, rosbags, logs—designed for robotics and industrial
        applications. Store data on edge devices or robots, then replicate to
        on-prem servers or cloud with S3 backend. Learn more in the{" "}
        <strong>
          <Link to="/docs/how-does-it-work">How Does It Work</Link>
        </strong>{" "}
        section.
      </p>
    ),
  },
  {
    question: "How does replication work?",
    answer: (
      <p>
        Set up replication tasks to stream data from edge devices to another
        instance—on-prem or cloud. Supports high availability setups and S3
        backends for cloud deployments. See the{" "}
        <strong>
          <Link to="/docs/next/integrations/s3">S3 Integration</Link>
        </strong>{" "}
        guide.
      </p>
    ),
  },
  {
    question: "What deployment options are available?",
    answer: (
      <p>
        Fully on-premises, cloud on your infrastructure, or managed cloud on
        ours. All options support the same features. Check our{" "}
        <strong>
          <Link to="/pricing">Pricing</Link>
        </strong>{" "}
        page for details.
      </p>
    ),
  },
  {
    question: "What programming languages are supported?",
    answer: (
      <p>
        SDKs for Python, JavaScript, C++, Rust, and Go. Plus an HTTP API for any
        language and a CLI for scripting and automation.
      </p>
    ),
  },
  {
    question: "What is the license?",
    answer: (
      <p>
        BUSL-1.1 (Business Source License). Free for research, testing, and
        companies under $2M capital. Commercial license required for production
        use above that threshold. See our{" "}
        <strong>
          <Link to="https://github.com/reductstore/reductstore/blob/main/LICENSE">
            LICENSE
          </Link>
        </strong>{" "}
        for details.
      </p>
    ),
  },
  {
    question: "What support is available?",
    answer: (
      <p>
        Community support via{" "}
        <strong>
          <Link to="https://community.reduct.store/">Discourse</Link>
        </strong>{" "}
        . Commercial plans include direct support with guaranteed response
        times. See{" "}
        <strong>
          <Link to="/pricing">Pricing</Link>
        </strong>{" "}
        for plan details.
      </p>
    ),
  },
];
