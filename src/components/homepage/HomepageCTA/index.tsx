import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";
import Heading from "@theme/Heading";

function HomepageCTA() {
  return (
    <section className={styles.section}>
      <Heading as="h2">
        Efficient Storage & Streaming for Robotics and Industrial IoT
      </Heading>
      <p>
        Learn how ReductStore helps robotics and IIoT teams manage petabytes of
        multimodal data-at the edge and in the cloud-with a unified solution
        that delivers 10x speed, 90% lower infrastructure costs, and zero data
        loss, even with limited bandwidth and poor connectivity.
      </p>
      <Link className="button button--primary button--lg" to="/whitepaper">
        Download White Paper (PDF)
      </Link>
    </section>
  );
}

export default HomepageCTA;
