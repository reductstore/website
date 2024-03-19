import React from "react";
import CodeSnippetExample from "../CodeSnippetExample";
import clsx from "clsx";
import { SiPython, SiJavascript, SiRust, SiCplusplus } from "react-icons/si";
import styles from "./styles.module.css";

export default function HomepageSDKs() {
  return (
    <div className="row" style={{ display: 'flex', alignItems: 'center' }}>
      <div className={"col col--7"}>
        <CodeSnippetExample />
      </div>
      <div className="col col--5">
        <div className="text--center">
          <p>
            You can use the following client SDKs for quick and easy
            integration into your applications and infrastructure:
          </p>
          <div className={clsx("text--center", styles.sdkIcons)}>
            <a
              href="https://github.com/reductstore/reduct-py"
              className={styles.sdkIcon}
            >
              <SiPython size="3em" />
            </a>
            <a
              href="https://github.com/reductstore/reduct-js"
              className={styles.sdkIcon}
            >
              <SiJavascript size="3em" />
            </a>
            <a
              href="https://github.com/reductstore/reduct-cpp"
              className={styles.sdkIcon}
            >
              <SiCplusplus size="3em" />
            </a>
            <a
              href="https://github.com/reductstore/reductstore/tree/main/reduct_rs"
              className={styles.sdkIcon}
            >
              <SiRust size="3em" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
