import React, { useState } from "react";
import SimpleHeader from "@site/src/components/SimpleHeader";
import Layout from "@theme/Layout";
import clsx from "clsx";
import styles from "./styles.module.css";

import DockerInstall from "./DockerInstall";
import LinuxInstall from './LinuxInstall';
import MacOSInstall from './MacOSInstall';
import WindowsInstall from './WindowsInstall';
import AzureInstall from './AzureInstall';

export default function InstallReductStore(): JSX.Element {
  const [activeTab, setActiveTab] = useState("docker");

  return (
    <>
      <h3>ReductStore Server</h3>
      <ul className={clsx("tabs", styles.tabs)}>
        {["docker", "linux", "macOs", "windows", "azure"].map((tab) => (
          <li
            key={tab}
            className={clsx(
              "tabs__item",
              activeTab === tab && "tabs__item--active"
            )}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </li>
        ))}
      </ul>
      <div className={styles.tabContent}>
        {activeTab === "docker" && <DockerInstall />}
        {activeTab === 'linux' && <LinuxInstall />}
        {activeTab === 'macOs' && <MacOSInstall />}
        {activeTab === 'windows' && <WindowsInstall />}
        {activeTab === 'azure' && <AzureInstall />}
      </div>
    </>
  );
}
