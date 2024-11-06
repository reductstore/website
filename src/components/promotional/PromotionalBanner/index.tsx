import React, { useState } from "react";
import styles from "./styles.module.css";
import { FaCheckCircle } from "react-icons/fa";
import Modal from "../../shared/Modal";
import FreePoCForm from "../../forms/FreePoCForm";
import Link from "@docusaurus/Link";

const PromotionalBanner = () => {
  const checkedIcon = <FaCheckCircle color="green" size="1em" />;
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="alert alert--warning margin-top--lg">
        <div className="container">
          <div>
            <h3>Free Evaluation and Proof of Concept (PoC)</h3>
            <p className={styles.noMarginBottom}>
              Secure your spot today, and our team will contact you to
              understand your requirements and provide you with a customized
              evaluation tailored to your project.
            </p>
            <ul className={styles.benefitsList}>
              <li>
                {checkedIcon} Consultation call to understand your requirements
              </li>
              <li>{checkedIcon} Custom evaluation tailored to your project</li>
              <li>
                {checkedIcon} Active support during the PoC phase and beyond
              </li>
            </ul>
            <Link
              onClick={() => setOpenModal(true)}
              className="button button--lg button--primary"
            >
              Request a Free PoC
            </Link>
          </div>
        </div>
      </div>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <FreePoCForm elementId="free-poc-form" />
      </Modal>
    </>
  );
};

export default PromotionalBanner;
