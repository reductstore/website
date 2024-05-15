import React from 'react';
import styles from './styles.module.css';
import { IPerformanceComparisonData } from '../PerformanceComparison/PerformanceComparisonData';

interface PerformanceComparisonTableProps {
  data: IPerformanceComparisonData;
}

const PerformanceComparisonTable: React.FC<PerformanceComparisonTableProps> = ({ data }) => (
  <div className={styles.tableResponsive}>
    <table className={styles.compactTable}>
      <thead>
        <tr>
          <th>Record Size</th>
          <th>Read Speed (%)</th>
          <th>Write Speed (%)</th>
        </tr>
      </thead>
      <tbody>
        {data.table.map((row, index) => (
          <tr key={index}>
            <td>{row.recordSize}</td>
            <td>{row.readSpeed}</td>
            <td>{row.writeSpeed}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default PerformanceComparisonTable;
