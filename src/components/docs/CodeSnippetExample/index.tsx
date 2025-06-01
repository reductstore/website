import React, { useState } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import CodeBlock from "@theme/CodeBlock";


import {
  pythonCodeExample,
  JavascriptCodeExample,
  CplusPlusCodeExample,
  rustCodeExample,
  CurlCodeExample,
    GoCodeExample,
} from "./CodeExamples";

const codeSnippets = {
  python: pythonCodeExample,
  javascript: JavascriptCodeExample,
    go: GoCodeExample,
  cplusplus: CplusPlusCodeExample,
  rust: rustCodeExample,
  curl: CurlCodeExample,
};

const getLanguageClass = (languageKey) => {
  const languageClassMap = {
    python: "language-python",
    javascript: "language-javascript",
    go: "language-go",
    cplusplus: "language-cpp",
    rust: "language-rust",
    curl: "language-bash",
  };

  return languageClassMap[languageKey] || "language-none";
};

const getLanguageName = (languageKey) => {
  const languageNameMap = {
    python: "Python",
    javascript: "JavaScript",
    go: "Go",
    cplusplus: "C++",
    rust: "Rust",
    curl: "cURL",
  };

  return languageNameMap[languageKey] || "";
};

export default function CodeSnippetExample() {
  const [activeTab, setActiveTab] = useState("python");

  return (
    <>
      <ul className={clsx("tabs", styles.tabs)}>
        {Object.keys(codeSnippets).map((language) => (
          <li
            key={language}
            className={clsx("tabs__item", styles.tabsItem, {
              "tabs__item--active": activeTab === language,
              [styles.tabsItemActive]: activeTab === language,
            })}
            onClick={() => setActiveTab(language)}
          >
            {getLanguageName(language)}
          </li>
        ))}
      </ul>

      {activeTab && (
        <div className={styles.tabContent}>
          <CodeBlock className={getLanguageClass(activeTab)}>
            {codeSnippets[activeTab]}
          </CodeBlock>
        </div>
      )}
    </>
  );
}
