import React from "react";
import { LuZap, LuPiggyBank, LuGlobe, LuPuzzle } from "react-icons/lu";

import styles from "./styles.module.css";

interface BenefitsValue {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const benefits: BenefitsValue[] = [
  {
    icon: <LuZap />,
    title: "High Performance",
    description:
      "Save hours of data processing time for robotics and industrial data workflows, from ingestion to analysis.",
  },
  {
    icon: <LuPiggyBank />,
    title: "Lower Cost at Scale",
    description:
      "Reduce cloud costs by storing only selected data and batching records into fewer objects in S3-compatible storage.",
  },
  {
    icon: <LuGlobe />,
    title: "Distributed by Design",
    description:
      "Collect data from robots and edge devices and stream directly to the cloud or local storage reliably over unstable networks.",
  },
  {
    icon: <LuPuzzle />,
    title: "Extensible & Integrable",
    description:
      "Store data in any format and integrate with existing tools and platforms with custom extensions and SDKs for popular languages.",
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
