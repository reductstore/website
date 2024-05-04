import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface UseCaseRowProps {
  title: string;
  illustration: string;
  isImageLeft: boolean;
  description: string | JSX.Element;
}

const UseCaseRow: React.FC<UseCaseRowProps> = ({ title, description, illustration, isImageLeft }) => {

  return (
    <div className={clsx('row', styles.useCaseRow, { [styles.useCaseRowLeft]: isImageLeft })}>
      {isImageLeft && (
        <div className={clsx("col col--6", styles.imageSection)}>
          <img src={illustration} alt={title} />
        </div>
      )}
      <div className={clsx("col col--6", styles.textSection)}>
        <h2>{title}</h2>
        {description}
      </div>
      {!isImageLeft && (
        <div className={clsx("col col--6", styles.imageSection)}>
          <img src={illustration} alt={title} />
        </div>
      )}
    </div>
  );
};

export default UseCaseRow;
