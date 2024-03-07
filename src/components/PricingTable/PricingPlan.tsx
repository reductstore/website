import React, { useState } from 'react';
import clsx from 'clsx';
import { Tooltip } from 'react-tooltip';
import styles from './styles.module.css';
import { FaQuestionCircle } from "react-icons/fa";
import RenderButtonLink from '../RenderButtonLink';
import Link from '@docusaurus/Link';

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
  isHighlight?: boolean;
  isFree?: boolean;
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
  isHighlight = false,
  isFree = false,
}) => {
  const planId = title.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '');
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const handleTermsChange = (e) => {
    setIsTermsAccepted(e.target.checked);
    setButtonClicked(false);
  };
  const handleButtonClick = () => {
    setButtonClicked(true);
  };
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
          <RenderButtonLink
            buttonUrl={buttonUrl}
            buttonLabel={buttonLabel}
            isHighlight={isHighlight}
            disabled={!isTermsAccepted && !isFree}
            onClick={handleButtonClick}
          />

          {isFree ? (
            <div className={styles.termsGroup} >
              Distributed under the terms of the <Link to="https://github.com/reductstore/reductstore/blob/main/LICENSE" className={styles.boldLink}>BUSL</Link> license.
            </div>
          ) : (
            <div className={clsx(styles.termsGroup, { [styles.error]: buttonClicked && !isTermsAccepted })}>
              <input
                type="checkbox"
                id={`${planId}-checkbox`}
                name="termsAndConditions"
                checked={isTermsAccepted}
                onChange={handleTermsChange}
              />
              <label htmlFor={`${planId}-checkbox`}>
                I agree to the <Link to="/terms" className={styles.boldLink}>Terms and Conditions</Link>
              </label>
              <div className={styles.errorMessage}>Please accept the Terms and Conditions to proceed.</div>
            </div>
          )
          }
        </div>
      </div>
    </div>
  );
}

export default PricingPlan;
