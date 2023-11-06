import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

const CliImage = require("@site/static/img/web-console.png").default;

function HomepageWebConsole() {
  return (
    <section className={styles.WebConsoleSection}>
      <div className={"container"}>
        <div className="row">
          <div className={"col col--5 text--center"}>
            <h3>Web Console</h3>
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
          <div
            className={clsx(
              "col col--7 text--center hideOnMobile",
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
        </div>
      </div>
    </section>
  );
}

export default HomepageWebConsole;
