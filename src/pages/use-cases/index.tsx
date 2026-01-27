import React, { JSX } from "react";
import Layout from "@theme/Layout";
import SimpleHeader from "@site/src/components/shared/SimpleHeader";
import styles from "./styles.module.css";
import UseCaseCards from "@site/src/components/useCases/UseCaseCards";
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
        <div className={clsx("container", styles.useCasesContainer)}>
          <UseCaseCards useCases={useCases} />
        </div>
      </main>
    </Layout>
  );
}
