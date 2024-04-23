import React, { useEffect, useState } from "react";
import Link from "@docusaurus/Link";
import Cookies from 'js-cookie';
import styles from './styles.module.css';

const whitePaperImage = require("@site/static/img/whitepaper/whitepaper.webp").default;

const SlidingBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (Cookies.get('cc_reductstore') != null &&
      Cookies.get('reductstore_bannerDismissed') !== 'true') {
      const timeout = setTimeout(() => {
        if (window.innerWidth > 768) {
          setVisible(true);
        }
      }, 10_000);
      return () => clearTimeout(timeout);
    }
  }, []);

  const handleClose = () => {
    setVisible(false);
    Cookies.set('reductstore_bannerDismissed', 'true', { expires: 7 });
  };

  if (!visible) return null;

  return (
    <div className={styles.banner}>
      <div className={styles.bannerContent}>
        <img src={whitePaperImage} alt="White Paper" className={styles.image} />
        <div className={styles.textBlock}>
          <div className={styles.title}>Free White Paper</div>
          <div className={styles.subtitle}>Get Your White Paper: AI on the Edge!</div>
          <Link to="/whitepaper" className="button button--primary button--lg">
            Download Now →
          </Link>
        </div>
      </div>
      <button className={styles.closeButton} onClick={handleClose}>×</button>
    </div>
  );
};

export default SlidingBanner;
