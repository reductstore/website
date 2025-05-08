import React, { useState } from "react";
import CodeBlock from "@theme/CodeBlock";
import styles from "./styles.module.css";
import clsx from "clsx";

export default function LinuxInstall(props) {
  const [activeTab, setActiveTab] = useState("binary (amd64)");

  const binaryInstallAmd64 = `
wget https://github.com/reductstore/reduct-cli/releases/latest/download/reduct-cli.x86_64-unknown-linux-gnu.tar.gz
tar -xvf reduct-cli.x86_64-unknown-linux-gnu.tar.gz
chmod +x reduct-cli
sudo mv reduct-cli /usr/local/bin
`.trim();

  const binaryInstallArm64 = `
wget https://github.com/reductstore/reduct-cli/releases/latest/download/reduct-cli.aarch64-unknown-linux-gnu.tar.gz
tar -xvf reduct-cli.aarch64-unknown-linux-gnu.tar.gz
chmod +x reduct-cli
sudo mv reduct-cli /usr/local/bin
`.trim();

  return (
    <>
      <p>Compatible with the amd64 and arm64 architectures.</p>

      <ul className={clsx("tabs", styles.tabs)}>
        {["binary (amd64)", "binary (arm64)"].map((tab) => (
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
        {activeTab === "binary (amd64)" && (
          <CodeBlock className="language-bash">{binaryInstallAmd64}</CodeBlock>
        )}
        {activeTab === "binary (arm64)" && (
          <CodeBlock className="language-bash">{binaryInstallArm64}</CodeBlock>
        )}
      </div>
    </>
  );
}
