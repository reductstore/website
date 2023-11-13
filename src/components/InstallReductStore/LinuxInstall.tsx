import React, { useState } from 'react';
import CodeBlock from '@theme/CodeBlock';
import styles from "./styles.module.css";
import clsx from 'clsx';

export default function LinuxInstall() {
  const [activeTab, setActiveTab] = useState("binary");

  return (
    <>
      <p>Compatible with the amd64 architecture.</p>

      <ul className={clsx("tabs", styles.tabs)}>
        {["binary", "snap"].map((tab) => (
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
        {activeTab === "binary" && (
          <CodeBlock className="language-bash">
            {bynaryInstall}
          </CodeBlock>
        )}
        {activeTab === "snap" && (
          <CodeBlock className="language-bash">
            sudo snap install reductstore
          </CodeBlock>
        )}
      </div>
    </>
  );
}

const bynaryInstall = `
wget https://github.com/reductstore/reductstore/releases/download/v1.7.3/reductstore.linux-amd64.tar.gz
tar xfv reductstore.linux-amd64.tar.gz
chmod +x reductstore
RS_DATA_PATH=./data ./reductstore
`.trim();

