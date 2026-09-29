import React from "react";
import styles from "./styles.module.css";
import UseCaseTiles from "../../useCases/UseCaseTiles";
import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";
import useCases from "@site/src/data/useCasesData";

export default function HomepageUseCase() {
  return (
    <section className={styles.section}>
      <Heading as="h2" className={styles.sectionTitle}>
        Typical Use Cases
      </Heading>
      <UseCaseTiles useCases={useCases.slice(0, 12)} />
      <div className={styles.buttonContainer}>
        <Link
          to="/use-cases"
          className="button button--outline button--primary  button--block button--lg"
        >
          Explore More &rarr;
        </Link>
      </div>
    </section>
  );
}
