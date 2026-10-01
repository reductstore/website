import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";
import Heading from "@theme/Heading";
import clsx from "clsx";

function HomepageCTA() {
  return (
    <section className={styles.section}>
      <Heading as="h2" className={styles.title}>
        Go deeper with the white paper
      </Heading>
      <p>
        The architecture, benchmarks against MinIO, TimescaleDB, and MongoDB,
        and three use cases end to end: robotics, industrial IoT, and drones.
      </p>
      <Link
        className={clsx("button button--lg", styles.button)}
        to="/whitepaper"
      >
        Read the white paper
      </Link>
    </section>
  );
}

export default HomepageCTA;
