import React, { useState } from "react";
import SimpleHeader from "@site/src/components/shared/SimpleHeader";
import Layout from "@theme/Layout";
import WhitePaperForm from "@site/src/components/forms/WhitePaperForm";
import styles from "./styles.module.css";
import clsx from "clsx";
import BulletPointItem from "@site/src/components/shared/BulletPointItem";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Modal from "@site/src/components/shared/Modal";

const WhitePaperImg =
  require("@site/static/img/whitepaper/whitepaper.webp").default;
const subBulletIcon = faArrowRight;

export default function ReductAI(): JSX.Element {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <Layout
      title="Efficient Time-Series Storage for AI & Edge Computing"
      description="Learn how ReductStore outperforms traditional databases for AI and edge workloads."
    >
      <main>
        <SimpleHeader pageTitle="Efficient Time-Series Storage for AI & Edge Computing" />
        <div className={clsx("container", styles.whitePaperContainer)}>
          <div className="row">
            {/* Description Column*/}
            <div className="col col--6">
              <p className={styles.bulletTitle}>What you'll learn:</p>
              <ul className={styles.bulletPoints}>
                <BulletPointItem>
                  Challenges in managing massive IoT and Industry 4.0 data
                </BulletPointItem>
                <BulletPointItem>
                  Why traditional databases fail for unstructured time-series
                  data
                </BulletPointItem>
                <BulletPointItem>
                  How ReductStore compares to InfluxDB, TimescaleDB, MongoDB,
                  and MinIO
                </BulletPointItem>
                <BulletPointItem>
                  Key features for edge computing:
                </BulletPointItem>
                <ul className={styles.subBulletPoints}>
                  <BulletPointItem icon={subBulletIcon} size="xs">
                    Real-time FIFO quota system
                  </BulletPointItem>
                  <BulletPointItem icon={subBulletIcon} size="xs">
                    Label-based metadata and filtering
                  </BulletPointItem>
                  <BulletPointItem icon={subBulletIcon} size="xs">
                    Optimized batching for high-latency environments
                  </BulletPointItem>
                </ul>
              </ul>
              <p className={styles.bulletTitle}>Key Insights:</p>
              <ul className={styles.bulletPoints}>
                <BulletPointItem>Performance benchmarks:</BulletPointItem>
                <ul className={styles.subBulletPoints}>
                  <BulletPointItem icon={subBulletIcon} size="xs">
                    1604% faster writes (1MB records) vs. TimescaleDB
                  </BulletPointItem>
                  <BulletPointItem icon={subBulletIcon} size="xs">
                    291% faster reads (1MB blobs) vs. MinIO
                  </BulletPointItem>
                </ul>
                <BulletPointItem>Cost savings:</BulletPointItem>
                <ul className={styles.subBulletPoints}>
                  <BulletPointItem icon={subBulletIcon} size="xs">
                    Save up to $273,000 per year
                  </BulletPointItem>
                </ul>
              </ul>
              <div className={styles.readNowBtn}>
                <button
                  onClick={() => setModalOpen(true)}
                  className="button button--lg button--primary"
                >
                  Read Now →
                </button>
              </div>
            </div>

            {/* Image column */}
            <div className="col col--6 hideOnMobile">
              <div className={styles.imageWrapper}>
                <img
                  src={WhitePaperImg}
                  alt="White Paper Cover"
                  className={styles.image}
                />
              </div>
            </div>
          </div>

          {/* Download Modal*/}
          <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
            <div className={styles.formWrapper}>
              <h2 className={styles.formTitle}>Read White Paper</h2>
              <WhitePaperForm />
            </div>
          </Modal>
        </div>
      </main>
    </Layout>
  );
}
