import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

const logos = [
  {
    image: require("@site/static/img/companies/insaion.webp").default,
    alt: "INSAION",
    name: "INSAION",
    href: "https://www.insaion.com/blog/reductstore-edge-recording/",
    role: "Fleet edge recording",
  },
  {
    image: require("@site/static/img/integrations/ubuntu.png").default,
    alt: "Ubuntu",
    name: "Ubuntu",
    href: "https://canonical-robotics.readthedocs-hosted.com/en/latest/explanations/observability/what-is-cos-for-robotics/",
    role: "Canonical Observability Stack",
  },
  {
    image: require("@site/static/img/integrations/mcap.webp").default,
    alt: "MCAP",
    name: "MCAP",
    href: "https://mcap.dev/",
    role: "Robotics log format",
  },
  {
    image: require("@site/static/img/integrations/zenoh.png").default,
    alt: "Zenoh",
    name: "Zenoh",
    href: "https://zenoh.io/blog/2026-05-13-reductstore/",
    role: "Robot middleware",
  },
];

function HomepageRobotics() {
  return (
    <div className={styles.logos}>
      {logos.map((logo) => (
        <Link key={logo.name} to={logo.href} className={styles.logoCard}>
          <div className={styles.logoBox}>
            <img src={logo.image} alt={logo.alt} className={styles.logoImage} />
          </div>
          <span className={styles.logoName}>{logo.name}</span>
          <span className={styles.logoRole}>{logo.role}</span>
        </Link>
      ))}
    </div>
  );
}

export default HomepageRobotics;
