import React, { JSX, useState } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import { PerformanceComparisonData } from "./PerformanceComparisonData";
import Link from "@docusaurus/Link";
import PerformanceComparisonTable from "./PerformanceComparisonTable";

export default function PerformanceComparison(): JSX.Element {
  const [activeTab, setActiveTab] = useState("TimescaleDB");
  const tabNameMap = {
    TimescaleDB: "TimescaleDB",
    MongoDB: "MongoDB",
    MinIO: "MinIO",
  };
  return (
    <>
      <ul className={clsx("tabs", styles.tabs)}>
        {["TimescaleDB", "MongoDB", "MinIO"].map((tab) => (
          <li
            key={tab}
            className={clsx(
              "tabs__item",
              activeTab === tab && "tabs__item--active",
            )}
            onClick={() => setActiveTab(tab)}
          >
            vs {tabNameMap[tab]}
          </li>
        ))}
      </ul>
      <div className={styles.tabContent}>
        <>
          {activeTab && PerformanceComparisonData[activeTab] && (
            <PerformanceComparisonTable
              data={PerformanceComparisonData[activeTab]}
            />
          )}
          <p>
            <Link to={PerformanceComparisonData[activeTab].url}>
              See the full {PerformanceComparisonData[activeTab].title}{" "}
              benchmark.
            </Link>
          </p>
        </>
      </div>
    </>
  );
}
