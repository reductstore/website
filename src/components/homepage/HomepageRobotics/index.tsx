import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";
import RoboticsDiagram from "@site/static/img/landing/robotics-support.drawio.svg";

function HomepageRobotics() {
  return (
    <div className={styles.roboticsSection}>
      <div className={clsx("row", styles.row)}>
                <div className="col col--7 text--center">
          <RoboticsDiagram
            className={styles.roboticsImage}
            role="img"
            aria-label="Robotics Support"
          />
        </div>
        <div className={"col col--5 text--center"}>
          <h2 className="hideOnMobile">Robotics Support</h2>
          <p>
            ReductBridge records ROS2 topics directly to storage. Store
            camera feeds, LiDAR scans, and sensor data with timestamps. Foxglove
            for visualization and debugging.
          </p>
          <Link
            className={clsx("button button--primary button--lg", styles.btn)}
            to="/blog/database-for-robotics"
          >
            Learn More →
          </Link>
        </div>

      </div>
    </div>
  );
}

export default HomepageRobotics;
