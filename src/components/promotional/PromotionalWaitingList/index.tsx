import WaitingListForm from "../../forms/WaitingListForm";
import styles from "./styles.module.css";

interface PromotionalWaitingListProps {
  title: string;
  subtitle: string;
  formId: string;
}

const PromotionalWaitingList = ({
  title,
  subtitle,
  formId,
}: PromotionalWaitingListProps) => {
  return (
    <>
      <div className={`alert alert--warning margin-top--lg ${styles.alert}`}>
        <div className={`container ${styles.container}`}>
          <div>
            <h3>{title}</h3>
            <p>{subtitle}</p>
            <div className={styles.WaitingListForm}>
              <WaitingListForm elementId={formId} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PromotionalWaitingList;
