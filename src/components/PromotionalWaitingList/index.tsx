import WaitingListForm from "../WaitingListForm";
import styles from "./styles.module.css";

interface PromotionalWaitingListProps {
  title: string;
  subtitle: string;
}

const PromotionalWaitingList = ({
  title,
  subtitle,
}: PromotionalWaitingListProps) => {
  return (
    <>
      <div className={`alert alert--warning margin-top--lg ${styles.alert}`}>
        <div className={`container ${styles.container}`}>
          <div>
            <h3>{title}</h3>
            <p>{subtitle}</p>
            <div className={styles.WaitingListForm}>
              <WaitingListForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PromotionalWaitingList;
