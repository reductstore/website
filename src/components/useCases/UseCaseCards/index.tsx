import React, { JSX } from "react";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";

interface UseCase {
  title: string;
  description: string;
  link: string;
}

export default function UseCaseCards({
  useCases,
}: {
  useCases: UseCase[];
}): JSX.Element {
  return (
    <>
      {useCases.map((useCase) => (
        <Link
          key={useCase.link}
          to={useCase.link}
          className={styles.useCaseCard}
        >
          <h3 className={styles.title}>{useCase.title}</h3>
          <p className={styles.description}>{useCase.description}</p>
          <span className={styles.more}>
            Learn more <span aria-hidden="true">→</span>
          </span>
        </Link>
      ))}
    </>
  );
}
