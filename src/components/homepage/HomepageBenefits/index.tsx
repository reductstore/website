import React from "react";
import {
  LuZap,
  LuPiggyBank,
  LuGlobe,
  LuDatabase,
  LuPuzzle,
} from "react-icons/lu";

import styles from "./styles.module.css";

interface BenefitsValue {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const benefits: BenefitsValue[] = [
  {
    icon: <LuPuzzle />,
    title: "Any Data Format",
    description:
      "Store multimodal time series of any size: images, video, LiDAR, IMU, logs, files, ROS bags and more.",
  },
  {
    icon: <LuGlobe />,
    title: "Fleet Scale Collection",
    description:
      "Collect from many robots or devices and replicate to the cloud over intermittent connectivity.",
  },
  {
    icon: <LuPiggyBank />,
    title: "Lower Cost at Scale",
    description:
      "Use S3 compatible blob storage and batch records into fewer objects to reduce storage and API costs.",
  },
  {
    icon: <LuZap />,
    title: "Best Performance",
    description:
      "High throughput ingestion and fast retrieval of exact time ranges for replay, debugging, and training.",
  },
];

function Benefit({ icon, title, description }: BenefitsValue) {
  return (
    <div className={styles.benefitCard}>
      <div className={styles.benefitIcon}>{icon}</div>
      <h3 className={styles.benefitTitle}>{title}</h3>
      <p className={styles.benefitDescription}>{description}</p>
    </div>
  );
}

export default function HomepageBenefits() {
  return (
    <section className={styles.benefits}>
      <div className={styles.benefitsRow}>
        {benefits.map((benefit, idx) => (
          <Benefit key={idx} {...benefit} />
        ))}
      </div>
    </section>
  );
}
