import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";
import Heading from '@theme/Heading';

// white paper download call to action
function HomepageCTA() {
  return (
    <section className={styles.section}>
      <Heading as="h1">Download our White Paper</Heading>
      <p >
        Learn more about ReductAI and how it can help you simplify your data infrastructure.
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
