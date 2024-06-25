import React from 'react';
import styles from './styles.module.css';
import { FaCheckCircle } from 'react-icons/fa';

const PromotionalBanner = () => {
  const checkedIcon = <FaCheckCircle color="green" size="1em" />;

  return (
    <div className="alert alert--warning margin-bottom--lg">
      <div className="container">
        <div >
          <h3>Limited Offer for Early Adopters: Get 80% Off + Free PoC!</h3>
          <p>
            We are opening up just a few more seats for the <b>next 5 early adopters</b> who need our solution with the code <code>EARLYADOPTER80</code>.
          </p>
          <p>
            Secure your spot today, and when you're ready to start, you'll get:
          </p>
          <ul className={styles.benefitsList}>
            <li>{checkedIcon} Free Proof of Concept (PoC)</li>
            <li>{checkedIcon} Priority customer support</li>
            <li>{checkedIcon} Assistance with data migration</li>
            <li>{checkedIcon} 30-day money-back guarantee</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PromotionalBanner;
