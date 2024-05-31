import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";
import Heading from '@theme/Heading';

function HomepageCTA() {
  return (
    <section className={styles.section}>
      <Heading as="h2">AI on the Edge? Download our White Paper</Heading>
      <p >
        Learn more about ReductStore and how it can help you simplify your data infrastructure and AI/ML workflows.
      </p>
      <Link
        className="button button--primary button--lg"
        to="/whitepaper"
      >
        White Paper
      </Link>
    </section >
  );
}

export default HomepageCTA;
