import type { JSX } from "react";
import Layout from "@theme/Layout";
import SimpleHeader from "@site/src/components/shared/SimpleHeader";
import { PricingComparison } from "@site/src/components/shared/PricingTable";
import styles from "../styles.module.css";

export default function PricingDetails(): JSX.Element {
  return (
    <Layout
      title="Pricing details"
      description="Compare ReductStore Free, Pro, Cloud Enterprise, and Cloud Self-hosted plans."
    >
      <main>
        <SimpleHeader pageTitle="Pricing details" />
        <section className="container">
          <p className={styles.introText}>
            Compare plans and choose the best fit for your deployment.
          </p>
          <PricingComparison />
        </section>
      </main>
    </Layout>
  );
}
