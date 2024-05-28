import React, { useEffect, useState } from 'react';
import CountdownTimer from '../CountdownTimer';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

interface FreePoCBannerProps {
  targetDate: Date;
  startDate: Date;
  elementId: string;
}
const FreePoCBanner = ({ targetDate, startDate, elementId }: FreePoCBannerProps) => {
  const [isFormPresent, setIsFormPresent] = useState(false);

  useEffect(() => {
    const formElement = document.getElementById(elementId);
    setIsFormPresent(!!formElement);
  }, [elementId]);

  const handleClick = () => {
    const formElement = document.getElementById(elementId);
    if (formElement) {
      const yOffset = -100;
      const y = formElement.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  if (!isFormPresent) {
    return null;
  }

  return (
    <div className={styles.banner} >
      <span className={styles.bannerText}>
        <Link onClick={handleClick}>Get a Free PoC Integration for your Project</Link>
        <CountdownTimer targetDate={targetDate} startDate={startDate} size={50} />
      </span>
    </div>

  );
};

export default FreePoCBanner;
