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
            ReductStore has an integrated{" "}
            <strong>
              <Link href="https://github.com/reductstore/web-console">
                web console
              </Link>
            </strong>{" "}
            that allows you to easily manage your data and access to it.
          </p>
        </div>
        <div className="col col--7 text--center">
          <Link to="https://github.com/reductstore/web-console">
            <img
              src={CliImage}
              className={styles.webConsoleImage}
              alt="ReductStore Web Console"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomepageWebConsole;
