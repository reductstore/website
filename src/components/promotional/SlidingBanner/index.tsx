import React, { useEffect, useState } from "react";
import Link from "@docusaurus/Link";
import Cookies from "js-cookie";
import styles from "./styles.module.css";
import useBannertStore from "@site/src/store/useBannertStore";

const whitePaperImage =
  require("@site/static/img/whitepaper/whitepaper.webp").default;

const SlidingBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { wasBannerShown, setBannerShown } = useBannertStore();

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    const isDismissed = Cookies.get("reductstore_bannerDismissed") === "true";
    if (!wasBannerShown && !isMobile && !isDismissed) {
      const timeout = setTimeout(() => {
        setVisible(true);
        setBannerShown(true);
      }, 13_000);
      return () => clearTimeout(timeout);
    }
  }, [wasBannerShown, setBannerShown, setVisible]);

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
