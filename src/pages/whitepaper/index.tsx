import React, { JSX } from "react";
import SimpleHeader from "@site/src/components/shared/SimpleHeader";
import Layout from "@theme/Layout";
import WhitePaperForm from "@site/src/components/forms/WhitePaperForm";
import styles from "./styles.module.css";
import clsx from "clsx";
import BulletPointItem from "@site/src/components/shared/BulletPointItem";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const subBulletIcon = faArrowRight;

export default function WhitePaper(): JSX.Element {
  return (
    <Layout
      title="White Paper"
      description="ReductStore white paper: architecture, integration paths, benchmarks, and end to end use cases for robotics, industrial IoT, and drones."
    >
      <main>
        <SimpleHeader pageTitle="ReductStore White Paper" />
        <div className={clsx("container", styles.whitePaperContainer)}>
          <div className="row">
            {/* Description Column */}
            <div className="col col--5">
              <p className={styles.bulletTitle}>What's inside:</p>
              <ul className={styles.bulletPoints}>
                <BulletPointItem>
                  Why raw sensor data outgrows the infrastructure that collects
                  it, and what teams build to cope
                </BulletPointItem>
                <BulletPointItem>
                  Why time series databases and object stores each fall short
                  for robotics and industrial workloads
                </BulletPointItem>
                <BulletPointItem>
                  The mental model: buckets, entries, records, and one
                  conditional query language for reads and replication
                </BulletPointItem>
                <BulletPointItem>
                  The reduction strategy: keep everything raw at the edge, then
                  filter on every transfer to the next tier
                </BulletPointItem>
                <BulletPointItem>
                  Three use cases end to end: robotics, industrial IoT, and
                  drones
                </BulletPointItem>
                <BulletPointItem>
                  Benchmarks against MinIO, TimescaleDB, MongoDB, InfluxDB, and
                  IoTDB
                </BulletPointItem>
                <BulletPointItem>
                  Key features:
                  <ul className={styles.subBulletPoints}>
                    <BulletPointItem icon={subBulletIcon} size="xs">
                      FIFO quota by volume, so the disk never overflows on edge
                    </BulletPointItem>
                    <BulletPointItem icon={subBulletIcon} size="xs">
                      Labels and conditional queries for selective replication
                    </BulletPointItem>
                    <BulletPointItem icon={subBulletIcon} size="xs">
                      SQL over stored records with ReductSelect and DataFusion
                    </BulletPointItem>
                    <BulletPointItem icon={subBulletIcon} size="xs">
                      ROS support: store ROS messages, export mcap or rosbag on
                      demand
                    </BulletPointItem>
                    <BulletPointItem icon={subBulletIcon} size="xs">
                      Ingest without code: MQTT, ROS, HTTP, and Zenoh
                    </BulletPointItem>
                    <BulletPointItem icon={subBulletIcon} size="xs">
                      S3 and Azure Blob backends for the cloud tier
                    </BulletPointItem>
                    <BulletPointItem icon={subBulletIcon} size="xs">
                      Replication that resumes after an outage, without
                      duplicates
                    </BulletPointItem>
                  </ul>
                </BulletPointItem>
              </ul>

              <p className={styles.bulletTitle}>Performance highlights:</p>
              <ul className={styles.bulletPoints}>
                <BulletPointItem>
                  Reads 1552% faster than MinIO, writes 1288% faster
                </BulletPointItem>
                <BulletPointItem>
                  Writes 924% faster than TimescaleDB, reads 603% faster
                </BulletPointItem>
                <BulletPointItem>
                  Around $4,200 a month saved on a 50 TB S3 workload
                </BulletPointItem>
              </ul>
              <p className={styles.benchmarkNote}>
                Measured at 100 KB records, Python SDK, single client, NVMe
                drive. Full results per database and per record size are in the
                paper.
              </p>
            </div>

            {/* Form Column */}
            <div className="col col--7">
              <div className={styles.formColumn}>
                <WhitePaperForm />
              </div>
            </div>

            {/* End of Row */}
          </div>
        </div>
      </main>
    </Layout>
  );
}
