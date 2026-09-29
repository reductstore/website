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
        ReductStore is time-indexed storage for robotics and industrial IoT
        data: camera frames, LiDAR scans, sensor readings, ROS messages, and
        logs. Each record is stored unchanged with its timestamp and labels. Run
        it on the robot or edge device, then replicate the data that matters to
        an on-prem server or the cloud. Learn more in{" "}
        <strong>
          <Link to="/docs/how-does-it-work">How Does It Work</Link>
        </strong>
        .
      </p>
    ),
  },
  {
    question: "How is it different from a time-series database?",
    answer: (
      <p>
        Time-series databases such as InfluxDB and TimescaleDB are built for
        small numeric values. ReductStore stores each record as a binary payload
        of any size, with a content type, indexed by time and labels. Many teams
        use both: metrics and dashboards in the time-series database, raw sensor
        data in ReductStore. See{" "}
        <strong>
          <Link to="/blog/influxdb-robotics-sensor-data">
            InfluxDB for Robotics Sensor Data
          </Link>
        </strong>
        .
      </p>
    ),
  },
  {
    question: "How do I query data?",
    answer: (
      <p>
        Query records by time range and filter them with{" "}
        <strong>
          <Link to="/docs/conditional-query">conditional queries</Link>
        </strong>{" "}
        on their labels. Extensions process data on the storage side: ReductROS
        exports ROS 1 and ROS 2 records as JSON or MCAP, and ReductSelect runs
        SQL over CSV, JSON, and Parquet. See the{" "}
        <strong>
          <Link to="/docs/guides/data-querying">Data Querying</Link>
        </strong>{" "}
        guide.
      </p>
    ),
  },
  {
    question: "What happens when the disk is full?",
    answer: (
      <p>
        Set a quota on each bucket. A FIFO quota removes the oldest records to
        make room for new ones, so a robot keeps recording without manual
        cleanup. A HARD quota rejects new records instead. See{" "}
        <strong>
          <Link to="/docs/guides/buckets">Buckets</Link>
        </strong>
        .
      </p>
    ),
  },
  {
    question: "How does replication work?",
    answer: (
      <p>
        A replication task sends new records from a bucket to another
        ReductStore instance, on-prem or in the cloud. Filter by labels to
        replicate only what matters. Records wait in a transaction log, so when
        the connection drops, replication resumes once it is back. See the{" "}
        <strong>
          <Link to="/docs/guides/data-replication">Data Replication</Link>
        </strong>{" "}
        guide.
      </p>
    ),
  },
  {
    question: "Can I store data in cloud object storage?",
    answer: (
      <p>
        Yes, with ReductStore Pro. Use Amazon S3 or any S3-compatible storage
        such as MinIO, Ceph, or Cloudflare R2, or Azure Blob Storage, with a
        local cache that keeps recent data close to the node. See{" "}
        <strong>
          <Link to="/docs/integrations/cloud-storage">Cloud Storage</Link>
        </strong>
        .
      </p>
    ),
  },
  {
    question: "Does it work with ROS?",
    answer: (
      <p>
        Yes.{" "}
        <strong>
          <Link to="/docs/reduct-bridge">ReductBridge</Link>
        </strong>{" "}
        collects data from ROS 1, ROS 2, MQTT, HTTP, system metrics, and shell
        commands and writes it to ReductStore with labels. The ReductROS
        extension exports recordings as MCAP or JSON. See{" "}
        <strong>
          <Link to="/docs/ros">ReductStore for ROS</Link>
        </strong>
        .
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
    question: "What deployment options are available?",
    answer: (
      <p>
        Free runs the open source ReductStore on your own hardware. Pro is
        self-hosted too, at €0.015 per GB per month on peak storage with a 1 TB
        minimum, and adds commercial components and support. Enterprise is
        either Cloud Enterprise, hosted by us, or Cloud Self-hosted, which works
        fully offline. See{" "}
        <strong>
          <Link to="/pricing">Pricing</Link>
        </strong>{" "}
        for details.
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
        Community support is available on{" "}
        <strong>
          <Link to="https://community.reduct.store/">Discourse</Link>
        </strong>
        . Pro adds long-term support releases, architecture review, and
        deployment assistance. Enterprise adds custom support and an SLA. See{" "}
        <strong>
          <Link to="/pricing">Pricing</Link>
        </strong>{" "}
        for plan details.
      </p>
    ),
  },
];
