import React from "react";
import {
  FaProjectDiagram,
  FaHdd,
  FaChartLine,
} from "react-icons/fa";
import styles from "./styles.module.css";

function Benefits({ IconComponent, title, description }) {
  return (
    <div className="col col--4">
      <div className={styles.benefit}>
        <div className={styles.benefitIcon}>
          <IconComponent
            size="3em"
            style={{ color: "var(--ifm-color-primary)" }}
          />
        </div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageBenefits() {
  return (
    <section className={styles.benefits}>
      <div className="row">
        <Benefits
          IconComponent={FaProjectDiagram}
          title="Simplify Your Infrastructure"
          description="Merge blob and time series functionalities, reducing the need for multiple databases."
        />
        <Benefits
          IconComponent={FaHdd}
          title="Stay In Control Of Your Data"
          description="Customize real-time data retention policies and replication strategies."
        />
        <Benefits
          IconComponent={FaChartLine}
          title="Handle Large Data Volumes"
          description="Store billions of time-stamped blobs with AI labels and access them with low latency."
        />
      </div>
    </section>
  );
}

