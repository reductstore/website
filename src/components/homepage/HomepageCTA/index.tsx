import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";
import Heading from "@theme/Heading";
import clsx from "clsx";

function HomepageCTA() {
  return (
    <section className={styles.section}>
      <Heading as="h2" className={styles.title}>
        A data backbone for robotics and industrial IoT
      </Heading>
      <p>
        Learn how ReductStore helps robotics and industrial teams store images,
        sensor data, and logs on edge devices, then replicate to on-prem or
        cloud. With benchmarks and comparisons vs. TimescaleDB, MongoDB, and
        MinIO.
      </p>
      <Link
        className={clsx("button button--lg", styles.button)}
        to="/whitepaper"
      >
        Download White Paper (PDF)
      </Link>
    </section>
  );
}

export default HomepageCTA;
