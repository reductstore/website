import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";

const logos = [
  {
    image: require("@site/static/img/companies/insaion.webp").default,
    alt: "INSAION",
    name: "INSAION",
    role: "Fleet edge recording",
  },
  {
    image: require("@site/static/img/integrations/ubuntu.png").default,
    alt: "Ubuntu",
    name: "Ubuntu",
    role: "Canonical Observability Stack",
  },
  {
    image: require("@site/static/img/integrations/mcap.webp").default,
    alt: "MCAP",
    name: "MCAP",
    role: "Robotics log format",
  },
  {
    image: require("@site/static/img/integrations/zenoh.png").default,
    alt: "Zenoh",
    name: "Zenoh",
    role: "Robot middleware",
  },
];

function HomepageRobotics() {
  return (
    <div className={styles.roboticsSection}>
      <div className="text--center">
        <h3 className={styles.heading}>Works with your robotics stack</h3>
        <p className={styles.description}>
          ReductBridge records ROS 2 topics, ReductStore ingests MCAP and Zenoh,
          plugs into Canonical's COS, and powers INSAION fleets.
        </p>
        <div className={styles.logos}>
          {logos.map((logo) => (
            <div key={logo.name} className={styles.logoCard}>
              <div className={styles.logoBox}>
                <img
                  src={logo.image}
                  alt={logo.alt}
                  className={styles.logoImage}
                />
              </div>
              <span className={styles.logoName}>{logo.name}</span>
              <span className={styles.logoRole}>{logo.role}</span>
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
