import React, { useState } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

import Link from "@docusaurus/Link";
import Ros2Install from "./Ros2Install";

export default function InstallReductBridge(props): JSX.Element {
  const [activeTab, setActiveTab] = useState("docker");

  return (
    <>
      <h3>Reduct Bridge</h3>
      <ul className={clsx("tabs", styles.tabs)}>
        {["ROS 2", "ROS 1"].map((tab) => (
          <li
            key={tab}
            className={clsx(
              "tabs__item",
              activeTab === tab && "tabs__item--active",
            )}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </li>
        ))}
      </ul>
      <div className={styles.tabContent}>
        {activeTab === "ROS 2" && <Ros2Install {...props} />}
        {/*{activeTab === "snap" && <MacOSInstall {...props} />}*/}
        {/*{activeTab === "cargo" && <WindowsInstall {...props} />}*/}
      </div>

      <p>
        All the binaries and source code are available on{" "}
        <strong>
          <Link
            href="https://github.com/reductstore/reduct-bridge/releases"
            target="_blank"
          >
            the release page
          </Link>
          .
        </strong>
      </p>
    </>
  );
}
