import styles from "./styles.module.css";
import Heading from "@theme/Heading";
import { FaCheck } from "react-icons/fa"; // Importing icon
import Link from "@docusaurus/Link";

interface SimpleHeaderWithButtonProps {
  title: string;
  subtitle: string;
  benefits: string[];
  imageSrc: string;
  imageAlt?: string;
  scrollToId: string;
  headerTag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

function SimpleHeaderWithButton({
  title,
  subtitle,
  benefits,
  imageSrc,
  imageAlt = "",
  scrollToId,
  headerTag = "h1",
}: SimpleHeaderWithButtonProps) {
  const scrollToForm = () => {
    const formElement = document.getElementById(scrollToId);
    if (formElement) {
      const yOffset = -100;
      const y =
        formElement.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <header className={styles.Banner}>
      <div className={`container ${styles.BannerContent}`}>
        <div className={styles.BannerLeft}>
          <Heading as={headerTag} className={styles.BannerTitle}>
            {title}
          </Heading>
          <p className={styles.BannerSubtitle}>{subtitle}</p>
          <div className={styles.Button}>
            <Link
              className="button button--primary button--lg"
              to="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToForm();
              }}
            >
              Start for Free →
            </Link>
          </div>
          <ul className={styles.BenefitsList}>
            {benefits.map((benefit, index) => (
              <li key={index} className={styles.BenefitItem}>
                <FaCheck className={styles.BenefitIcon} />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.BannerRight}>
          <img src={imageSrc} alt={imageAlt} className={styles.BannerImage} />
        </div>
      </div>
    </header>
  );
}

export default SimpleHeaderWithButton;
