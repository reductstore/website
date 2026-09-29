import React, { JSX } from "react";
import Layout from "@theme/Layout";
import SimpleHeader from "@site/src/components/shared/SimpleHeader";
import styles from "./styles.module.css";
import UseCaseTiles from "@site/src/components/useCases/UseCaseTiles";
import clsx from "clsx";
import useCases from "@site/src/data/useCasesData";

export default function UseCases(): JSX.Element {
  return (
    <Layout
      title="Explore Typical Use Cases"
      description="Learn how our solutions can help you transform your infrastructure."
    >
      <main>
        <SimpleHeader pageTitle="Explore Typical Use Cases" />
        <div className="container">
          <p className={styles.lead}>
            See how teams use ReductStore to capture, store, and replicate
            time-indexed data, from robot fleets and factory floors to vision
            and machine learning pipelines.
          </p>
        </div>
        <div className={clsx("container", styles.useCasesContainer)}>
          <UseCaseTiles useCases={useCases} />
        </div>
      </main>
    </Layout>
  );
}
