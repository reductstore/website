import React from 'react';
import styles from './styles.module.css';
import { FaCheckCircle } from 'react-icons/fa';

const PromotionalBanner = () => {
  const checkedIcon = <FaCheckCircle color="green" size="1em" />;


  return (
    <>
      <div className="alert alert--warning margin-bottom--lg">
        <div className="container">
          <div>
            <h3>Free Evaluation and Proof of Concept (PoC)</h3>
            <p>
              Secure your spot today, and our team will contact you to understand your requirements and provide you with a customized evaluation tailored to your project.
            </p>
            <ul className={styles.benefitsList}>
              <li>{checkedIcon} Consultation call to understand your requirements</li>
              <li>{checkedIcon} Custom evaluation tailored to your project</li>
              <li>{checkedIcon} Active support during the PoC phase and beyond</li>
            </ul>
          </div>
        </div>
      </div>

    </>
  );
};

export default PromotionalBanner;
