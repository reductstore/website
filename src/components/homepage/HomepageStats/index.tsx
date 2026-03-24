import React from "react";
import styles from "./styles.module.css";

const stats = [
  { value: "60k+", description: "downloads" },
  { value: "100+", description: "production deployments" },
  { value: "1+ PB", description: "time series data managed" },
  { value: "99.99%", description: "uptime across production deployments" },
  {
    value: "10x",
    description: "faster writes for 100 KB records than TimescaleDB",
  },
  { value: "15x", description: "faster reads for 100 KB records than MinIO" },
  { value: "90%", description: "lower cloud cost by batching 100 KB records" },
  { value: "4+", description: "years of active development" },
];

function HomepageStats() {
  return (
    <section className={styles.statsSection}>
      <div className="container">
        <h2 className={styles.statsTitle}>Developers choose ReductStore</h2>
        <p className={styles.statsSubheader}>
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
