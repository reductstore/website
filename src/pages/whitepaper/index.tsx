import React, { JSX } from "react";
import SimpleHeader from "@site/src/components/shared/SimpleHeader";
import Layout from "@theme/Layout";
import WhitePaperForm from "@site/src/components/forms/WhitePaperForm";
import styles from "./styles.module.css";
import clsx from "clsx";
import BulletPointItem from "@site/src/components/shared/BulletPointItem";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const subBulletIcon = faArrowRight;

export default function ReductAI(): JSX.Element {
  return (
    <Layout
      title="White Paper"
      description="ReductStore white paper: architecture, benchmarks, and use cases for robotics and industrial IoT."
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
                  Why time-series databases and object storage fall short for
                  robotics & industrial use cases
                </BulletPointItem>
                <BulletPointItem>
                  Three use cases end to end: robotics with ROS, industrial IoT
                  over MQTT, and drones
                </BulletPointItem>
                <BulletPointItem>
                  Benchmarks and comparisons vs. MinIO, TimescaleDB, MongoDB,
                  InfluxDB, and IoTDB
                </BulletPointItem>
                <BulletPointItem>Key features:</BulletPointItem>
                <ul className={styles.subBulletPoints}>
                  <BulletPointItem icon={subBulletIcon} size="xs">
                    FIFO quota to prevent disk overflow on edge
                  </BulletPointItem>
                  <BulletPointItem icon={subBulletIcon} size="xs">
                    Metadata labels for selective replication
                  </BulletPointItem>
                  <BulletPointItem icon={subBulletIcon} size="xs">
                    SQL over stored records with ReductSelect and DataFusion
                  </BulletPointItem>
                  <BulletPointItem icon={subBulletIcon} size="xs">
                    S3 and Azure Blob backends for cloud deployments
                  </BulletPointItem>
                </ul>
              </ul>
              <p className={styles.bulletTitle}>Performance highlights:</p>
              <ul className={styles.bulletPoints}>
                <BulletPointItem>
                  16x faster reads vs. MinIO (100 KB records)
                </BulletPointItem>
                <BulletPointItem>
                  10x faster writes vs. TimescaleDB (100 KB records)
                </BulletPointItem>
                <BulletPointItem>
                  Around $4,200 a month saved on a 50 TB S3 workload
                </BulletPointItem>
              </ul>
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
