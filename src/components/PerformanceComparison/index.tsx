import React, { useState } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import { PerformanceComparisonData } from "./PerformanceComparisonData";
import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';
import Link from "@docusaurus/Link";
import PerformanceComparisonTable from "../PerformanceComparisonTable";

export default function PerformanceComparison(): JSX.Element {
  const [activeTab, setActiveTab] = useState("TimescaleDB");
  const tabNameMap = {
    TimescaleDB: "TimescaleDB",
    MongoDB: "MongoDB",
    MinIO: "MinIO",
  };
  return (
    <div className="row">
      <div className="col col--4 col--offset-2">
        <div className={styles.benefit}>
          <ThemedImage
            className={styles.benefitIcon}
            alt="Get the Best Performance"
            sources={{
              light: useBaseUrl("/img/benefits/get_the_best_performance.png"),
              dark: useBaseUrl("/img/benefits/get_the_best_performance.png"),
            }}
          />
          <h3>Get the Best Performance</h3>
          <p>Outperform other databases with a customized solution for time-series object data.</p>
        </div>
      </div>
      <div className="col col--4">
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
              vs {tabNameMap[tab]}
            </li>
          ))}
        </ul>
        <div className={styles.tabContent}>
          <>
            {activeTab && (
              <PerformanceComparisonTable data={PerformanceComparisonData[activeTab]} />
            )}
            <p>
              <Link to={PerformanceComparisonData[activeTab].url}>See the full {PerformanceComparisonData[activeTab].title} benchmark.</Link>
            </p>
          </>
        </div>
      </div>
    </div>
  );
}
