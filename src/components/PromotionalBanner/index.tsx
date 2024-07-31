import React, { useState } from 'react';
import styles from './styles.module.css';
import { FaCheckCircle } from 'react-icons/fa';
import FreePoCForm from '../FreePoCForm';

const PromotionalBanner = () => {
  const checkedIcon = <FaCheckCircle color="green" size="1em" />;
  const [openModal, setOpenModal] = useState(false);
  const [clostModal, setCloseModal] = useState(false);

  return (
    <>
      <div className="alert alert--warning margin-bottom--lg">
        <div className="container">
          <div>
            <h3>Free Evaluation and Proof of Concept (PoC)</h3>
            <p>
              Secure your spot today, and our team will reach out to you to understand your requirements and provide a custom evaluation tailored to your project.
            </p>
            <ul className={styles.benefitsList}>
              <li>{checkedIcon} Consultation call to understand your requirements</li>
              <li>{checkedIcon} Custom evaluation tailored to your project</li>
              <li>{checkedIcon} Active support during the PoC phase and beyond</li>
            </ul>
            <div className={styles.buttonContainer}>
              <button className="button button--primary" >
                Request Free Evaluation and Proof of Concept (PoC)
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.form}>
        <FreePoCForm elementId="free-poc-form" />
      </div>
    </>
  );
};

export default PromotionalBanner;
