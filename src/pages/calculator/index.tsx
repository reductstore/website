import React, { JSX } from "react";
import Layout from "@theme/Layout";
import SimpleHeader from "@site/src/components/shared/SimpleHeader";
import CostCalculator from "@site/src/components/calculator/CostCalculator";
import styles from "./styles.module.css";

export default function Calculator(): JSX.Element {
  return (
    <Layout
      title="Storage Cost Calculator"
      description="Estimate the yearly cost of storing robotics and industrial IoT data in AWS S3, Azure Blob, or MinIO, directly or with ReductStore."
    >
      <main>
        <SimpleHeader pageTitle="Calculate your data storage cost" />
        <div className="container">
          <p className={styles.lead}>
            Tell us what your system records. We estimate the data volume and
            compare direct object storage with ReductStore on the same backend.
          </p>
          <CostCalculator />
        </div>
      </main>
    </Layout>
  );
}
