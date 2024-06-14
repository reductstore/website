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
        <Link to="/use-cases" className="button button--outline button--primary button--lg">Explore More &rarr;</Link>
      </div>
    </section>
  );
}

const useCases = [
  {
    title: "High Frequency Vibration Data Storage",
    description: "Learn how to store and manage high-frequency vibration data.",
    link: "/use-cases/vibration-sensors"
  },
  {
    title: "AI Infrastructure",
    description: "Learn how to store and manage data for AI workflows.",
    link: "/use-cases/ai-workflows"
  },
  {
    title: "Computer Vision Applications",
    description: "Learn how to store data for computer vision applications.",
    link: "/blog/tutorials/computer-vision/3-ways-stora-data-for-computer-vision-applications"
  },
  {
    title: "MQTT Data Storage",
    description: "Learn how to store and manage MQTT data.",
    link: "/blog/advice/database/mqtt-data-storage"
  },
  {
    title: "Robot Operating System (ROS)",
    description: "Learn how to store and manage image data for ROS-based computer vision applications.",
    link: "/blog/tutorials/ros/optimal-image-storage-solutions-for-ros-based-computer-vision"
  }
];