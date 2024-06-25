import React from 'react';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

interface FreePoCBannerProps {
  text: string;
  to: string;
}

const HomepageBanner = ({ to, text }: FreePoCBannerProps) => {
  return (
    <div className={styles.banner}>
      <span className={styles.bannerText}>
        <Link to={to}>{text}</Link>
      </span>
    </div>
  );
};

export default HomepageBanner;
