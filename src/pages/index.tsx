import React, { useState } from "react";
import type { JSX } from "react";
import clsx from "clsx";
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
import { LuCheck, LuCopy } from "react-icons/lu";
import { track } from "@site/src/lib/analytics";
import styles from "./index.module.css";
import HomepageStats from "../components/homepage/HomepageStats";
import HomepagePartners from "../components/homepage/HomepagePartners";
import HomepageCompanies from "../components/homepage/HomepageCompanies";

const RUN_COMMAND = "docker run -p 8383:8383 reduct/store";

function RunCommand() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(RUN_COMMAND);
    } catch {
      return;
    }
    track("hero_command_copied", { command: "docker" });
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className={styles.command}>
      <code className={styles.commandText}>
        <span className={styles.prompt} aria-hidden="true">
          $
        </span>
        {RUN_COMMAND}
      </code>
      <button
        type="button"
        className={styles.copyButton}
        onClick={copy}
        aria-label={copied ? "Command copied" : "Copy command"}
      >
        {copied ? (
          <LuCheck aria-hidden="true" />
        ) : (
          <LuCopy aria-hidden="true" />
        )}
        <span>{copied ? "Copied" : "Copy"}</span>
      </button>
    </div>
  );
}

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
        <RunCommand />
        <p className={styles.commandMeta}>
          <span>
            then open <strong>localhost:8383</strong>
          </span>
          <span>Linux · macOS · Windows · Apache 2.0</span>
          <Link to="/docs/getting-started">snap, cargo and binaries →</Link>
        </p>
        <div className={styles.buttonContainer}>
          <Link
            className={clsx("button button--lg", styles.buttonSecondary)}
            to="/docs/getting-started"
          >
            Documentation
          </Link>
          <Link
            className={clsx("button button--lg", styles.buttonSecondary)}
            to="/whitepaper"
          >
            White paper
          </Link>
          <Link
            className={clsx("button button--lg", styles.buttonSecondary)}
            to="/pricing"
          >
            Pricing
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
      description="Time-indexed storage for robots and machines: record images, LiDAR, telemetry, and logs at the edge, replicate what matters to the cloud, and query it with SQL."
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
          <HomepageChapters />
          <hr className={styles.industrialHr} />
          <HomepageUseCase />
        </div>
        <HomepageCTA />
      </main>
    </Layout>
  );
}
