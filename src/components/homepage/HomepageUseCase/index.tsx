import React from "react";
import styles from "./styles.module.css";
import UseCaseTiles from "../../useCases/UseCaseTiles";
import Heading from "@theme/Heading";
import useCases from "@site/src/data/useCasesData";

export default function HomepageUseCase() {
  return (
    <section className={styles.section}>
      <Heading as="h2" id="use-cases" className={styles.sectionTitle}>
        Typical Use Cases
      </Heading>
      <UseCaseTiles useCases={useCases} />
    </section>
  );
}
