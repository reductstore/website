import React, { useState } from "react";
import CodeBlock from "@theme/CodeBlock";
import clsx from "clsx";
import styles from "@site/src/components/docs/InstallClientCLI/styles.module.css";

export default function Ros2Install(props) {
  const [activeTab, setActiveTab] = useState("binary (amd64)");
  return (
    <>
      <ul className={clsx("tabs", styles.tabs)}>
        {["binary (amd64)", "snap"].map((tab) => (
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
          <>
            <p>Runs on amd64, arm64, and arm32 platforms.</p>
            <CodeBlock className="language-bash">
              wget
              https://github.com/reductstore/reduct-bridge/releases/latest/download/bridge-ros2-humble.x86_64-unknown-linux-gnu.tar.gz
              tar -xvf reduct-cli.x86_64-unknown-linux-gnu.tar.gz chmod +x
              reduct-cli sudo mv reduct-cli /usr/local/bin
            </CodeBlock>
          </>
        )}
        {activeTab === "snap" && (
          <CodeBlock className="language-bash">
            snap install reduct-bridge-ros2
          </CodeBlock>
        )}
      </div>
    </>
  );
}
