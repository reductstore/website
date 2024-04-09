import React, { useState, useEffect } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";
import BrowserOnly from "@docusaurus/BrowserOnly";

const CliDemoImg = require("@site/static/img/cli-demo.webp").default;

function HomepageCLI() {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1120);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={styles.cliSection}>
      <div className="row" style={{ display: 'flex', alignItems: 'center' }}>
        <div className={clsx(isLargeScreen ? "col col--8" : "col col--9", styles.cliAnimation)}>
          <div className="hideOnMobile" style={{ width: '100%' }} >
            <BrowserOnly>
              {() => {
                const TerminalAnimation = require('../TerminalAnimation').default;
                return <TerminalAnimation />;
              }}
            </BrowserOnly>
          </div>
          <div className={clsx("showOnMobile", styles.mobileImage)}>
            <img src={CliDemoImg} alt="Mobile View" style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
        </div>
        <div className={clsx(isLargeScreen ? "col col-4" : "col col--3", "text--center")}>
          <h2 className="hideOnMobile">CLI Client</h2>
          <p>
            You can customize data retention and replication policies using the{" "}
            <strong>
              <Link to="https://github.com/reductstore/reduct-cli">
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
