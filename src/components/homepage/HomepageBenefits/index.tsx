import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import ThemedImage from "@theme/ThemedImage";

import styles from "./styles.module.css";

interface BenefitsValue {
  path_light: string;
  path_dark: string;
  title: string;
  description: string;
}

function Benefits({
  path_light,
  path_dark,
  title,
  description,
}: BenefitsValue) {
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
          path_light="/img/benefits/get_the_best_performance.webp"
          path_dark="/img/benefits/get_the_best_performance_black.webp"
          title="Best Performance"
          description="Outperform any other time series databases by 10-100x for time series object data."
        />
        <Benefits
          path_light="/img/benefits/simplify_your_infrastructure.webp"
          path_dark="/img/benefits/simplify_your_infrastructure_black.webp"
          title="Lowest Cost"
          description="Store billions of time-stamped blobs with AI labels at the cost of blob storage."
        />
        <Benefits
          path_light="/img/benefits/stay_in_control_of_your_data.webp"
          path_dark="/img/benefits/stay_in_control_of_your_data_black.webp"
          title="Robust and Reliable"
          description="Tailored for edge computing, computer vision, and IoT applications."
        />
      </div>
    </section>
  );
}
