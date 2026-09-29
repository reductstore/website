import React, { JSX } from "react";
import Link from "@docusaurus/Link";
import {
  LuFactory,
  LuRoute,
  LuBot,
  LuBrainCircuit,
  LuPlane,
  LuCloud,
} from "react-icons/lu";
import styles from "./styles.module.css";

const segments = [
  {
    icon: <LuFactory />,
    title: "Industrial edge",
    data: "PLCs, vibration, DAQ",
    link: "/blog/daq-manufacture-system",
  },
  {
    icon: <LuRoute />,
    title: "Mobile robots",
    data: "LiDAR scans, cameras",
    link: "/blog/amr-fleet-data-infrastructure",
  },
  {
    icon: <LuBot />,
    title: "ROS robots",
    data: "ROS 1, ROS 2, MCAP",
    link: "/docs/ros",
  },
  {
    icon: <LuBrainCircuit />,
    title: "Physical AI",
    data: "episodes for training",
    link: "/blog/database-for-robotics",
  },
  {
    icon: <LuPlane />,
    title: "Drones and defense",
    data: "air-gapped, sync later",
    link: "/blog/air-gapped-drone-data",
  },
  {
    icon: <LuCloud />,
    title: "Cloud backbone",
    data: "replication, S3, SQL",
    link: "/solutions/cloud",
  },
];

export default function HomepageSegments(): JSX.Element {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>
        One data backbone, from every machine to the cloud
      </h2>
      <p className={styles.subtitle}>
        Run ReductStore on the device, keep recording when the link drops, and
        replicate what matters to the cloud.
      </p>
      <div className={styles.grid}>
        {segments.map((segment) => (
          <Link key={segment.title} to={segment.link} className={styles.tile}>
            <span className={styles.icon}>{segment.icon}</span>
            <span className={styles.tileTitle}>{segment.title}</span>
            <span className={styles.data}>{segment.data}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
