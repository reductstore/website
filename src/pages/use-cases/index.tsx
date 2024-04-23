import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import SimpleHeader from "@site/src/components/SimpleHeader";
import clsx from 'clsx';
import styles from './styles.module.css';

const useCases = [
  {
    title: "AI",
    description: "Explore how AI can transform your workflows.",
    link: "/use-cases/ai"
  }
];

export default function UseCases(): JSX.Element {
  return (
    <Layout
      title="Use Cases"
      description="Learn how our solutions can help you transform your infrastructure."
    >
      <main>
        <SimpleHeader pageTitle="Use Cases" />

        <div className="container">

          <div>
            {useCases.map((useCase, index) => (
              <div key={index} className={clsx("card", styles.useCaseCard)}>

                <div className="card__header">
                  <h3>{useCase.title}</h3>
                </div>

                <div className="card__body">
                  <p>{useCase.description}</p>
                </div>

                <div className="card__footer">
                  <Link to={useCase.link} className="button button--primary button--block">
                    Learn More
                  </Link>
                </div>

              </div>
            ))}
          </div>

        </div>
      </main>
    </Layout >
  );
}
