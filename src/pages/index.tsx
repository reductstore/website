import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "../components/HomepageFeatures";

import styles from "./index.module.css";
import HomepageTestimonials from "../components/HomepageTestimonials";
import HomepageSDKs from "../components/HomepageSDKs";
import HomepageWebConsole from "../components/HomepageWebConsole";
import HomepageCLI from "../components/HomepageCLI";
import HomepageCTA from "../components/HomepageCTA";

const LogoImg = require("@site/static/img/logo.webp").default;

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <div className={styles.headerContent}>
          <img src={LogoImg} alt="Logo" className={styles.headerLogo} />
          <h1 className={clsx("hero__title", styles.heroTitle)}>
            {siteConfig.title}
          </h1>
        </div>
        <p className={clsx("hero__subtitle", styles.heroSubTitle)}>
          {siteConfig.tagline}
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started"
          >
            Install ReductStore in Seconds ⏱️
          </Link>
          <span className={styles.indexCtasGitHubButtonWrapper}>
            <iframe
              className={clsx("hideOnMobile", styles.indexCtasGitHubButton)}
              src="https://ghbtns.com/github-btn.html?user=reductstore&amp;repo=reductstore&amp;type=star&amp;count=true&amp;size=large"
              width={160}
              height={30}
              title="GitHub Stars"
            />
          </span>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Efficient Time-Series Database for Blob Data, Optimized for Edge Computing, Computer Vision, and IoT"
      description="ReductStore is a time series database designed specifically for storing and managing large amounts of blob data. 
      It offers high performance for writing and real-time querying, making it suitable for edge computing, computer vision, and IoT applications.
      ReductStore is licensed under the Business Source License 1.1."
    >
      <HomepageHeader />
      <main>
        <div className="container">
          <HomepageFeatures />
          <hr />
          <HomepageTestimonials />
          <hr />
          <HomepageSDKs />
          <hr />
          <HomepageWebConsole />
          <hr />
          <HomepageCLI />
          <hr />
          <HomepageCTA />
        </div>
      </main>
    </Layout>
  );
}
