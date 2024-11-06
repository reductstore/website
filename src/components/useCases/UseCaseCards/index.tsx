import React from "react";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";
import clsx from "clsx";

interface UseCase {
  title: string;
  description: string;
  link: string;
  image?: string;
}

export default function UseCaseCards({
  useCases,
}: {
  useCases: UseCase[];
}): JSX.Element {
  return (
    <>
      {useCases.map((useCase, index) => (
        <div key={index} className={clsx("card", styles.useCaseCard)}>
          {useCase.image && (
            <div className="card__image">
              <img
                src={useCase.image}
                alt={useCase.title}
                title={useCase.title}
              />
            </div>
          )}
          <div className="card__header">
            <h3>{useCase.title}</h3>
          </div>
          <div className="card__body">
            <p>{useCase.description}</p>
          </div>
          <div className="card__footer">
            <Link
              to={useCase.link}
              className="button button--primary button--block"
            >
              Learn More &rarr;
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
