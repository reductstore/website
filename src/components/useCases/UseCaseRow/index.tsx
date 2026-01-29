import React, { JSX } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

interface UseCaseRowProps {
  title: string;
  illustration?: string | JSX.Element;
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
  const renderMediaContent = () => {
    if (children) {
      return <div className={styles.customContent}>{children}</div>;
    }

    if (!illustration) {
      return null;
    }

    if (typeof illustration === "string") {
      return <img src={illustration} alt={title} />;
    }

    return illustration;
  };

  const mediaContent = renderMediaContent();
  const shouldRenderMedia = Boolean(mediaContent);

  return (
    <div
      className={clsx("row", styles.useCaseRow, {
        [styles.useCaseRowLeft]: isImageLeft,
      })}
    >
      {isImageLeft && shouldRenderMedia && (
        <div className={clsx("col col--6", styles.imageSection)}>
          {mediaContent}
        </div>
      )}
      <div className={clsx("col col--6", styles.textSection)}>
        <h2>{title}</h2>
        {description}
      </div>
      {!isImageLeft && shouldRenderMedia && (
        <div className={clsx("col col--6", styles.imageSection)}>
          {mediaContent}
        </div>
      )}
    </div>
  );
};

export default UseCaseRow;
