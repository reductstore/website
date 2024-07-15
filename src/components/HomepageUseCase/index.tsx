import React from "react";
import styles from "./styles.module.css";
import UseCaseCards from "../UseCaseCards";
import Heading from '@theme/Heading';
import Link from "@docusaurus/Link";
import clsx from 'clsx';
import useCases from "@site/src/data/useCasesData";

export default function HomepageUseCase() {
  return (
    <section className={styles.section}>
      <Heading as="h2" className={styles.sectionTitle}>Typical Use Cases</Heading>
      <div className={clsx("container", styles.useCasesContainer)}>
        <UseCaseCards useCases={useCases.slice(0, 3)} />
      </div>
      <div className={styles.buttonContainer}>
        <Link to="/use-cases" className="button button--outline button--primary  button--block button--lg">Explore More &rarr;</Link>
      </div>

    </section>
  );
}
