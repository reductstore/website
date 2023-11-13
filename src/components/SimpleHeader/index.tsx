import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

function SoftHeader({ pageTitle }) {
  return (
    <header className={clsx("hero", styles.softHeroBanner)}>
      <div className="container">
        <h1 className={clsx("hero__title", styles.heroTitle)}>{pageTitle}</h1>
      </div>
    </header>
  );
}

export default SoftHeader;
