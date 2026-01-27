import React, { JSX } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

interface UseCaseRowProps {
  title: string;
  illustration?: string;
  isImageLeft: boolean;
  description: string | JSX.Element;
  children?: React.ReactNode;
}

const UseCaseRow: React.FC<UseCaseRowProps> = ({
  title,
  description,
  illustration,
  isImageLeft,
  children,
}) => {
  const mediaContent = children ? (
    <div className={styles.customContent}>{children}</div>
  ) : (
    <img src={illustration} alt={title} />
  );

  return (
    <div
      className={clsx("row", styles.useCaseRow, {
        [styles.useCaseRowLeft]: isImageLeft,
      })}
    >
      {isImageLeft && (
        <div className={clsx("col col--6", styles.imageSection)}>
          {mediaContent}
        </div>
      )}
      <div className={clsx("col col--6", styles.textSection)}>
        <h2>{title}</h2>
        {description}
      </div>
      {!isImageLeft && (
        <div className={clsx("col col--6", styles.imageSection)}>
          {mediaContent}
        </div>
      )}
    </div>
  );
};

export default UseCaseRow;
