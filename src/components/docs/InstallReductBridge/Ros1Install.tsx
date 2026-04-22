import React, { useState } from "react";
import CodeBlock from "@theme/CodeBlock";
import clsx from "clsx";
import styles from "@site/src/components/docs/InstallClientCLI/styles.module.css";

const binaryInstall = `
wget https://github.com/reductstore/reduct-bridge/releases/latest/download/bridge-ros1.x86_64-unknown-linux-gnu.tar.gz
tar -xvf bridge-ros1.x86_64-unknown-linux-gnu.tar.gz
chmod +x reduct-bridge 
sudo mv reduct-bridge /usr/local/bin
`.trim();

export default function Ros1Install(props) {
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
            <CodeBlock className="language-bash">
                {binaryInstall}
            </CodeBlock>
          </>
        )}
        {activeTab === "snap" && (
          <CodeBlock className="language-bash">
            snap install reduct-bridge-ros1
          </CodeBlock>
        )}
      </div>
    </>
  );
}
