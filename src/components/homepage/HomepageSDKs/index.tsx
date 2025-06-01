import React from "react";
import CodeSnippetExample from "../../docs/CodeSnippetExample";
import clsx from "clsx";
import {
  SiPython,
  SiJavascript,
  SiRust,
  SiCplusplus,
  SiGo,
} from "react-icons/si";
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
                to="/docs/getting-started/with-python"
                className={styles.sdkIcon}
              >
                <SiPython size="3em" />
              </Link>
              <Link
                to="/docs/getting-started/with-javascript"
                className={styles.sdkIcon}
              >
                <SiJavascript size="3em" />
              </Link>
              <Link
                className={styles.sdkIcon}
                to="/docs/getting-started/with-go"
              >
                <SiGo size="3em" />
              </Link>
              <Link
                className={styles.sdkIcon}
                to="/docs/getting-started/with-rust"
              >
                <SiRust size="3em" />
              </Link>
              <Link
                to="/docs/getting-started/with-cpp"
                className={styles.sdkIcon}
              >
                <SiCplusplus size="3em" />
              </Link>
            </div>
            <Link
              className={clsx("button button--primary button--lg", styles.btn)}
              to="/docs/getting-started"
            >
              Try SDKs →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
