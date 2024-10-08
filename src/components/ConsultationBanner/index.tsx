import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

const ConsultationBanner: React.FC = () => {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  return (
    <div className={styles.consultationBanner}>
      <h3 className={styles.title}>Book a Free Consultation</h3>
      <p className={styles.subtitle}>
        Discuss your project requirements and get a free quote
      </p>
      <Link
        to={customFields.calendarLink as string}
        className={`button button--primary button--md ${styles.bookButton}`}
      >
        Book a 30-Minute Call with Me
      </Link>
    </div>
  );
};

export default ConsultationBanner;
