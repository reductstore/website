import React, { useState } from "react";
import styles from "./styles.module.css";
import { FaCheckCircle } from "react-icons/fa";
import { PopupModal } from "react-calendly";
import Link from "@docusaurus/Link";
import Modal from "../../shared/Modal";
import FreePoCForm from "../../forms/FreePoCForm";

const PromotionalBanner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const checkedIcon = <FaCheckCircle color="green" size="1em" />;

  return (
    <>
      <div className="alert alert--success margin-top--lg">
        <div className="container">
          <div>
            <h3>Start Free with ReductStore</h3>
            <p className={styles.noMarginBottom}>
              Get your own ReductStore environment - deploy privately for free
              and enjoy 10GB of free cloud storage. We'll set it up for you!
            </p>
            <ul className={styles.benefitsList}>
              <li>{checkedIcon} 10GB free cloud storage</li>
              <li>{checkedIcon} No credit card required</li>
              <li>{checkedIcon} Expert setup assistance</li>
            </ul>
            <Link
              className="button button--lg button--primary"
              onClick={() => setIsOpen(true)}
            >
              Claim Free Tier →
            </Link>
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className={styles.form}>
          <FreePoCForm elementId="free-poc-form" />
        </div>
      </Modal>
    </>
  );
};

export default PromotionalBanner;
