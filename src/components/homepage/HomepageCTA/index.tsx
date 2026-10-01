import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";
import Heading from "@theme/Heading";
import clsx from "clsx";

function HomepageCTA() {
  return (
    <section className={styles.section}>
      <Heading as="h2" className={styles.title}>
        Start with one machine, scale to the fleet
      </Heading>
      <p>
        Run ReductStore on a single device in minutes, or talk to us about how
        it fits your robots, factory, or cloud.
      </p>
      <div className={styles.buttons}>
        <Link
          className={clsx("button button--lg", styles.button)}
          to="/docs/getting-started"
        >
          Get started
        </Link>
        <Link
          className={clsx("button button--lg", styles.buttonSecondary)}
          to="/architecture-review"
        >
          Book an architecture review
        </Link>
      </div>
    </section>
  );
}

export default HomepageCTA;
