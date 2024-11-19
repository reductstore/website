import React from "react";
import styles from "./styles.module.css";
import { FaCheckCircle } from "react-icons/fa";
import { PopupButton } from "react-calendly";

const PromotionalBanner = () => {
  const checkedIcon = <FaCheckCircle color="green" size="1em" />;

  return (
    <>
      <div className="alert alert--warning margin-top--lg">
        <div className="container">
          <div>
            <h3>Get Your Quick Storage Workflow Review</h3>
            <p className={styles.noMarginBottom}>
              Whether you're just starting to explore ReductStore, testing it
              for a project, or are new to working with databases, we're here to
              support you through the process and help you get the best results.
            </p>
            <ul className={styles.benefitsList}>
              <li>{checkedIcon} 20 Minutes to Save Hours on Your Setup</li>
              <li>{checkedIcon} Quick Setup Tips for Your Use Case</li>
              <li>{checkedIcon} No Strings Attached—Just Results</li>
            </ul>
            <PopupButton
              url="https://calendly.com/anthony-reductstore/call"
              rootElement={document.getElementById("__docusaurus")}
              text="Schedule Quick Review"
              className="button button--lg button--primary"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PromotionalBanner;
