import React from "react";
import styles from "./styles.module.css";
import clsx from "clsx";
import Link from "@docusaurus/Link";

const stats = [
  { value: "+40K", description: "downloads" },
  {
    value: "+20",
    description: "instances installed in production environment",
  },
  { value: "+1 PT", description: "of data managed" },
  { value: "+5", description: "happy customers" },
];

function HomepageStats() {
  return (
    <section className={clsx("hero hero--primary", styles.statsSection)}>
      <div className="container">
        <h2 className="hero__title">Developers choose ReductStore</h2>
        <p className={clsx("hero__subtitle", styles.statsSubheader)}>
          Trusted by developers to process unstructured time series data at
          10-100x the speed and 1/10th the cost of any other time series
          database.
        </p>
        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statDescription}>{stat.description}</div>
            </div>
          ))}
        </div>
        <Link
          className={clsx("button button--outline button--lg", styles.btn)}
          to="/docs/getting-started"
        >
          Try ReductStore →
        </Link>
      </div>
    </section>
  );
}

export default HomepageStats;
