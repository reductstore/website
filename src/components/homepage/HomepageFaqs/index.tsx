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
        on-prem servers or cloud with cloud object storage backend. Learn more
        in the{" "}
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
          <Link to="/docs/next/integrations/cloud-storage">
            Cloud Storage Integration
          </Link>
        </strong>{" "}
        guide.
      </p>
    ),
  },
  {
    question: "What deployment options are available?",
    answer: (
      <p>
        Self-managed with ReductStore Core, self-hosted with ReductStore Pro, or
        managed cloud on our infrastructure. Core and Pro share the same storage
        engine, while Pro adds commercial components and support. Check our{" "}
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
        ReductStore Core is available under Apache-2.0. ReductStore Pro covers
        commercial components and support, and any ReductStore instance that
        replicates data to or from a Pro deployment must also be covered by a
        Pro commercial license unless approved otherwise in writing. See our{" "}
        <strong>
          <Link to="/terms">Terms</Link>
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
        . ReductStore Pro plans include direct support with guaranteed response
        times. See{" "}
        <strong>
          <Link to="/pricing">Pricing</Link>
        </strong>{" "}
        for plan details.
      </p>
    ),
  },
];
