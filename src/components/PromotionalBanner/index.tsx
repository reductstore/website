import React from 'react';
import CountdownTimer from '../CountdownTimer';
import styles from './styles.module.css';
import clsx from 'clsx';

const PromotionalBanner = ({ targetDate, startDate }) => {
  return (
    <div className="alert alert--warning margin-bottom--lg">
      <div className="container">
        <div className="row">
          <div className="col col--4">
            <h3>Lifetime Deal: Save 80%!</h3>
            <p>
              <strong>Exclusive Limited-Time Offer:</strong> We are opening up just a few more seats for the next 5 early adopters who need our solution with the code <code>EARLYADOPTER80</code>.
            </p>
          </div>
          <div className={clsx("col col--4", styles.countdownContainer)}>
            <CountdownTimer targetDate={targetDate} startDate={startDate} size={50} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionalBanner;
