import React from "react";
import type { JSX } from "react";
import clsx from "clsx";
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "../components/homepage/HomepageFeatures";
import HomepageChapters from "../components/homepage/HomepageChapters";
import HomepageTestimonials from "../components/homepage/HomepageTestimonials";
import HomepageCTA from "../components/homepage/HomepageCTA";
import HomepageBenefits from "../components/homepage/HomepageBenefits";
import HomepageArchitecture from "../components/homepage/HomepageArchitecture";
import HomepageUseCase from "../components/homepage/HomepageUseCase";
import styles from "./index.module.css";
import HomepageStats from "../components/homepage/HomepageStats";
import HomepagePartners from "../components/homepage/HomepagePartners";
import HomepageCompanies from "../components/homepage/HomepageCompanies";

const description =
  "Time series object storage for robotics and industrial IoT. Store images, LiDAR, logs and telemetry of any size, query by time and labels, and replicate to the cloud.";

const siteUrl = "https://www.reduct.store";
const organizationId = `${siteUrl}/#organization`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: "ReductStore",
      legalName: "ReductSoftware UG",
      url: siteUrl,
      logo: `${siteUrl}/img/logo.svg`,
      sameAs: [
        "https://github.com/reductstore",
        "https://www.linkedin.com/company/reductstore",
        "https://www.youtube.com/@ReductStore",
        "https://community.reduct.store",
      ],
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#software`,
      name: "ReductStore",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Linux, macOS, Windows",
      description,
      url: siteUrl,
      license: "https://www.apache.org/licenses/LICENSE-2.0",
      sameAs: ["https://github.com/reductstore/reductstore"],
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
      },
      publisher: { "@id": organizationId },
    },
  ],
};

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
          Store images, telemetry and logs on the machine. Replicate what
          matters to the cloud. Query it from any app.
        </p>
        <div className={styles.buttonContainer}>
          <Link
            className={clsx("button button--lg", styles.buttonPrimary)}
            to="/docs/getting-started"
          >
            Get started
          </Link>
          <Link
            className={clsx("button button--lg", styles.buttonSecondary)}
            to="/whitepaper"
          >
            White paper
          </Link>
        </div>
        <p className={styles.heroFootnote}>Open source core · Apache 2.0</p>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.tagline} description={description}>
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Head>
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
          <HomepageChapters />
          <hr className={styles.industrialHr} />
          <HomepageUseCase />
        </div>
        <HomepageCTA />
      </main>
    </Layout>
  );
}
