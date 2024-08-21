import React, { useState } from "react";
import SimpleHeader from "@site/src/components/SimpleHeader";
import Layout from "@theme/Layout";
import WhitePaperForm from "@site/src/components/WhitePaperForm";

import styles from './styles.module.css';
import clsx from "clsx";
import BulletPointItem from "@site/src/components/BulletPointItem";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Modal from "@site/src/components/Modal";

const WhitePaperImg = require("@site/static/img/whitepaper/whitepaper.webp").default;
const subBulletIcon = faArrowRight;

export default function ReductAI(): JSX.Element {
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  return (
    <Layout
      title="An Efficient Time-Series Database for IoT and Edge Computing in AI infrastructure"
      description="ReductStore is time-series object store that is optimized for AI workloads and designed to run on edge devices. This white paper provides an overview of a traditional system and how ReductStore is challenging the status quo."
    >
      <main>
        <SimpleHeader pageTitle="An Efficient Time-Series Database for IoT and Edge Computing in AI infrastructure" />
        <div className={clsx("container", styles.whitePaperContainer)}>

          {/* Download Block */}
          <div className={styles.downloadBlock}>
            <p>
              Explore ReductStore: A new solution for managing unstructured time series data.
            </p>
            <button onClick={openModal} className={"button button--lg button--primary"}>
              Download White Paper
            </button>
          </div>

          <div className="row">

            {/* Description Column*/}
            <div className="col col--6">
              <p className={styles.bulletTitle}>What you'll learn:</p>
              <ul className={styles.bulletPoints}>
                <BulletPointItem>Current challenges in managing massive IoT and Industry 4.0 data volumes</BulletPointItem>
                <BulletPointItem>Limitations of traditional databases for unstructured time series data</BulletPointItem>
                <BulletPointItem>Detailed comparison of ReductStore to InfluxDB, OpenTSDB, TimescaleDB, MongoDB, MinIO, and OpenIO</BulletPointItem>
                <BulletPointItem>ReductStore's unique features for edge computing</BulletPointItem>
                <ul className={styles.subBulletPoints}>
                  <BulletPointItem icon={subBulletIcon} size={"xs"}>Real-time FIFO quota system</BulletPointItem>
                  <BulletPointItem icon={subBulletIcon} size={"xs"}>Label-based metadata and filtering</BulletPointItem>
                  <BulletPointItem icon={subBulletIcon} size={"xs"}>Efficient batching for high latency environments</BulletPointItem>
                </ul>
              </ul>
              <p className={styles.bulletTitle}>Key Insights:</p>
              <ul className={styles.bulletPoints}>
                <BulletPointItem>Performance benchmarks that demonstrate the benefits of ReductStore:</BulletPointItem>
                <ul className={styles.subBulletPoints}>
                  <BulletPointItem icon={subBulletIcon} size={"xs"}>Up to 1300% faster write speeds for 10MB records compared to TimescaleDB</BulletPointItem>
                  <BulletPointItem icon={subBulletIcon} size={"xs"}>244% faster read speeds on 10KB blobs compared to MongoDB</BulletPointItem>
                </ul>
                <BulletPointItem>Analysis of potential cost savings:</BulletPointItem>
                <ul className={styles.subBulletPoints}>
                  <BulletPointItem icon={subBulletIcon} size={"xs"}>Example showing potential savings of $522,000 per year for a large operation</BulletPointItem>
                </ul>
              </ul>
              <p className={styles.bulletTitle}>Ideal for:</p>
              <ul className={styles.bulletPoints}>
                <BulletPointItem>Edge computing and IoT developers</BulletPointItem>
                <BulletPointItem>AI infrastructure managers</BulletPointItem>
                <BulletPointItem>Data engineers working with unstructured time series data</BulletPointItem>
              </ul>
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
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <div className={styles.formWrapper}>
              <h2 className={styles.formTitle}>Download White Paper</h2>
              <WhitePaperForm />
            </div>
          </Modal>
        </div>
      </main>
    </Layout>
  );
}
