import React, { JSX } from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import CodeBlock from "@theme/CodeBlock";
import SimpleHeader from "@site/src/components/shared/SimpleHeader";
import { LuBot, LuDownload, LuFactory, LuPlane } from "react-icons/lu";
import BulletPointItem from "@site/src/components/shared/BulletPointItem";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { track } from "@site/src/lib/analytics";
import styles from "./styles.module.css";

const PDF = "/pdf/whitepaper/ReductStore_WhitePaper.pdf";

const cover = require("@site/static/img/whitepaper/whitepaper.png").default;
const pageThree = require("@site/static/img/whitepaper/page-3.webp").default;
const pageEleven = require("@site/static/img/whitepaper/page-11.webp").default;

const insidePages = [
  { src: pageThree, caption: "Benchmarks vs. MinIO and TimescaleDB", page: 3 },
  {
    src: require("@site/static/img/whitepaper/page-7.webp").default,
    caption: "The reduction strategy",
    page: 7,
  },
  { src: pageEleven, caption: "Industrial IoT dashboards", page: 11 },
];

const coveredUseCases = [
  { icon: LuBot, title: "Robotics", data: "cameras, LiDAR, ROS topics" },
  {
    icon: LuFactory,
    title: "Industrial IoT",
    data: "PLCs over MQTT, vibration",
  },
  { icon: LuPlane, title: "Drones", data: "offline missions, sync later" },
];

const onDownload = (how: "download" | "read") => () =>
  track("whitepaper_download", { how });

export default function WhitePaper(): JSX.Element {
  return (
    <Layout
      title="White Paper"
      description="Read the ReductStore white paper: a data backbone for robotics and industrial IoT, with the architecture, benchmarks, and robotics, IIoT, and drone use cases."
    >
      <main>
        <SimpleHeader pageTitle="White Paper" />
        <div className={clsx("container", styles.whitePaperContainer)}>
          <p className={styles.lead}>
            A data backbone for robotics and industrial IoT. Capture everything
            raw at the edge, reduce it on the way to the next tier, and extract
            it to any format or query it with SQL.
          </p>
          <section className={styles.overview}>
            <a
              className={styles.preview}
              href={PDF}
              target="_blank"
              rel="noopener"
              onClick={onDownload("read")}
              aria-label="Open the white paper"
            >
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
            </a>
            <div>
              <h2 className={styles.sectionTitle}>What's inside</h2>
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
                  <BulletPointItem icon={faArrowRight} size="xs">
                    FIFO quota to prevent disk overflow on edge
                  </BulletPointItem>
                  <BulletPointItem icon={faArrowRight} size="xs">
                    Metadata labels for selective replication
                  </BulletPointItem>
                  <BulletPointItem icon={faArrowRight} size="xs">
                    SQL over stored records with ReductSelect and DataFusion
                  </BulletPointItem>
                  <BulletPointItem icon={faArrowRight} size="xs">
                    S3 and Azure Blob backends for cloud deployments
                  </BulletPointItem>
                </ul>
              </ul>
              <div className={styles.actions}>
                <a
                  className="button button--primary button--lg"
                  href={PDF}
                  download
                  onClick={onDownload("download")}
                >
                  <LuDownload aria-hidden="true" className={styles.icon} />
                  Download PDF
                </a>
                <a
                  className="button button--secondary button--lg"
                  href={PDF}
                  target="_blank"
                  rel="noopener"
                  onClick={onDownload("read")}
                >
                  Read in browser
                </a>
              </div>
              <p className={styles.meta}>
                PDF · 13 pages · 1 MB · 2026 edition · no sign-up
              </p>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Use cases covered</h2>
            <ul className={styles.highlights}>
              {coveredUseCases.map(({ icon: Icon, title, data }) => (
                <li key={title}>
                  <span className={styles.useCaseIcon}>
                    <Icon />
                  </span>
                  <span className={styles.useCaseTitle}>{title}</span>
                  <span className={styles.highlightLabel}>{data}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Look inside</h2>
            <ul className={styles.inside}>
              {insidePages.map((page) => (
                <li key={page.caption}>
                  <a
                    href={`${PDF}#page=${page.page}`}
                    target="_blank"
                    rel="noopener"
                    onClick={onDownload("read")}
                  >
                    <img
                      src={page.src}
                      alt={`White paper page ${page.page}: ${page.caption}`}
                      loading="lazy"
                    />
                    <span>{page.caption}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className={clsx(styles.section, styles.tryIt)}>
            <div>
              <h2 className={styles.sectionTitle}>Try it in a minute</h2>
              <p>
                Run ReductStore locally with Docker, then follow{" "}
                <Link to="/docs/getting-started">Getting Started</Link> to write
                and query your first records. Or query live robot, factory, and
                image data on the <Link to="/datasets">Playground</Link> without
                installing anything.
              </p>
            </div>
            <CodeBlock language="bash">
              {
                'docker run -p 8383:8383 -e RS_API_TOKEN="my-token" reduct/store:latest'
              }
            </CodeBlock>
          </section>

          <p className={styles.contact}>
            Questions about your architecture?{" "}
            <Link to="/architecture-review">Book an architecture review</Link>{" "}
            or <Link to="/contact">contact us</Link>.
          </p>
        </div>
      </main>
    </Layout>
  );
}
