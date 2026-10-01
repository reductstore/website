import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";
import Heading from "@theme/Heading";
import clsx from "clsx";
import { LuDownload } from "react-icons/lu";
import { track } from "@site/src/lib/analytics";

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
      <div className={styles.buttons}>
        <Link
          className={clsx("button button--lg", styles.button)}
          to="/whitepaper"
        >
          Read the white paper
        </Link>
        <a
          className={clsx("button button--lg", styles.buttonSecondary)}
          href="/pdf/whitepaper/ReductStore_WhitePaper.pdf"
          download
          onClick={() => track("whitepaper_download", { how: "homepage" })}
        >
          <LuDownload aria-hidden="true" className={styles.icon} />
          Download PDF
        </a>
      </div>
    </section>
  );
}

export default HomepageCTA;
