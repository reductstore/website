import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import SimpleHeader from "@site/src/components/SimpleHeader";
import clsx from 'clsx';
import styles from './styles.module.css';

export default function UseCases(): JSX.Element {
  return (
    <Layout
      title="Explore Use Cases"
      description="Learn how our solutions can help you transform your infrastructure."
    >
      <main>
        <SimpleHeader pageTitle="Explore Use Cases" />
        <div className={clsx("container", styles.useCasesContainer)}>
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
                  Learn More &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </Layout >
  );
}

const useCases = [
  {
    title: "Vibration Sensor Database",
    description: "Learn how ReductStore stands out for high-throughput applications such as vibration sensor data storage and management.",
    link: "/use-cases/vibration-sensors"
  },
  {
    title: "Optimize Your AI Workflows",
    description: "Learn how ReductStore can improve the performance of your projects with an optimal infrastructure.",
    link: "/use-cases/ai-workflows"
  }
];