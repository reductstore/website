import React, { JSX } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import SelectDiagram from "@site/static/img/landing/reduct-select.svg";
import SelectDiagramPhone from "@site/static/img/landing/reduct-select-phone.svg";
import styles from "./styles.module.css";

const LABEL =
  "JSON logs, CSV telemetry, Parquet tables and Protobuf events stored in ReductStore are queried with DataFusion SQL by ReductSelect and exported as Parquet batched by time, CSV batched by rows, or computed labels";

export default function HomepageReductSelect(): JSX.Element {
  return (
    <section className={styles.section}>
      <div className={clsx("row", styles.row)}>
        <div className="col col--7">
          <SelectDiagram
            className={clsx("rs-diagram", styles.diagram, styles.desktop)}
            role="img"
            aria-label={LABEL}
          />
          <SelectDiagramPhone
            className={clsx("rs-diagram", styles.diagram, styles.phone)}
            role="img"
            aria-label={LABEL}
          />
        </div>
        <div className="col col--5 text--center">
          <h2>SQL on Your Stored Data</h2>
          <p>
            Store logs, telemetry, and documents as JSON, CSV, Parquet, or
            Protobuf records as they arrive. Query them with DataFusion SQL on
            the server, batch small records into bigger files by rows or time,
            export CSV, JSON, or Parquet, and turn results into labels you can
            filter on.
          </p>
          <Link
            className={clsx("button button--primary button--lg", styles.btn)}
            to="/docs/extensions/official/select-ext#sql-source"
          >
            Learn More →
          </Link>
        </div>
      </div>
    </section>
  );
}
