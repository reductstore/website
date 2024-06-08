import React, { useEffect, useState } from "react";
import Link from "@docusaurus/Link";
import Cookies from 'js-cookie';
import styles from './styles.module.css';
import useCookieConsentStore from "@site/src/store/useCookieConsentStore";
import { useLocation } from '@docusaurus/router';
const whitePaperImage = require("@site/static/img/whitepaper/whitepaper.webp").default;

const SlidingBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { isModalOpen, wasBannerShown, setBannerShown } = useCookieConsentStore();
  const pagePath = useLocation().pathname;
  const isCorrectPath = !pagePath.endsWith('/blog');

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    const isDismissed = Cookies.get('reductstore_bannerDismissed') === 'true';
    if (
      isCorrectPath &&
      !isModalOpen &&
      !wasBannerShown &&
      !isMobile &&
      !isDismissed
    ) {
      const timeout = setTimeout(() => {
        setVisible(true);
        setBannerShown(true);
      }, 13_000);
      return () => clearTimeout(timeout);
    }
  }, [isModalOpen, wasBannerShown, setBannerShown, setVisible, isCorrectPath]);

  const handleClose = () => {
    setVisible(false);
    Cookies.set('reductstore_bannerDismissed', 'true', { expires: 7 });
  };

  const handleDownloadClick = () => {
    Cookies.set('reductstore_bannerDismissed', 'true', { expires: 30 });
  };

  if (!visible) return null;

  return (
    <div className={styles.banner}>
      <div className={styles.bannerContent}>
        <img src={whitePaperImage} alt="White Paper" className={styles.image} />
        <div className={styles.textBlock}>
          <div className={styles.title}>Free White Paper</div>
          <div className={styles.subtitle}>Get Your White Paper: AI on the Edge!</div>
          <Link id="whitepaper-banner-button" to="/whitepaper" className="button button--primary button--lg" onClick={handleDownloadClick}>
            Download Now →
          </Link>
        </div>
      </div>
      <button className={styles.closeButton} onClick={handleClose}>×</button>
    </div>
  );
};

export default SlidingBanner;
