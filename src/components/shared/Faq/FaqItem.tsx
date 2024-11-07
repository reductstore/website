import React from "react";
import styles from "./styles.module.css";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

const FaqItem = ({ question, answer, isOpen, toggle }) => {
  const chevronSize = "0.8em";
  return (
    <div className={styles.faqItem}>
      <div className={styles.faqQuestion} onClick={toggle}>
        <div className={styles.faqIcon}>
          {isOpen ? (
            <FaChevronDown size={chevronSize} />
          ) : (
            <FaChevronRight size={chevronSize} />
          )}
        </div>
        {question}
      </div>
      {isOpen && <div className={styles.faqAnswer}>{answer}</div>}
    </div>
  );
};

export default FaqItem;
