import React from "react";
import SimpleHeader from "@site/src/components/SimpleHeader";
import Layout from "@theme/Layout";
import WhitePaperForm from "@site/src/components/WhitePaperForm";
import styles from './styles.module.css';
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import clsx from "clsx";

const WhitePaperImg = require("@site/static/img/whitepaper/whitepaper.webp").default;

export default function ReductAI(): JSX.Element {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
  return (
    <Layout
      title="White Paper: AI Infrastructure for Edge Computing"
      description="Dive into our white paper to learn more about our approach to building and deploying AI models on the edge."
    >
      <main>
        <SimpleHeader pageTitle="AI Infrastructure for Edge Computing" />
        <div className={clsx("container", styles.whitePaperContainer)}>
          <p className={styles.introText}>
            ReductStore is time-series object store that is optimized for AI workloads and designed to run on edge devices.
            This white paper provides an overview of a typical AI infrastructure for edge computing and how ReductStore can help you build and deploy AI models at the edge.
          </p>
          <div className="row">
            <div className="col col--6">
              <p className={styles.formTitle}>Download the White Paper</p>
              <ul className={styles.bulletPoints}>
                <li>Learn about typical AI infrastructures for edge computing</li>
                <li>Understand the challenges of deploying AI models at the edge</li>
                <li>Explore the benefits of ReductStore to address these challenges</li>
              </ul>
              <WhitePaperForm />
            </div>
            <div className="col col--6 hideOnMobile">
              <div className={styles.imageWrapper}>
                <img
                  src={WhitePaperImg}
                  alt="White Paper Cover"
                  className={styles.image}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}