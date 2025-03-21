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
  require("@site/static/img/whitepaper/whitepaper.png").default;
const subBulletIcon = faArrowRight;

export default function ReductAI(): JSX.Element {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <Layout
      title="Efficient Storage & Streaming for Robotics and Industrial IoT"
      description="Learn how ReductStore manages petabytes of multimodal data across edge and cloud with 10x speed, 90% cost savings, and zero data loss."
    >
      <main>
        <SimpleHeader pageTitle="Efficient Storage & Streaming for Robotics and Industrial IoT" />
        <div className={clsx("container", styles.whitePaperContainer)}>
          <div className="row">
            {/* Description Column */}
            <div className="col col--6">
              <p className={styles.bulletTitle}>What you'll learn:</p>
              <ul className={styles.bulletPoints}>
                <BulletPointItem>
                  Challenges in handling petabytes of robotics and IIoT data
                </BulletPointItem>
                <BulletPointItem>
                  Why traditional databases fail for time-indexed blob data with
                  metadata labels
                </BulletPointItem>
                <BulletPointItem>
                  How ReductStore compares to InfluxDB, TimescaleDB, MongoDB,
                  and MinIO
                </BulletPointItem>
                <BulletPointItem>
                  Key features for edge-first, cloud-smart storage:
                </BulletPointItem>
                <ul className={styles.subBulletPoints}>
                  <BulletPointItem icon={subBulletIcon} size="xs">
                    Real-time FIFO quota system to prevent disk overflow
                  </BulletPointItem>
                  <BulletPointItem icon={subBulletIcon} size="xs">
                    Metadata labeling and filtering for selective cloud sync
                  </BulletPointItem>
                  <BulletPointItem icon={subBulletIcon} size="xs">
                    Optimized for poor connectivity and high-latency
                    environments
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
                    Save $273,000 per year vs. TimescaleDB
                  </BulletPointItem>
                </ul>
              </ul>
              <div className={styles.readNowBtn}>
                <button
                  onClick={() => setModalOpen(true)}
                  className="button button--lg button--primary"
                >
                  Download White Paper (PDF)
                </button>
              </div>
            </div>

            {/* Image Column */}
            <div className="col col--6">
              <div className={styles.imageWrapper}>
                <img
                  src={WhitePaperImg}
                  alt="White Paper Cover"
                  className={styles.image}
                />
              </div>
            </div>
          </div>

          {/* Download Modal */}
          <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
            <div className={styles.formWrapper}>
              <h2 className={styles.formTitle}>Download White Paper (PDF)</h2>
              <WhitePaperForm />
            </div>
          </Modal>
        </div>
      </main>
    </Layout>
  );
}
