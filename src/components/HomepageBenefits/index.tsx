import React from "react";
import {
  FaLayerGroup,
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
          IconComponent={FaLayerGroup}
          title="Simplify Your Infrastructure"
          description="Merge blob and TSDB functionalities, reducing the need for multiple data solutions."
        />
        <Benefits
          IconComponent={FaHdd}
          title="Never Worry About Running Out of Space"
          description="Automatic data rotation manages space without manual intervention."
        />
        <Benefits
          IconComponent={FaChartLine}
          title="Optimize Time Series Data Management"
          description="Tailored storage for time-stamped data, improving performance."
        />
      </div>
    </section>
  );
}

