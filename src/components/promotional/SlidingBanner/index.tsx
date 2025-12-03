import React, { useEffect, useState } from "react";
import Link from "@docusaurus/Link";
import Cookies from "js-cookie";
import styles from "./styles.module.css";
import useBannertStore from "@site/src/store/useBannertStore";

const whitePaperImage =
  require("@site/static/img/whitepaper/whitepaper.png").default;

const MIN_MOBILE_WIDTH = 1300;

const SlidingBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { wasBannerShown, setBannerShown } = useBannertStore();

  useEffect(() => {
    const checkMobileAndShowBanner = () => {
      const isMobile = window.innerWidth <= MIN_MOBILE_WIDTH;
      const isDismissed = Cookies.get("reductstore_bannerDismissed") === "true";

      // Hide banner if mobile
      if (isMobile && visible) {
        setVisible(false);
        return;
      }

      // Show banner if conditions are met
      if (!wasBannerShown && !isMobile && !isDismissed) {
        const timeout = setTimeout(() => {
          setVisible(true);
          setBannerShown(true);
        }, 13_000);
        return () => clearTimeout(timeout);
      }
    };

    // Check on mount
    checkMobileAndShowBanner();

    // Add resize listener
    const handleResize = () => {
      const isMobile = window.innerWidth <= MIN_MOBILE_WIDTH;
      if (isMobile && visible) {
        setVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [wasBannerShown, setBannerShown, visible]);

  const handleClose = () => {
    setVisible(false);
    Cookies.set("reductstore_bannerDismissed", "true", { expires: 7 });
  };

  const handleDownloadClick = () => {
    Cookies.set("reductstore_bannerDismissed", "true", { expires: 30 });
  };

  if (!visible) return null;

  return (
    <div className={styles.banner}>
      <div className={styles.bannerContent}>
        <img src={whitePaperImage} alt="White Paper" className={styles.image} />
        <div className={styles.textBlock}>
          <div className={styles.title}>White Paper</div>
          <div className={styles.subtitle}>Faster Storage, Lower Costs</div>
          <Link
            id="whitepaper-banner-button"
            to="/whitepaper"
            className="button button--primary button--lg"
            onClick={handleDownloadClick}
          >
            Read Now →
          </Link>
        </div>
      </div>
      <button className={styles.closeButton} onClick={handleClose}>
        x
      </button>
    </div>
  );
};

export default SlidingBanner;
