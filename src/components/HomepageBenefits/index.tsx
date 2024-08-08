import React from "react";
import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';

import styles from "./styles.module.css";

interface BenefitsValue {
  path_light: string;
  path_dark: string;
  title: string;
  description: string;
}

function Benefits({ path_light, path_dark, title, description }: BenefitsValue) {
  return (
    <div className="col col--4">
      <div className={styles.benefit}>
        <ThemedImage
          className={styles.benefitIcon}
          alt={title}
          sources={{
            light: useBaseUrl(path_light),
            dark: useBaseUrl(path_dark),
          }}
        />
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageBenefits() {
  return (
    <section className={styles.benefits}>
      <div className="row">
        <Benefits
          path_light="/img/benefits/simplify_your_infrastructure.png"
          path_dark="/img/benefits/simplify_your_infrastructure.png"
          title="Simplify Your Infrastructure"
          description="Merge blob and time series functionalities, reducing the need for multiple databases."
        />
        <Benefits
          path_light="/img/benefits/stay_in_control_of_your_data.png"
          path_dark="/img/benefits/stay_in_control_of_your_data.png"
          title="Stay In Control Of Your Data"
          description="Customize real-time data retention policies and replication strategies."
        />
        <Benefits
          path_light="/img/benefits/handle_large_data_volume.png"
          path_dark="/img/benefits/handle_large_data_volume.png"
          title="Handle Large Data Volumes"
          description="Store billions of time-stamped blobs with AI labels and access them with low latency."
        />
      </div>
    </section>
  );
}

