import React, { JSX } from "react";
import Link from "@docusaurus/Link";
import type { UseCase } from "@site/src/data/useCasesData";
import styles from "./styles.module.css";

export default function UseCaseTiles({
  useCases,
}: {
  useCases: UseCase[];
}): JSX.Element {
  return (
    <div className={styles.grid}>
      {useCases.map(({ title, data, link, icon: Icon }) => (
        <Link key={link} to={link} className={styles.tile}>
          <span className={styles.icon}>
            <Icon />
          </span>
          <span className={styles.tileTitle}>{title}</span>
          <span className={styles.data}>{data}</span>
        </Link>
      ))}
    </div>
  );
}
