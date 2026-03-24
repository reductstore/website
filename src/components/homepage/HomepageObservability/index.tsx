import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";

const GrafanaImage =
  require("@site/static/img/solutions/cloud/grafana.png").default;

function HomepageObservability() {
  return (
    <div className={styles.observabilitySection}>
      <div className="row" style={{ display: "flex", alignItems: "center" }}>
        <div className="col col--7 text--center">
          <img
            src={GrafanaImage}
            className={styles.grafanaImage}
            alt="Grafana Dashboard"
          />
        </div>
        <div className={"col col--5 text--center"}>
          <h2 className="hideOnMobile">Observability</h2>
          <p>
            Visualize time-series data in Grafana dashboards. Query labels and
            content of records (e.g. CSV columns, JSON fields, ROS message
            fields). Set up alerts for anomalies.
          </p>
          <Link
            className={clsx("button button--primary button--lg", styles.btn)}
            to="/docs/next/integrations/grafana"
          >
            Setup Grafana →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomepageObservability;
