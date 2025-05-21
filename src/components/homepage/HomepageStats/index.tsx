import React from "react";
import styles from "./styles.module.css";
import clsx from "clsx";

const stats = [
  { value: "+60K", description: "downloads" },
  { value: "+100", description: "production deployments" },
  { value: "+1 PT", description: "of time-series data managed" },
  { value: "99.99%", description: "uptime across all deployments" },
  {
    value: "+603%",
    description: "faster read operations than Timescale for 100KB records",
  },
  {
    value: "+924%",
    description: "faster write operations than Timescale for 100KB records",
  },
  {
    value: "~90%",
    description: "reduction in cloud storage costs compared to Timescale",
  },
];

function HomepageStats() {
  return (
    <section className={clsx("hero hero--primary", styles.statsSection)}>
      <div className="container">
        <h2 className="hero__title">Developers choose ReductStore</h2>
        <p className={clsx("hero__subtitle", styles.statsSubheader)}>
          Trusted by robotics and IIoT engineers to process billions of
          time-indexed records
        </p>
        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statDescription}>{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomepageStats;
