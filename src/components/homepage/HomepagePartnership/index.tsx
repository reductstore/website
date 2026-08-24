import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";

function HomepagePartnership() {
  return (
    <div className={styles.partnershipSection}>
      <div className="row" style={{ display: "flex", alignItems: "center" }}>
        <div className="col col--12 text--center">
          <span className={styles.badge}>News</span>
          <h2>ReductStore and INSAION partner on edge recording</h2>
          <p className={styles.description}>
            ReductStore is the storage engine behind INSAION's edge recording.
            Robots capture camera, LiDAR, and control data locally with
            ReductStore, and INSAION adds fleet observability on top:
            dashboards, incident replay, and AI diagnostics.
          </p>
          <Link
            className={clsx("button button--primary button--lg", styles.btn)}
            to="/blog/news/reductstore-insaion-partnership"
          >
            Read the announcement →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomepagePartnership;
