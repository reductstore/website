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
            <h3>80% Promotion for a Limited Time!</h3>
            <p>Only for the next 5 clients.</p>
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
