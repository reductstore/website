import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";

const logos = [
  {
    image: require("@site/static/img/companies/insaion.webp").default,
    alt: "INSAION",
  },
  {
    image: require("@site/static/img/integrations/ubuntu.png").default,
    alt: "Ubuntu",
  },
  {
    image: require("@site/static/img/integrations/mcap.webp").default,
    alt: "MCAP",
  },
  {
    image: require("@site/static/img/integrations/zenoh.png").default,
    alt: "Zenoh",
  },
];

function HomepageRobotics() {
  return (
    <div className={styles.roboticsSection}>
      <div className="text--center">
        <h2>Robotics Support</h2>
        <p className={styles.description}>
          ReductStore is built for the robotics stack. Reduct Bridge records ROS
          2 topics straight to storage, and it ingests MCAP files, Zenoh
          streams, and raw sensor data with timestamps and labels. It plugs into
          Canonical's Observability Stack (COS) for robotics on Ubuntu, and it
          powers INSAION's edge recording across whole fleets.
        </p>
        <div className={styles.logos}>
          {logos.map((logo, index) => (
            <div key={index} className={styles.logoBox}>
              <img
                src={logo.image}
                alt={logo.alt}
                className={styles.logoImage}
              />
            </div>
          ))}
        </div>
        <Link
          className={clsx("button button--primary button--lg", styles.btn)}
          to="/blog/database-for-robotics"
        >
          Learn More →
        </Link>
      </div>
    </div>
  );
}

export default HomepageRobotics;
