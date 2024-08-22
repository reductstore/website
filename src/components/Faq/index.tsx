import React, { useState, useEffect } from "react";
import FaqItem from "./FaqItem";
import styles from "./styles.module.css";

interface FaqItemType {
  question: string;
  answer: string | JSX.Element;
}

interface FaqProps {
  faqs: FaqItemType[];
  defaultOpenCount?: number;
}

const Faq: React.FC<FaqProps> = ({ faqs, defaultOpenCount = 0 }) => {
  const openCount =
    faqs.length < defaultOpenCount ? faqs.length : defaultOpenCount;
  const [openIndexes, setOpenIndexes] = useState<number[]>(
    Array.from({ length: openCount }, (_, index) => index),
  );

  useEffect(() => {
    setOpenIndexes(Array.from({ length: openCount }, (_, index) => index));
  }, [openCount]);

  const toggleItem = (index: number) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((item) => item !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  return (
    <div className={styles.faq}>
      {faqs.map((faq, index) => (
        <FaqItem
          key={index}
          question={faq.question}
          answer={faq.answer}
          isOpen={openIndexes.includes(index)}
          toggle={() => toggleItem(index)}
        />
      ))}
    </div>
  );
};

export default Faq;
