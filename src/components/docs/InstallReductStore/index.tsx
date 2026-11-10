import React, { useState } from "react";
import type { JSX } from "react";
import SimpleHeader from "@site/src/components/shared/SimpleHeader";
import Layout from "@theme/Layout";
import clsx from "clsx";
import styles from "./styles.module.css";

import DockerInstall from "./DockerInstall";
import LinuxInstall from "./LinuxInstall";
import MacOSInstall from "./MacOSInstall";
import WindowsInstall from "./WindowsInstall";
import Link from "@docusaurus/Link";

export default function InstallReductStore(props): JSX.Element {
  const [activeTab, setActiveTab] = useState("docker");

  return (
    <>
      <h3>ReductStore Server</h3>
      <ul className={clsx("tabs", styles.tabs)}>
        {["docker", "linux", "macOs", "windows"].map((tab) => (
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
        {activeTab === "docker" && <DockerInstall />}
        {activeTab === "linux" && <LinuxInstall {...props} />}
        {activeTab === "macOs" && <MacOSInstall {...props} />}
        {activeTab === "windows" && <WindowsInstall {...props} />}
      </div>

      <p>
        All the binaries and source code are available on{" "}
        <strong>
          <Link
            href="https://github.com/reductstore/reductstore/releases"
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
