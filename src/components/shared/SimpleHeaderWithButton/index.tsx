import styles from "./styles.module.css";
import Heading from "@theme/Heading";
import { FaCheck } from "react-icons/fa"; // Importing icon
import Link from "@docusaurus/Link";

interface SimpleHeaderWithButtonProps {
  title: string;
  subtitle: string;
  benefits: string[];
  imageSvg: React.ReactNode;
  headerTag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

function SimpleHeaderWithButton({
  title,
  subtitle,
  benefits,
  imageSvg,
  headerTag = "h1",
}: SimpleHeaderWithButtonProps) {
  return (
    <header className={styles.Banner}>
      <div className={`container ${styles.BannerContent}`}>
        <div className={styles.BannerLeft}>
          <Heading as={headerTag} className={styles.BannerTitle}>
            {title}
          </Heading>
          <p className={styles.BannerSubtitle}>{subtitle}</p>
          <Link
            className="button button--primary button--lg"
            to="https://cloud.reduct.store"
          >
            Start for Free
          </Link>
          <p>No credit card required.</p>

          <ul className={styles.BenefitsList}>
            {benefits.map((benefit, index) => (
              <li key={index} className={styles.BenefitItem}>
                <FaCheck className={styles.BenefitIcon} />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.BannerRight}>{imageSvg}</div>
      </div>
    </header>
  );
}

export default SimpleHeaderWithButton;
