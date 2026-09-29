import React, { JSX } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import type { UseCase } from "@site/src/data/useCasesData";
import styles from "./styles.module.css";

export default function UseCaseCards({
  useCases,
}: {
  useCases: UseCase[];
}): JSX.Element {
  return (
    <>
      {useCases.map(({ title, description, link, diagram: Diagram }) => (
        <Link
          key={link}
          to={link}
          className={clsx(styles.useCaseCard, {
            [styles.withDiagram]: Diagram,
          })}
        >
          {Diagram && (
            <div className={styles.diagram}>
              <Diagram className="rs-diagram" aria-hidden="true" />
            </div>
          )}
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
          <span className={styles.more}>
            Learn more <span aria-hidden="true">→</span>
          </span>
        </Link>
      ))}
    </>
  );
}
