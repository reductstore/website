import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";
import BrowserOnly from "@docusaurus/BrowserOnly";

function HomepageCLI() {
  return (
    <div className={styles.cliSection}>
      <div className="row" style={{ display: 'flex', alignItems: 'center' }}>
        <div className={clsx("col col--7", styles.cliAnimation)}>
          <BrowserOnly>
            {() => {
              const TerminalAnimation = require('../TerminalAnimation').default;
              return <TerminalAnimation />;
            }}
          </BrowserOnly>
        </div>
        <div className={"col col--5 text--center"}>
          <h2 className="hideOnMobile">CLI Client</h2>
          <p>
            You can customize data retention and replication policies using the{" "}
            <strong>
              <Link to="https://cli.reduct.store">
                ReducStore CLI client
              </Link>
            </strong>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomepageCLI;
