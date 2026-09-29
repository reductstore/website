import React, { JSX } from "react";
import SimpleHeader from "@site/src/components/shared/SimpleHeader";
import Layout from "@theme/Layout";
import WhitePaperForm from "@site/src/components/forms/WhitePaperForm";
import styles from "./styles.module.css";
import clsx from "clsx";
import BulletPointItem from "@site/src/components/shared/BulletPointItem";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const subBulletIcon = faArrowRight;
const cover = require("@site/static/img/whitepaper/whitepaper.png").default;
const pageThree = require("@site/static/img/whitepaper/page-3.webp").default;
const pageEleven = require("@site/static/img/whitepaper/page-11.webp").default;
const insidePages = [
  {
    src: pageThree,
    caption: "Benchmarks vs. MinIO and TimescaleDB",
  },
  {
    src: require("@site/static/img/whitepaper/page-7.webp").default,
    caption: "The reduction strategy",
  },
  { src: pageEleven, caption: "Industrial IoT dashboards" },
];
const highlights = [
  { value: "16x", label: "faster reads vs. MinIO (100 KB records)" },
  { value: "10x", label: "faster writes vs. TimescaleDB (100 KB records)" },
  { value: "$4,200", label: "saved per month on a 50 TB S3 workload" },
];

export default function ReductAI(): JSX.Element {
  return (
    <Layout
      title="White Paper"
      description="ReductStore white paper: architecture, benchmarks, and use cases for robotics and industrial IoT."
    >
      <main>
        <SimpleHeader pageTitle="White Paper" />
        <div className={clsx("container", styles.whitePaperContainer)}>
          <div className="row">
            <div className="col col--7">
              <p className={styles.lead}>
                A data backbone for robotics and industrial IoT. Capture
                everything raw at the edge, reduce it on the way to the next
                tier, and extract it to any format or query it with SQL.
              </p>
              <a
                className={clsx(
                  "button button--primary button--lg",
                  styles.jumpToForm,
                )}
                href="#whitepaper-form"
              >
                Get the PDF
              </a>
              <div className={styles.overview}>
                <figure className={styles.preview}>
                  <div className={styles.stack}>
                    <img
                      className={clsx(styles.page, styles.pageBack)}
                      src={pageEleven}
                      alt=""
                      loading="lazy"
                    />
                    <img
                      className={clsx(styles.page, styles.pageMiddle)}
                      src={pageThree}
                      alt=""
                      loading="lazy"
                    />
                    <img
                      className={clsx(styles.page, styles.pageFront)}
                      src={cover}
                      alt="Cover of the ReductStore white paper: A data backbone for robotics and industrial IoT"
                    />
                  </div>
                  <figcaption className={styles.meta}>
                    <span>PDF</span>
                    <span>13 pages</span>
                    <span>2026 edition</span>
                  </figcaption>
                </figure>
                <div>
                  <h2 className={styles.sectionTitle}>What's inside</h2>
                  <ul className={styles.bulletPoints}>
                    <BulletPointItem>
                      Why time-series databases and object storage fall short
                      for robotics & industrial use cases
                    </BulletPointItem>
                    <BulletPointItem>
                      Three use cases end to end: robotics with ROS, industrial
                      IoT over MQTT, and drones
                    </BulletPointItem>
                    <BulletPointItem>
                      Benchmarks and comparisons vs. MinIO, TimescaleDB,
                      MongoDB, InfluxDB, and IoTDB
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
                </div>
              </div>

              <h2 className={styles.sectionTitle}>Performance highlights</h2>
              <ul className={styles.highlights}>
                {highlights.map((item) => (
                  <li key={item.value}>
                    <span className={styles.highlightValue}>{item.value}</span>
                    <span className={styles.highlightLabel}>{item.label}</span>
                  </li>
                ))}
              </ul>

              <h2 className={styles.sectionTitle}>Look inside</h2>
              <ul className={styles.inside}>
                {insidePages.map((page) => (
                  <li key={page.caption}>
                    <img
                      src={page.src}
                      alt={`White paper page: ${page.caption}`}
                      loading="lazy"
                    />
                    <span>{page.caption}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col col--5">
              <div className={styles.formColumn}>
                <WhitePaperForm />
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
