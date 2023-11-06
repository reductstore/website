import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

function HomepageCTA() {
  return (
    <section className={styles.ctaSection}>
      <div className={"container"}>
        <div className="row">
          <div className="col col--8 col--offset-2 text--center">
            <h3>Empower Your Edge AI Journey with ReductStore</h3>
            <p>
              Venturing into the new age of intelligent edge computing? Dive
              deep with ReductStore, not just as a database, but as your guiding
              light in this AI-centric revolution. Every millisecond, every
              piece of data counts. Equip yourself with the right tools,
              tailor-made MLOps functionalities, and the promise of tomorrow.
            </p>
            <Link
              className="button button--primary button--lg"
              to="/docs/docs/getting-started"
            >
              Explore AI Edge Computing with ReductStore
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomepageCTA;
