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
          title="⚡ Ultra-Fast Ingestion & Access"
          description="Capture and retrieve raw sensor data, images, LiDAR, logs, and more—10x faster than traditional time series databases. Designed for high-throughput robotics and IIoT workloads."
        />
        <Benefits
          path_light="/img/benefits/simplify_your_infrastructure.webp"
          path_dark="/img/benefits/simplify_your_infrastructure_black.webp"
          title="💰 Built for Scale, Not Cost"
          description="Store billions of time-indexed records at the edge and in the cloud, and automatically offload cold data to reduce infrastructure costs by up to 90%."
        />
        <Benefits
          path_light="/img/benefits/stay_in_control_of_your_data.webp"
          path_dark="/img/benefits/stay_in_control_of_your_data_black.webp"
          title="🔒 Reliable by Design - Edge to Cloud"
          description="Stream, store, and replicate critical data even with poor connectivity. Avoid data loss, disk overflow, and sync only what matters with label-based filtering and automated retention."
        />
      </div>
    </section>
  );
}
