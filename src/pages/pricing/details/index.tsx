import type { JSX } from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import SimpleHeader from "@site/src/components/shared/SimpleHeader";
import { PricingComparison } from "@site/src/components/shared/PricingTable";
import CurrencySwitch from "@site/src/components/shared/CurrencySwitch";
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
          <p className={clsx(styles.introText, styles.detailsIntro)}>
            Compare plans and choose the best fit for your deployment.
          </p>
          <div className={styles.detailsCurrency}>
            <CurrencySwitch />
          </div>
          <PricingComparison />
        </section>
      </main>
    </Layout>
  );
}
