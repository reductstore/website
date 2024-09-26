import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";
import Heading from "@theme/Heading";

function HomepageCTA() {
  return (
    <section className={styles.section}>
      <Heading as="h2">
        The Fastest Time Series Object Store for Edge AI
      </Heading>
      <p>
        Discover why ReductStore is the top choice for AI and edge computing
        applications.
      </p>
      <Link className="button button--primary button--lg" to="/whitepaper">
        Download our White Paper
      </Link>
    </section>
  );
}

export default HomepageCTA;
