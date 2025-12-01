import React, { useState } from "react";
import clsx from "clsx";
import { Tooltip } from "react-tooltip";
import styles from "./styles.module.css";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import RenderButtonLink from "../RenderButtonLink";

interface Category {
  title: string | React.ReactNode;
  available: boolean;
  titleDetail?: string;
  isCategoryHeader?: boolean;
}

interface PricingPlanProps {
  title: string;
  subtitle: string;
  description: string;
  categories: Category[];
  buttonLabel: string;
  buttonUrl?: string;
  onClick?: () => void;
  isHighlight?: boolean;
  termsUrl?: string;
}

const PricingPlan: React.FC<PricingPlanProps> = ({
  title,
  subtitle,
  description,
  categories,
  buttonLabel,
  buttonUrl,
  onClick,
  isHighlight = false,
  termsUrl = "/terms",
}) => {
  const planId = title.replace(/\s+/g, "").replace(/[^a-zA-Z0-9]/g, "");
  return (
    <div className={clsx(styles.plan, { [styles.highlight]: isHighlight })}>
      <div className={styles.planHeader}>
        <h2 className={styles.planTitle}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
        <div className={styles.buttonContainer}>
          <RenderButtonLink
            buttonUrl={buttonUrl}
            buttonLabel={buttonLabel}
            isHighlight={isHighlight}
            onClick={onClick}
          />
        </div>
        <div className={styles.learnMore}>
          <span
            data-tooltip-id={`${planId}-planDescriptionTooltip`}
            className={styles.underlinedText}
          >
            Learn more
          </span>
          <Tooltip
            id={`${planId}-planDescriptionTooltip`}
            className={styles.tooltipContent}
            place="bottom"
          >
            {description}
          </Tooltip>
        </div>
      </div>

      <hr className={styles.categorySeparator} />

      <div className={styles.featuresContainer}>
        {categories.map((category, idx) => {
          if (category.isCategoryHeader) {
            return (
              <div key={idx} className={styles.categoryHeader}>
                <h4 className={styles.categoryHeaderTitle}>{category.title}</h4>
              </div>
            );
          }

          return (
            <div key={idx} className={styles.category}>
              <div className={styles.categoryTitle}>
                <span className={styles.categoryTitleContent}>
                  {category.available ? (
                    <FaCheckCircle
                      color="green"
                      size="1.2em"
                      className={styles.featureIcon}
                    />
                  ) : (
                    <FaTimes
                      color="#ccc"
                      size="1.2em"
                      className={styles.featureIcon}
                    />
                  )}
                  <span className={styles.categoryText}>
                    {category.available && category.titleDetail ? (
                      <>
                        <span
                          data-tooltip-id={`${planId}-titleTip-${idx}`}
                          className={styles.tooltipTrigger}
                        >
                          {category.title}
                        </span>
                        <Tooltip
                          id={`${planId}-titleTip-${idx}`}
                          className={styles.tooltipContent}
                          place="bottom"
                        >
                          {category.titleDetail}
                        </Tooltip>
                      </>
                    ) : (
                      category.title
                    )}
                  </span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.termsContainer}>
        <a href={termsUrl} className={styles.termsLink}>
          Terms & Conditions
        </a>
      </div>
    </div>
  );
};

export default PricingPlan;
