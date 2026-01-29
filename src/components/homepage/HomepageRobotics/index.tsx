import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";
import ThemedImage from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";

function HomepageRobotics() {
  return (
    <div className={styles.roboticsSection}>
      <div className={clsx("row", styles.row)}>
        <div className={"col col--5 text--center"}>
          <h2 className="hideOnMobile">Robotics Support</h2>
          <p>
            ReductStore Agent records ROS2 topics directly to storage. Store
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
        <div className="col col--7 text--center">
          <ThemedImage
            sources={{
              light: useBaseUrl(
                "/img/solutions/cloud/cloud-robotics-light.drawio.svg",
              ),
              dark: useBaseUrl(
                "/img/solutions/cloud/cloud-robotics-dark.drawio.svg",
              ),
            }}
            alt="Robotics Support"
            className={styles.roboticsImage}
          />
        </div>
      </div>
    </div>
  );
}

export default HomepageRobotics;
