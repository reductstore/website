import clsx from 'clsx';
import React, { ReactElement, SVGProps } from 'react';
import styles from './styles.module.css';
import SVGWrapper from '../SVGWrapper';

interface UseCaseRowProps {
  title: string;
  illustration: ReactElement<SVGProps<SVGSVGElement>>;
  isImageLeft: boolean;
  description: string | JSX.Element;
}

const UseCaseRow: React.FC<UseCaseRowProps> = ({ title, description, illustration, isImageLeft }) => {

  return (
    <div className={clsx('row', styles.useCaseRow, { [styles.useCaseRowLeft]: isImageLeft })}>
      {isImageLeft && (
        <div className={clsx("col col--6", styles.imageSection)}>
          <SVGWrapper label={title} height='294px'>
            {illustration}
          </SVGWrapper>
        </div>
      )}
      <div className={clsx("col col--6", styles.textSection)}>
        <h2>{title}</h2>
        {description}
      </div>
      {!isImageLeft && (
        <div className={clsx("col col--6", styles.imageSection)}>
          <SVGWrapper label={title} height='294px'>
            {illustration}
          </SVGWrapper>
        </div>
      )}
    </div>
  );
};

export default UseCaseRow;
