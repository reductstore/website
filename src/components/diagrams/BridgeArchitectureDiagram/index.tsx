import React from "react";
import styles from "./styles.module.css";
import Diagram from "@site/blog/2025-10-22-database-for-robotics/img/reduct-bridge-architecture.drawio.svg";

export default function BridgeArchitectureDiagram() {
  return (
    <Diagram
      className={styles.diagram}
      role="img"
      aria-label="Reduct Bridge architecture"
      style={{
        maxWidth: "440px",
        width: "100%",
        height: "auto",
        display: "block",
        margin: "0 auto",
      }}
    />
  );
}
