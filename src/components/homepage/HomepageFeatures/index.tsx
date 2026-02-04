import React from "react";
import {
  LuTimer,
  LuInfinity,
  LuGauge,
  LuTags,
  LuLayers,
  LuRefreshCw,
  LuSearch,
  LuKey,
  LuPuzzle,
} from "react-icons/lu";
import styles from "./styles.module.css";

function Feature({ IconComponent, title, description }) {
  return (
    <div className="col col--4">
      <div className={styles.feature}>
        <div className={styles.featureIcon}>
          <IconComponent />
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
          IconComponent={LuTimer}
          title="Multimodal Time Series Storage"
          description="Store time ordered records of any type and size: log files, images, video, LiDAR, ROS bags and more."
        />
        <Feature
          IconComponent={LuTags}
          title="Labels and Filtering"
          description="Attach labels to records and filter reads and replication to keep only the data you need."
        />
        <Feature
          IconComponent={LuRefreshCw}
          title="Selective Edge to Cloud Replication"
          description="Replicate using rules based on labels or events, even with limited bandwidth and intermittent connectivity."
        />
      </div>

      <div className="row">
        <Feature
          IconComponent={LuLayers}
          title="Batching for Lower Cloud Cost"
          description="Batch records into fewer objects for S3 compatible storage to reduce API overhead and cloud cost."
        />
        <Feature
          IconComponent={LuInfinity}
          title="No Hard Size Limits"
          description="Handle small sensor samples to large blobs like video clips, frames, point clouds, and files."
        />
        <Feature
          IconComponent={LuGauge}
          title="Retention and Quotas"
          description="FIFO quotas based on volume keep edge disks from filling up and maintain a rolling window of recent data."
        />
      </div>

      <div className="row">
        <Feature
          IconComponent={LuSearch}
          title="Fast Event Retrieval"
          description="Query exact time ranges and filter by labels to replay events and debug without scanning hour long logs."
        />
        <Feature
          IconComponent={LuPuzzle}
          title="Extensible Query Engine"
          description="Use extensions to transform data during queries, like resizing images, filtering CSV, or extracting ROS topics."
        />
        <Feature
          IconComponent={LuKey}
          title="Token Authorization"
          description="Secure access for devices and services with token based authorization."
        />
      </div>
    </section>
  );
}
