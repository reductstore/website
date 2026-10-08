import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

interface PricingPlanProps {
  title: string;
  tagline: string;
  price?: React.ReactNode;
  actions: React.ReactNode;
  bullets: React.ReactNode[];
  footNote?: React.ReactNode;
  isHighlight?: boolean;
}

const PricingPlan: React.FC<PricingPlanProps> = ({
  title,
  tagline,
  price,
  actions,
  bullets,
  footNote,
  isHighlight = false,
}) => (
  <article className={clsx(styles.plan, { [styles.highlight]: isHighlight })}>
    <h2 className={styles.planTitle}>{title}</h2>
    <p className={styles.tagline}>{tagline}</p>
    <div className={styles.priceRow}>{price}</div>
    <div className={styles.actionsRow}>
      <div className={styles.buttonContainer}>{actions}</div>
      {footNote && <p className={styles.footNote}>{footNote}</p>}
    </div>
    <ul className={styles.summaryBullets}>
      {bullets.map((bullet, index) => (
        <li key={index}>{bullet}</li>
      ))}
    </ul>
  </article>
);

export default PricingPlan;
