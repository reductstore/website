import React from "react";
import CodeSnippetExample from "../CodeSnippetExample";
import clsx from "clsx";
import { SiPython, SiJavascript, SiRust, SiCplusplus } from "react-icons/si";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";

export default function HomepageSDKs() {
  return (
    <div className={styles.sdkSection}>
      <div className="row" style={{ display: "flex", alignItems: "center" }}>
        <div className={"col col--7"}>
          <CodeSnippetExample />
        </div>
        <div className="col col--5">
          <div className="text--center">
            <h2 className="hideOnMobile">Client SDKs</h2>
            <p>
              You can use the following client SDKs for quick and easy
              integration into your applications and infrastructure:
            </p>
            <div className={clsx("text--center", styles.sdkIcons)}>
              <Link
                to="https://github.com/reductstore/reduct-py"
                className={styles.sdkIcon}
              >
                <SiPython size="3em" />
              </Link>
              <Link
                to="https://github.com/reductstore/reduct-js"
                className={styles.sdkIcon}
              >
                <SiJavascript size="3em" />
              </Link>
              <Link
                to="https://github.com/reductstore/reduct-cpp"
                className={styles.sdkIcon}
              >
                <SiCplusplus size="3em" />
              </Link>
              <Link
                className={styles.sdkIcon}
                to="https://github.com/reductstore/reduct-rs"
              >
                <SiRust size="3em" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
