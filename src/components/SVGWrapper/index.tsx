import React, { ReactElement, SVGProps, cloneElement } from 'react';
import styles from './styles.module.css';

interface SVGWrapperProps {
  label: string;
  children: ReactElement<SVGProps<SVGSVGElement>>;
  height?: string;
  width?: string;
}

const SVGWrapper: React.FC<SVGWrapperProps> = ({ label, children, height, width }) => (
  <div role="img" aria-label={label} className={styles.svgWrapper} >
    {cloneElement(children, { 'aria-hidden': true, height: height || '100%', width: width || '100%' })}
  </div>
);

export default SVGWrapper;