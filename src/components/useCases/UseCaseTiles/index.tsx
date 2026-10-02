import React, { JSX } from "react";
import Link from "@docusaurus/Link";
import { ICONS } from "@site/src/data/icons";
import styles from "./styles.module.css";

export interface UseCase {
  title: string;
  link: string;
  icon: string;
  data: string;
}

export default function UseCaseTiles({
  useCases,
}: {
  useCases: UseCase[];
}): JSX.Element {
  return (
    <div className={styles.grid}>
      {useCases.map(({ title, data, link, icon }) => {
        const Icon = ICONS[icon];
        return (
          <Link key={link} to={link} className={styles.tile}>
            <span className={styles.icon}>{Icon && <Icon />}</span>
            <span className={styles.tileTitle}>{title}</span>
            <span className={styles.data}>{data}</span>
          </Link>
        );
      })}
    </div>
  );
}
