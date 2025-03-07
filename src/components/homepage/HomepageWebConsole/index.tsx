import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";

const CliImage = require("@site/static/img/web-console.webp").default;

function HomepageWebConsole() {
  return (
    <div className={styles.webConsoleSection}>
      <div className={clsx("row", styles.row)}>
        <div className={"col col--5 text--center"}>
          <h2 className="hideOnMobile">Web Console</h2>
          <p>
            ReductStore has an integrated web console that allows you to easily
            manage your data and access to it.
          </p>
          <Link
            className={clsx("button button--primary button--lg", styles.btn)}
            to="/docs/getting-started"
          >
            Try Web Console →
          </Link>
        </div>
        <div className="col col--7 text--center">
          <img
            src={CliImage}
            className={styles.webConsoleImage}
            alt="ReductStore Web Console"
          />
        </div>
      </div>
    </div>
  );
}

export default HomepageWebConsole;
