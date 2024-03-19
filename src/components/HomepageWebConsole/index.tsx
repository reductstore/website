import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

const CliImage = require("@site/static/img/web-console.webp").default;

function HomepageWebConsole() {
  return (
    <div className={"container"}>
      <div className="row" style={{ display: 'flex', alignItems: 'center' }}>
        <div
          className={clsx(
            "col col--7 text--center",
            styles.WebConsole
          )}
        >
          <a href="https://github.com/reductstore/web-console">
            <img
              src={CliImage}
              className={styles.WebConsoleImage}
              alt="ReductStore Web Console"
            />
          </a>
        </div>
        <div className={"col col--5 text--center"}>
          <p>
            ReductStore has an integrated{" "}
            <strong>
              <a href="https://github.com/reductstore/web-console">
                web console
              </a>
            </strong>{" "}
            that allows you to easily manage your data and access to it.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomepageWebConsole;
