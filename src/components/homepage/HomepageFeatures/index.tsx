import React from "react";
import {
  FaClock,
  FaInfinity,
  FaTachometerAlt,
  FaTags,
  FaLayerGroup,
  FaSync,
  FaSearch,
  FaKey,
  FaPuzzlePiece,
} from "react-icons/fa";
import styles from "./styles.module.css";

function Feature({ IconComponent, title, description }) {
  return (
    <div className="col col--4">
      <div className={styles.feature}>
        <div className={styles.featureIcon}>
          <IconComponent
            size="3em"
            style={{ color: "var(--ifm-color-primary)" }}
          />
        </div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="row">
        <Feature
          IconComponent={FaClock}
          title="Time Series Blob Storage"
          description="Capture and access blob data as time series, tailored for edge computing, computer vision, and IoT."
        />
        <Feature
          IconComponent={FaInfinity}
          title="No Size Limit for Blobs"
          description="ReductStore handles blob data without size limits; your disk capacity is the only boundary."
        />
        <Feature
          IconComponent={FaTachometerAlt}
          title="Real-Time FIFO Quota"
          description="Ensure optimal storage management with FIFO quotas, preventing disk space shortages in real-time."
        />
      </div>
      <div className="row">
        <Feature
          IconComponent={FaTags}
          title="Data Labeling & Filtering"
          description="Manage your time-series blob data with ease: annotate, filter, and save AI labels or meta-data."
        />
        <Feature
          IconComponent={FaPuzzlePiece}
          title="Extensible Query Engine"
          description="Extend ReductStore with plugins that transform data during queries—filter CSVs, resize images, search text, and more."
        />
        <Feature
          IconComponent={FaLayerGroup}
          title="Efficient Data Batching"
          description="Minimize network overhead in areas with high latency by fetching records in batched HTTP responses."
        />
      </div>
      <div className="row">
        <Feature
          IconComponent={FaSync}
          title="Data Replication"
          description="Synchronize data across buckets with replication for high availability and disaster recovery."
        />
        <Feature
          IconComponent={FaSearch}
          title="Iterative Data Querying"
          description="Efficiently queries large datasets with minimal load for real-time and historical data processing."
        />
        <Feature
          IconComponent={FaKey}
          title="Token Authorization"
          description="Secure data access with token-based authorization to protect your data from unauthorized access."
        />
      </div>
    </section>
  );
}
