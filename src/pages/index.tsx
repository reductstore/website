import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "../components/homepage/HomepageFeatures";
import HomepageTestimonials from "../components/homepage/HomepageTestimonials";
import HomepageCTA from "../components/homepage/HomepageCTA";
import HomepageFaqs from "../components/homepage/HomepageFaqs";
import HomepageSDKs from "../components/homepage/HomepageSDKs";
import HomepageWebConsole from "../components/homepage/HomepageWebConsole";
import HomepageCLI from "../components/homepage/HomepageCLI";
import HomepageBenefits from "../components/homepage/HomepageBenefits";
import HomepageUseCase from "../components/homepage/HomepageUseCase";
import styles from "./index.module.css";
import HomepageStats from "../components/homepage/HomepageStats";
import HomepagePartners from "../components/homepage/HomepagePartners";
import HomepageCompanies from "../components/homepage/HomepageCompanies";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className={clsx("hero__title", styles.heroTitle)}>
          {siteConfig.tagline}
        </h1>
        <p className={clsx("hero__subtitle", styles.heroSubTitle)}>
          An ELT-based solution for robotics and industrial IoT data acquisition
          systems. Capture data in its raw form, ingest and stream data of any
          size-images, sensor readings, logs, files, ROS bags-and store it with
          time indexing and labels for ultra-fast retrieval and management.
        </p>
        <div className={styles.buttonContainer}>
          <div className={styles.buttonLeft}>
            <Link
              className="button button--secondary button--block button--lg"
              to="/docs/getting-started"
            >
              Get Started
            </Link>
          </div>
          <div className={styles.buttonRight}>
            <Link
              className="button button--secondary button--block button--lg"
              to="/whitepaper"
            >
              White Paper →
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.tagline}
      description="ReductStore is a high-performance, ELT-based storage solution for robotics and industrial IoT data acquisition systems. 
      It captures raw data—images, sensor readings, logs, files, ROS bags—and stores it with time indexing and labels for fast ingestion, streaming, and retrieval."
    >
      <HomepageHeader />
      <main>
        <div className="container">
          <HomepageBenefits />
          <HomepageStats />
          <HomepageTestimonials />
          <HomepageCompanies />
          <HomepagePartners />
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
