import React, { useState } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

import LinuxInstall from "./LinuxInstall";
import MacOSInstall from "./MacOSInstall";
import WindowsInstall from "./WindowsInstall";
import CargoInstall from "@site/src/components/docs/InstallClientCLI/CargoInstall";

export default function InstallReductStore(props): JSX.Element {
  const [activeTab, setActiveTab] = useState("linux");

  return (
    <>
      <h3>CLI Client</h3>
      <ul className={clsx("tabs", styles.tabs)}>
        {["linux", "macOs", "windows", "cargo"].map((tab) => (
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
        {activeTab === "linux" && <LinuxInstall {...props} />}
        {activeTab === "macOs" && <MacOSInstall {...props} />}
        {activeTab === "windows" && <WindowsInstall {...props} />}
        {activeTab === "cargo" && <CargoInstall {...props} />}
      </div>
    </>
  );
}
