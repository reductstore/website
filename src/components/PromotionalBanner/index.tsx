import React from 'react';
import CountdownTimer from '../CountdownTimer';
import styles from './styles.module.css';

const PromotionalBanner = ({ targetDate, startDate }) => {
  return (
    <div className="alert alert--warning margin-bottom--lg">
      <div className="container">
        <div >
          <h3>Lifetime Deal: Save 80%!</h3>
          <p>
            We are opening up just a few more seats for the <b>next 5 early adopters</b> who need our solution with the code <code>EARLYADOPTER80</code>.
          </p>
          <p>
            <strong>Limited-Time Offer</strong>
          </p>
          <div className={styles.countdownContainer}>
            <CountdownTimer targetDate={targetDate} startDate={startDate} size={45} />
          </div>
        </div>
      </div>

    </div>
  );
};

export default PromotionalBanner;
