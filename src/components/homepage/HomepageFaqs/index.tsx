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
    question:
      "How does the database scale, and what are the infrastructure requirements for scaling up?",
    answer: (
      <p>
        ReductStore is built for scalability, designed to efficiently manage
        large data volumes typical in edge computing and AI/ML workflows. It
        combines blob and time-series data functionalities, enabling the system
        to handle billions of time-stamped blobs. Scaling up primarily involves
        expanding disk capacity. The system's architecture supports low-latency
        access with iterator and range query capabilities, ensuring optimal
        performance at scale. More information about the architecture can be
        found in the{" "}
        <strong>
          <Link to="/docs/how-does-it-work">How Does It Work</Link>
        </strong>{" "}
        section of the documentation.
      </p>
    ),
  },
  {
    question:
      "Are there any customization options for data retention and replication policies?",
    answer: (
      <p>
        Yes, ReductStore includes several customizable features for managing
        data, one of which is the First In, First Out (FIFO) approach. This
        method is specifically designed to handle data based on volume
        intervals, ensuring that as new entries are added, older ones are
        systematically removed to prevent disk space issues. Additionally, AI
        labels can be attached to blobs as metadata, helping in the
        identification and replication of key data, thus ensuring vital
        information is retained. These functionalities are all accessible
        through the{" "}
        <strong>
          <Link to="https://cli.reduct.store">ReductStore CLI</Link>
        </strong>
        , making the management of data retention and replication
        straightforward and effective.
      </p>
    ),
  },
  {
    question:
      "Is it compatible with popular programming languages and data formats?",
    answer: (
      <p>
        Yes, ReductStore ensures compatibility with a variety of programming
        languages via its HTTP(S) API. Being a blob storage system, it supports
        the storage of all types of unstructured data in byte form, making it
        straightforward to incorporate into your existing setups and manage a
        wide range of data.
      </p>
    ),
  },
  {
    question:
      "How does the database ensure data compliance, especially for sensitive or regulated industries?",
    answer: (
      <p>
        ReductStore is dedicated to ensuring data compliance, particularly for
        sensitive or regulated industries, and is well-suited for both edge
        computing and on-premise environments. It provides strict retention
        policy, token-based authorization for secure access, and data
        replication capabilities to facilitate disaster recovery. These features
        work together to align with industry standards and meet regulatory
        demands, ensuring the protection and integrity of your data.
      </p>
    ),
  },
  {
    question:
      "How does the licensing work, and are there different tiers or plans available?",
    answer: (
      <p>
        ReductStore offers a flexible licensing model designed to meet the needs
        of various users, from startups to large enterprises. Our tiered pricing
        structure allows you to choose a plan that best suits your project's
        scale and complexity. You can find detailed breakdowns of what each tier
        offers on our{" "}
        <strong>
          <Link to="/pricing">Pricing</Link>
        </strong>{" "}
        page, aiding in your decision-making process. We employ the Business
        Source License (BUSL) to provide a middle ground between the
        collaborative spirit of open source and the practical needs of
        commercial ventures. For more insights into our licensing, please visit
        our{" "}
        <strong>
          <Link to="https://github.com/reductstore/reductstore/blob/main/LICENSE">
            GitHub License page
          </Link>
        </strong>
        .
      </p>
    ),
  },
  {
    question:
      "What kind of support is available for developers and administrators?",
    answer: (
      <p>
        ReductStore provides a variety of support options for developers and
        administrators, tailored to the plan selected on our{" "}
        <strong>
          <Link to="/pricing">Pricing</Link>
        </strong>{" "}
        page. For community-driven assistance and sharing of insights, you can
        join us on{" "}
        <strong>
          <Link to="https://community.reduct.store/signup">Discourse</Link>
        </strong>{" "}
        or engage in discussions on{" "}
        <strong>
          <Link to="https://github.com/reductstore/reductstore">GitHub</Link>
        </strong>
        . Our direct support includes email, chat, and video calls, with
        response times based on the plan selected. We also provide long-term
        release support and offer architecture review services to ensure your
        infrastructure is perfectly aligned with your operational requirements.
      </p>
    ),
  },
];
