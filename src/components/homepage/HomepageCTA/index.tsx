import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";
import Heading from "@theme/Heading";

function HomepageCTA() {
  return (
    <section className={styles.section}>
      <Heading as="h2">
        Time-Series Blob Storage for Robotics & Industrial IoT
      </Heading>
      <p>
        Learn how ReductStore helps robotics and industrial teams store images,
        sensor data, and logs on edge devices, then replicate to on-prem or
        cloud. With benchmarks and comparisons vs. TimescaleDB, MongoDB, and
        MinIO.
      </p>
      <Link className="button button--primary button--lg" to="/whitepaper">
        Download White Paper (PDF)
      </Link>
    </section>
  );
}

export default HomepageCTA;
