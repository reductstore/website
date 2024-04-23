import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.css';

interface UseCaseRowProps {
  title: string;
  description: string | JSX.Element;
  imageUrl: string;
  imageLeft: boolean;
}

const UseCaseRow: React.FC<UseCaseRowProps> = ({ title, description, imageUrl, imageLeft }) => {
  return (
    <div className={clsx('row', styles.useCaseRow, { [styles.useCaseRowLeft]: imageLeft })}>
      {imageLeft && (
        <div className={clsx("col col--6", styles.imageSection)}>
          <img src={imageUrl} alt={title} />
        </div>
      )}
      <div className={clsx("col col--6", styles.textSection)}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {!imageLeft && (
        <div className={clsx("col col--6", styles.imageSection)}>
          <img src={imageUrl} alt={title} />
        </div>
      )}
    </div>
  );
};

export default UseCaseRow;
