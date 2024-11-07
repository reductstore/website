import React, { SVGProps } from "react";
import styles from "./styles.module.css";
import Heading from "@theme/Heading";
import WaitingListForm from "../../forms/WaitingListForm";
import { FaCheck } from "react-icons/fa"; // Importing icon

interface SimpleHeaderWithFormProps {
  title: string;
  subtitle: string;
  benefits: string[];
  imageSvg: React.ReactNode;
  formId: string;
  headerTag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

function SimpleHeaderWithForm({
  title,
  subtitle,
  benefits,
  imageSvg,
  formId,
  headerTag = "h1",
}: SimpleHeaderWithFormProps) {
  return (
    <header className={styles.Banner}>
      <div className={`container ${styles.BannerContent}`}>
        <div className={styles.BannerLeft}>
          <Heading as={headerTag} className={styles.BannerTitle}>
            {title}
          </Heading>
          <p className={styles.BannerSubtitle}>{subtitle}</p>
          <WaitingListForm elementId={formId} />
          <ul className={styles.BenefitsList}>
            {benefits.map((benefit, index) => (
              <li key={index} className={styles.BenefitItem}>
                <FaCheck className={styles.BenefitIcon} />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.BannerRight}>{imageSvg}</div>
      </div>
    </header>
  );
}

export default SimpleHeaderWithForm;
