import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import styles from './styles.module.css';
import { FaQuestionCircle } from "react-icons/fa";

interface Category {
  title: string;
  description: React.ReactNode;
  titleDetail?: string;
  descriptionDetail?: string;
}

interface PricingPlanProps {
  title: string;
  subtitle: string;
  price: string;
  priceUnit: string;
  description: string;
  categories: Category[];
  buttonUrl: string;
  buttonLabel: string;
  isHighlight: boolean;
}

const PricingPlan: React.FC<PricingPlanProps> = ({
  title,
  subtitle,
  price,
  priceUnit,
  description,
  categories,
  buttonUrl,
  buttonLabel,
  isHighlight,
}) => {
  const planId = title.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '');
  return (
    <div className={clsx(styles.plan, { [styles.highlight]: isHighlight })}>
      <div className={styles.planCard}>
        <div className="card__header">
          <h2 className={styles.planTitle}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
          <h3>
            {price}
            <span className={styles.priceUnit}>{priceUnit}</span>
          </h3>
          <div className={styles.learnMore}>
            <span data-tooltip-id={`${planId}-planDescriptionTooltip`} className={styles.underlinedText}>
              Learn more
            </span>
            <Tooltip id={`${planId}-planDescriptionTooltip`} className={styles.tooltipContent} place="bottom">
              {description}
            </Tooltip>
          </div>
        </div>

        <hr className={styles.categorySeparator} />

        <div className="card__body">
          {categories.map((category, idx) => (
            <div key={idx} className={styles.category}>
              <div className={styles.categoryTitle}>
                <span>
                  {category.title}
                  {category.titleDetail && (
                    <>
                      <FaQuestionCircle
                        data-tooltip-id={`${planId}-titleTip-${idx}`}
                        className={styles.infoIcon}
                      />
                      <Tooltip id={`${planId}-titleTip-${idx}`} className={styles.tooltipContent} place="bottom">
                        {category.titleDetail}
                      </Tooltip>
                    </>
                  )}
                </span>
              </div>
              <div className={styles.categoryDescription}>
                <span>
                  {category.description}
                  {category.descriptionDetail && (
                    <>
                      <FaQuestionCircle
                        data-tooltip-id={`${planId}-descriptionTip-${idx}`}
                        className={styles.infoIcon}
                      />
                      <Tooltip id={`${planId}-descriptionTip-${idx}`} className={styles.tooltipContent} place="bottom">
                        {category.descriptionDetail}
                      </Tooltip>
                    </>
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="card__footer">
          <Link to={buttonUrl} className={clsx("button button--lg button--block",
            {
              "button--primary": isHighlight,
              "button--secondary": !isHighlight,
            }
          )}>
            {buttonLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PricingPlan;
