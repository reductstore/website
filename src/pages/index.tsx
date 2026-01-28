import React from "react";
import type { JSX } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import { LuServer, LuCloud } from "react-icons/lu";
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
          High Performance Data Storage and Streaming for{" "}
          <span className={styles.heroAccent}>Robotics</span> and{" "}
          <span className={styles.heroAccent}>Industrial IoT</span>
        </h1>
        <p className={clsx("hero__subtitle", styles.heroSubTitle)}>
          Store and stream multimodal time series from many robots or devices.
          Built to handle large data volumes, poor connectivity, and fast event
          retrieval at scale.
        </p>
        <div className={styles.buttonContainer}>
          <Link
            className={clsx("button button--lg", styles.buttonPrimary)}
            to="/solutions/cloud"
          >
            <LuCloud /> Cloud
          </Link>
          <Link
            className={clsx("button button--lg", styles.buttonSecondary)}
            to="/docs/getting-started"
          >
            <LuServer /> On-Premises
          </Link>
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
          <hr className={styles.industrialHr} />
          <HomepageFeatures />
          <hr className={styles.industrialHr} />
          <HomepageSDKs />
          <hr className={styles.industrialHr} />
          <HomepageWebConsole />
          <hr className={styles.industrialHr} />
          <HomepageCLI />
          <hr className={styles.industrialHr} />
          <HomepageUseCase />
          <hr className={styles.industrialHr} />
          <HomepageFaqs />
        </div>
        <HomepageCTA />
      </main>
    </Layout>
  );
}
