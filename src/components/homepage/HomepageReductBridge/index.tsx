import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";
import BridgeDiagram from "@site/static/img/landing/reduct-bridge.drawio.svg";

function HomepageReductBridge() {
  return (
    <div className={styles.roboticsSection}>
      <div className={clsx("row", styles.row)}>
        <div className={"col col--5 text--center"}>
          <h2 className="hideOnMobile">Reduct Bridge</h2>
          <p>
            Collect data from multiple sources, label it automatically, and
            store it efficiently in ReductStore with ReductBridge.{" "}
          </p>
          <Link
            className={clsx("button button--primary button--lg", styles.btn)}
            to="/docs/reduct-bridge"
          >
            Learn More →
          </Link>
        </div>
        <div className="col col--7 text--center">
          <BridgeDiagram
            className={styles.roboticsImage}
            role="img"
            aria-label="Robotics Support"
          />
        </div>
      </div>
    </div>
  );
}

export default HomepageReductBridge;
