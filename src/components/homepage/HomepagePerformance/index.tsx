import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";
import PerformanceComparison from "@site/src/components/tables/PerformanceComparison";

function HomepagePerformance() {
  return (
    <div className={styles.performanceSection}>
      <div className={clsx("row", styles.row)}>
        <div className={"col col--6 text--center"}>
          <h2 className="hideOnMobile">High Performance</h2>
          <p>
            Optimized for robotics and industrial workloads. 100KB images: 10x
            faster writes than TimescaleDB, 16x faster reads than MinIO.
          </p>
          <Link
            className={clsx("button button--primary button--lg", styles.btn)}
            to="/blog/tags/comparison"
          >
            See Benchmarks →
          </Link>
        </div>
        <div className="col col--6">
          <PerformanceComparison />
        </div>
      </div>
    </div>
  );
}

export default HomepagePerformance;
