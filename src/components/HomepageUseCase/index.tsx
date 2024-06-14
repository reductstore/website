import React from "react";
import styles from "./styles.module.css";
import UseCaseCards from "../UseCaseCards";
import Heading from '@theme/Heading';
import Link from "@docusaurus/Link";
import clsx from 'clsx';

export default function HomepageUseCase() {
  return (
    <section className={styles.section}>
      <Heading as="h2" className={styles.sectionTitle}>Typical Use Cases</Heading>
      <div className={clsx("container", styles.useCasesContainer)}>
        <UseCaseCards useCases={useCases} />
      </div>
      <div className={styles.buttonContainer}>
        <Link to="/use-cases" className="button button--outline button--primary  button--block button--lg">Explore More &rarr;</Link>
      </div>

    </section>
  );
}

const useCases = [
  {
    title: "High Frequency Vibration Data Storage",
    description: "Learn how to store and manage high-frequency vibration data.",
    link: "/use-cases/vibration-sensors",
    image: require("@site/static/img/vibration-sensors/reduction-strategy.webp").default,
  },
  {
    title: "AI Infrastructure",
    description: "Learn how to store and manage data for AI workflows.",
    link: "/use-cases/ai-workflows",
    image: require("@site/static/img/ai-workflows/data-replication-with-label-filtering.webp").default,
  },
  {
    title: "Computer Vision Applications",
    description: "Learn how to store data for computer vision applications.",
    link: "/blog/tutorials/computer-vision/3-ways-stora-data-for-computer-vision-applications",
    image: require("@site/static/img/ai-workflows/ai-labels-and-metadata-for-every-record.webp").default,
  },
  {
    title: "MQTT Data Storage",
    description: "Learn how to store and manage MQTT data.",
    link: "/blog/advice/database/mqtt-data-storage",
    image: require("@site/static/img/ai-workflows/ai-labels-and-metadata-for-every-record.webp").default,
  },
  {
    title: "Robot Operating System (ROS)",
    description: "Learn how to store and manage image data for ROS-based computer vision applications.",
    link: "/blog/tutorials/ros/optimal-image-storage-solutions-for-ros-based-computer-vision",
    image: require("@site/static/img/ai-workflows/ai-labels-and-metadata-for-every-record.webp").default,
  },
];