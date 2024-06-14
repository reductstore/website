import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "../components/HomepageFeatures";

import styles from "./index.module.css";
import HomepageTestimonials from "../components/HomepageTestimonials";
import HomepageCTA from "../components/HomepageCTA";
import HomepageBenefits from "../components/HomepageBenefits";
import HomepageFaqs from "../components/HomepageFaqs";
import HomepageSDKs from "../components/HomepageSDKs";
import HomepageWebConsole from "../components/HomepageWebConsole";
import HomepageCLI from "../components/HomepageCLI";
import PerformanceComparison from "../components/PerformanceComparison";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">

        <h1 className={clsx("hero__title", styles.heroTitle)}>
          {siteConfig.tagline}
        </h1>
        <p className={clsx("hero__subtitle", styles.heroSubTitle)}>
          Outperform TimescaleDB, MongoDB, and MinIO with a tailored solution for time-series object data. Why not try it for free today?
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started"
          >
            Get Started
          </Link>
          <Link
            className="button  button--outline button--secondary button--lg"
            to="/whitepaper"
          >
            White Paper
          </Link>
          <span className={styles.indexCtasGitHubButtonWrapper}>
            <iframe
              className={styles.indexCtasGitHubButton}
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
      title="Time-Series Object Store for Edge Computing"
      description="ReductStore is a time series database designed specifically for storing and managing large amounts of unstructured data. 
      It offers high performance for writing and real-time querying, making it suitable for edge computing, computer vision, and IoT applications."
    >
      <HomepageHeader />
      <main>
        <div className="container">
          <HomepageBenefits />
          <PerformanceComparison />
          <hr />
          <HomepageTestimonials />
          <hr />
          <HomepageFeatures />
          <hr />
          <HomepageSDKs />
          <hr />
          <HomepageWebConsole />
          <hr />
          <HomepageCLI />
          <hr />
          <HomepageFaqs />
        </div>
        <HomepageCTA />
      </main>
    </Layout>
  );
}