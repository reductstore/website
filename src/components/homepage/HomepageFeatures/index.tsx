import React from "react";
import {
  LuTimer,
  LuInfinity,
  LuGauge,
  LuTags,
  LuLayers,
  LuRefreshCw,
  LuSearch,
  LuDatabase,
  LuPuzzle,
} from "react-icons/lu";
import styles from "./styles.module.css";

function Feature({ IconComponent, title, description }) {
  return (
    <div className={styles.feature}>
      <div className={styles.featureIcon}>
        <IconComponent />
      </div>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureDescription}>{description}</p>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className={styles.grid}>
        <Feature
          IconComponent={LuTimer}
          title="Multimodal Time-Indexed Storage"
          description="Store records of any type and size, indexed by time: log files, images, video, LiDAR, ROS bags and more."
        />
        <Feature
          IconComponent={LuDatabase}
          title="SQL with DataFusion"
          description="Run SQL on JSON, CSV, Parquet, and Protobuf records on the server and export the results as bigger batches."
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
      </div>
    </section>
  );
}
