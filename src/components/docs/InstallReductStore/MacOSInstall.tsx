import React, { useState } from "react";
import CodeBlock from "@theme/CodeBlock";
import styles from "./styles.module.css";
import clsx from "clsx";

export default function MacOSInstall(props) {
  const [activeTab, setActiveTab] = useState("binary (Intel)");

  const binaryInstallAmd64 = `
wget https://github.com/reductstore/reductstore/releases/latest/download/reductstore.x86_64-apple-darwin.tar.gz
tar xfv reductstore.x86_64-apple-darwin.tar.gz
chmod +x reductstore
RS_DATA_PATH=./data ./reductstore
`.trim();

  const binaryInstallArm64 = `
wget https://github.com/reductstore/reductstore/releases/latest/download/reductstore.aarch64-apple-darwin.tar.gz
tar xfv reductstore.aarch64-apple-darwin.tar.gz
chmod +x reductstore
RS_DATA_PATH=./data ./reductstore
`.trim();

  return (
    <>
      <p>Compatible with the amd64 and arm64 architectures.</p>

      <ul className={clsx("tabs", styles.tabs)}>
        {["binary (Intel)", "binary (Apple Silicon)"].map((tab) => (
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
        {activeTab === "binary (Intel)" && (
          <CodeBlock className="language-bash">{binaryInstallAmd64}</CodeBlock>
        )}
        {activeTab === "binary (Apple Silicon)" && (
          <CodeBlock className="language-bash">{binaryInstallArm64}</CodeBlock>
        )}
      </div>
    </>
  );
}
