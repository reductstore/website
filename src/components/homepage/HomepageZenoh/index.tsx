import React, { JSX } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import ZenohDiagram from "@site/static/img/landing/zenoh-api.svg";
import styles from "./styles.module.css";

export default function HomepageZenoh(): JSX.Element {
  return (
    <section className={styles.section}>
      <div className={clsx("row", styles.row)}>
        <div className="col col--5 text--center">
          <h2>Native Zenoh API</h2>
          <p>
            ReductStore joins your Zenoh network as a regular peer. It
            subscribes to key expressions, stores every sample with its
            timestamp, encoding, and attachment labels, and answers get()
            queries on the same key space. No bridge and no glue code on the
            device.
          </p>
          <Link
            className={clsx("button button--primary button--lg", styles.btn)}
            to="/docs/integrations/zenoh"
          >
            Learn More →
          </Link>
          <p className={styles.note}>
            Read the announcement on the{" "}
            <Link to="https://zenoh.io/blog/2026-05-13-reductstore/">
              Zenoh blog
            </Link>
            .
          </p>
        </div>
        <div className="col col--7">
          <ZenohDiagram
            className={clsx("rs-diagram", styles.diagram)}
            role="img"
            aria-label="ReductStore joins a Zenoh network as a peer. Zenoh keys become entries, encodings become content types, attachments become labels, HLC timestamps become record timestamps, and get() selectors become queries."
          />
        </div>
      </div>
    </section>
  );
}
