import React, { useState } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

import Link from "@docusaurus/Link";
import Ros2Install from "./Ros2Install";
import Ros1Install from "./Ros1Install";


export default function InstallReductBridge(props): JSX.Element {
  const [activeTab, setActiveTab] = useState("ROS2");

  return (
    <>
      <h3>ReductBridge</h3>
        <p>
            ReductBridge binaries are provided as prebuilt packages for various use cases, including ROS2 and ROS1.
        </p>
      <ul className={clsx("tabs", styles.tabs)}>
        {["ROS2", "ROS1"].map((tab) => (
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
        {activeTab === "ROS2" && <Ros2Install {...props} />}
        {activeTab === "ROS1" && <Ros1Install {...props} />}
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
