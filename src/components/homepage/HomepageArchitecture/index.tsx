import React, { JSX } from "react";
import clsx from "clsx";
import ArchitectureDiagram from "@site/static/img/landing/architecture-backbone.svg";
import ArchitectureDiagramPhone from "@site/static/img/landing/architecture-backbone-phone.svg";
import styles from "./styles.module.css";

export default function HomepageArchitecture(): JSX.Element {
  return (
    <section className={styles.architectureSection}>
      <ArchitectureDiagram
        className={clsx("rs-diagram", styles.diagram, styles.desktop)}
        role="img"
        aria-label="ReductStore at the edge replicating to ReductStore in the cloud, with data sources above the edge and SDKs above the cloud"
      />
      <ArchitectureDiagramPhone
        className={clsx("rs-diagram", styles.diagram, styles.phone)}
        role="img"
        aria-label="ReductStore at the edge replicating to ReductStore in the cloud, with data sources above the edge and SDKs below the cloud"
      />
    </section>
  );
}
