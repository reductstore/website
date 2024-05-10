import React, { useState } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import { PerformanceComparisonData } from "./PerformanceComparisonData";
import {
  FaRocket,
} from "react-icons/fa";

export default function PerformanceComparison(): JSX.Element {
  const [activeTab, setActiveTab] = useState("TimescaleDB");

  return (
    <section className={styles.section}>
      <div className="col col--4 col--offset-4">
        <div className={styles.benefit}>
          <div className={styles.benefitIcon}>
            <FaRocket
              size="5em"
              style={{ color: "var(--ifm-color-primary)" }}
            />
          </div>
          <h3>Get the Best Performance</h3>
          <p>Outperform any other solution with a tailored solution for edge computing.</p>
        </div>
      </div>
      <ul className={clsx("tabs", styles.tabs)}>
        {["TimescaleDB", "MongoDB", "MinIO"].map((tab) => (
          <li
            key={tab}
            className={clsx(
              "tabs__item",
              activeTab === tab && "tabs__item--active"
            )}
            onClick={() => setActiveTab(tab)}
          >
            vs {tab}
          </li>
        ))}
      </ul>
      <div className={styles.tabContent}>
        {activeTab && (
          <PerformanceComparisonTable data={PerformanceComparisonData[activeTab]} />
        )}
      </div>
    </section>
  );
}

interface PerformanceComparisonTableProps {
  data: {
    chunkSize: string;
    operation: string;
    timescaleDB: number;
    reductStore: number;
    reductStorePercent: string;
  }[];
}

const PerformanceComparisonTable: React.FC<PerformanceComparisonTableProps> = ({
  data,
}) => (
  <table>
    <thead>
      <tr>
        <th>Chunk Size</th>
        <th>Operation</th>
        <th>TimescaleDB, blob/s</th>
        <th>ReductStore, blob/s</th>
        <th>ReductStore, %</th>
      </tr>
    </thead>
    <tbody>
      {data.map((row, index) => (
        <tr key={index}>
          <td>{row.chunkSize}</td>
          <td>{row.operation}</td>
          <td>{row.timescaleDB}</td>
          <td>{row.reductStore}</td>
          <td>{row.reductStorePercent}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
