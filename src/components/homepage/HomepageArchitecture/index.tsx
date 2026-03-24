import React, { JSX } from "react";
import ArchitectureDiagram from "@site/static/img/landing/architecture.svg";
import styles from "./styles.module.css";

export default function HomepageArchitecture(): JSX.Element {
  return (
    <section className={styles.architectureSection}>
      <div className={styles.architectureImage}>
        <ArchitectureDiagram
          className={styles.architectureDiagram}
          role="img"
          aria-label="ReductStore Architecture Diagram"
        />
      </div>
    </section>
  );
}
