import React, { useState } from 'react';
import FaqItem from './FaqItem';
import styles from "./styles.module.css";

const Faq = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div className={styles.faq}>
      {faqs.map((faq, index) => (
        <FaqItem
          key={index}
          question={faq.question}
          answer={faq.answer}
          isOpen={openIndex === index}
          toggle={() => toggleItem(index)}
        />
      ))}
    </div>
  );
};

export default Faq;