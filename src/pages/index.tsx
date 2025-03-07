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
          images, files, text, vibration data, robot logs, and more. Store
          billions of blobs with time indexing and AI labels.
        </p>
        <div className={styles.buttonContainer}>
          <div className={styles.buttonLeft}>
            <Link
              className="button button--secondary button--block button--lg"
              to="/docs/getting-started"
            >
              Try ReductStore →
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
      description="ReductStore is a high-performance time series object store written in Rust and designed for speed, simplicity, and robustness. 
      It efficiently stores and manages large amounts of unstructured data, including images, files, text, vibration data, and robot logs. 
      ReductStore provides cost-effective central storage in the cloud and is optimized for on-premises deployments such as industrial plants 
      and private infrastructures that require secure and local data management."
    >
      <HomepageHeader />
      <main>
        <div className="container">
          <HomepageBenefits />
          <hr />
          <HomepageStats />
          <HomepageTestimonials />
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
