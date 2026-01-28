import React, { JSX } from "react";
import styles from "./styles.module.css";
import ThemedImage from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";

export default function HomepageArchitecture(): JSX.Element {
  return (
    <section className={styles.architectureSection}>
      <ThemedImage
        alt="ReductStore Architecture Diagram"
        sources={{
          light: useBaseUrl("/img/landing/architecture-light.svg"),
          dark: useBaseUrl("/img/landing/architecture-dark.svg"),
        }}
      />
    </section>
  );
}
