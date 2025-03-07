import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";
import Heading from "@theme/Heading";

function HomepageCTA() {
  return (
    <section className={styles.section}>
      <Heading as="h2">
        Efficient Time-Series Storage for AI & Edge Computing
      </Heading>
      <p>
        Learn how ReductStore outperforms traditional databases for AI and edge
        workloads.
      </p>
      <Link className="button button--primary button--lg" to="/whitepaper">
        Download White Paper (PDF)
      </Link>
    </section>
  );
}

export default HomepageCTA;
