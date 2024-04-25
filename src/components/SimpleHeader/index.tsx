import React from "react";
import styles from "./styles.module.css";

interface SimpleHeaderProps {
  pageTitle: string;
  subtitle?: string;
}

function SimpleHeader({ pageTitle, subtitle }: SimpleHeaderProps) {
  return (
    <header className={styles.Banner}>
      <div className="container">
        <h1 className={styles.BannerTitle}>{pageTitle}</h1>
        {subtitle && <p className={styles.BannerSubtitle}>{subtitle}</p>}
      </div>
    </header>
  );
}

export default SimpleHeader;
