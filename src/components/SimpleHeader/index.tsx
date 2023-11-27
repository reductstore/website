import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

function SimpleHeader({ pageTitle }) {
  return (
    <header className={styles.Banner}>
      <div className="container">
        <h1 className={styles.BannerTitle}>{pageTitle}</h1>
      </div>
    </header>
  );
}

export default SimpleHeader;
