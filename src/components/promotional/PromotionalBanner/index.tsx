import React, { useState } from "react";
import styles from "./styles.module.css";
import { FaCheckCircle } from "react-icons/fa";
import { PopupModal } from "react-calendly";
import Link from "@docusaurus/Link";

const PromotionalBanner = () => {
  const [isOpen, setIsOpen] = useState(false);
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
            <Link
              id="schedule-quick-review"
              className="button button--lg button--primary"
              onClick={() => setIsOpen(true)}
            >
              Schedule Quick Review
            </Link>
          </div>
        </div>
      </div>

      {/* Calendly Popup Modal */}
      <PopupModal
        url="https://calendly.com/anthony-reductstore/call"
        open={isOpen}
        onModalClose={() => setIsOpen(false)}
        rootElement={document.getElementById("__docusaurus")}
      />
    </>
  );
};

export default PromotionalBanner;
