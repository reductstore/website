import React from "react";
import type { JSX } from "react";
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
import HomepagePerformance from "../components/homepage/HomepagePerformance";
import HomepageObservability from "../components/homepage/HomepageObservability";
import HomepageRobotics from "../components/homepage/HomepageRobotics";
import HomepageBenefits from "../components/homepage/HomepageBenefits";
import HomepageArchitecture from "../components/homepage/HomepageArchitecture";
import HomepageUseCase from "../components/homepage/HomepageUseCase";
import styles from "./index.module.css";
import HomepageStats from "../components/homepage/HomepageStats";
import HomepagePartners from "../components/homepage/HomepagePartners";
import HomepageCompanies from "../components/homepage/HomepageCompanies";
import HomepageReductBridge from "@site/src/components/homepage/HomepageReductBridge";

function HomepageHeader() {
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className={clsx("hero__title", styles.heroTitle)}>
          The data backbone for{" "}
          <span className={styles.heroAccent}>robots</span> and{" "}
          <span className={styles.heroAccent}>machines</span>
        </h1>
        <p className={clsx("hero__subtitle", styles.heroSubTitle)}>
          Make your data queryable. Store images, telemetry and logs on the
          machine, replicate what matters to the cloud, and query it from any
          app.
        </p>
        <div className={styles.buttonContainer}>
          <Link
            className={clsx("button button--lg", styles.buttonPrimary)}
            to="/docs/getting-started"
          >
            Start for free
          </Link>
          <Link
            className={clsx("button button--lg", styles.buttonSecondary)}
            to="/contact"
          >
            Talk to us
          </Link>
          <Link className={styles.textLink} to="/pricing">
            See pricing →
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
          <HomepageArchitecture />
          <hr className={styles.industrialHr} />
          <HomepageBenefits />
          <hr className={styles.industrialHr} />
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
          <HomepageReductBridge />
          <hr className={styles.industrialHr} />

          <HomepagePerformance />
          <hr className={styles.industrialHr} />
          <HomepageObservability />
          <hr className={styles.industrialHr} />
          <HomepageRobotics />
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
