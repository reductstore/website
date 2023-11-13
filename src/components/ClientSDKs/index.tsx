import React, { useState } from "react";
import SimpleHeader from "@site/src/components/SimpleHeader";
import clsx from "clsx";
import styles from "./styles.module.css";
import CodeBlock from '@theme/CodeBlock';

export default function ClientSDKs(): JSX.Element {
  const [activeTab, setActiveTab] = useState("Python");

  return (
    <>
      <h3>Client SDKs</h3>
      <ul className={clsx("tabs", styles.tabs)}>
        {["Python", "Node.js", "C++ (cmake)", "Rust"].map((tab) => (
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
        {activeTab === "Python" && (
          <CodeBlock className="language-bash">
            {pythonSDK}
          </CodeBlock>
        )}
        {activeTab === 'Node.js' && (
          <CodeBlock className="language-bash">
            {nodeSDK}
          </CodeBlock>
        )}
        {activeTab === 'C++ (cmake)' && (
          <CodeBlock className="language-bash">
            {cppSDK}
          </CodeBlock>
        )}
        {activeTab === 'Rust' && (
          <CodeBlock className="language-bash">
            {rustSDK}
          </CodeBlock>
        )}
      </div>
    </>

  );
}

const pythonSDK = `
pip install -U reduct-py
`.trim();

const nodeSDK = `
npm i reduct-js
`.trim();

const cppSDK = `
include(FetchContent)

FetchContent_Declare(
    ReductCpp
    GIT_REPOSITORY https://github.com/reductstore/reduct-cpp.git
    GIT_TAG 
)

find_package(ReductCpp)
`.trim();

const rustSDK = `
cargo install reduct-rs
`.trim();