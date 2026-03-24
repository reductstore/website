import Link from "@docusaurus/Link";
import { LuCloud } from "react-icons/lu";
import styles from "./styles.module.css";

const PlaygroundOffer = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>Try it free</div>
      <Link to="/solutions/cloud" className={styles.container}>
        <LuCloud size={28} className={styles.icon} />
        <div className={styles.content}>
          <div className={styles.title}>Playground Server</div>
          <div className={styles.subtitle}>
            10GB cloud storage for evaluation
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PlaygroundOffer;
