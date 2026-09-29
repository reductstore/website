import React from "react";
import styles from "./styles.module.css";
import Heading from "@theme/Heading";

interface SimpleHeaderProps {
  pageTitle: string;
  pageTitleAs?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  id?: string;
}

function SimpleHeader({ pageTitle, pageTitleAs, id }: SimpleHeaderProps) {
  return (
    <header className={styles.Banner}>
      <div className="container">
        <Heading
          as={pageTitleAs || "h1"}
          id={id}
          className={styles.BannerTitle}
        >
          {pageTitle}
        </Heading>
      </div>
    </header>
  );
}

export default SimpleHeader;
