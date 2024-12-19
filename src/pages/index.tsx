import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import PerformanceComparison from "../components/homepage/PerformanceComparison";
import HomepageFeatures from "../components/homepage/HomepageFeatures";
import HomepageTestimonials from "../components/homepage/HomepageTestimonials";
import HomepageCTA from "../components/homepage/HomepageCTA";
import HomepageFaqs from "../components/homepage/HomepageFaqs";
import HomepageSDKs from "../components/homepage/HomepageSDKs";
import HomepageWebConsole from "../components/homepage/HomepageWebConsole";
import HomepageCLI from "../components/homepage/HomepageCLI";
import HomepageBenefits from "../components/homepage/HomepageBenefits";
import HomepageUseCase from "../components/homepage/HomepageUseCase";
import HomepageBanner from "../components/homepage/HomepageBanner";
import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className={clsx("hero__title", styles.heroTitle)}>
          {siteConfig.tagline}
        </h1>
        <p className={clsx("hero__subtitle", styles.heroSubTitle)}>
          High-performance time series object storage, written in Rust, designed
          for speed, simplicity and robustness. Handle data of any size -
          images, files, text, vibration data and more. Store billions of blobs
          with time indexing and AI labels.
        </p>
        <div className={styles.buttonContainer}>
          <div className={styles.buttonLeft}>
            <Link
              className="button button--secondary button--block button--lg"
              to="/solutions/cloud"
            >
              Cloud Solution
            </Link>
          </div>
          <div className={styles.buttonRight}>
            <Link
              className="button button--outline button--secondary button--block button--lg"
              to="/docs/getting-started"
            >
              On-Premise
            </Link>
          </div>
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
      <HomepageBanner
        to="/pricing"
        text="Get Your Quick Storage Workflow Review"
      />
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
          <HomepageUseCase />
          <hr />
          <HomepageFaqs />
        </div>
        <HomepageCTA />
      </main>
    </Layout>
  );
}
