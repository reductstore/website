import React, { JSX } from "react";
import Layout from "@theme/Layout";
import clsx from "clsx";
import SimpleHeader from "@site/src/components/shared/SimpleHeader";
import BulletPointItem from "@site/src/components/shared/BulletPointItem";
import CraChecklistForm from "@site/src/components/forms/CraChecklistForm";
import styles from "./styles.module.css";

export default function CraChecklistPage(): JSX.Element {
  return (
    <Layout
      title="CRA Checklist"
      description="Download the CRA compliance checklist for robotics fleets and prepare your data infrastructure for upcoming EU CRA milestones."
    >
      <main>
        <SimpleHeader pageTitle="CRA Checklist for Robotics Fleets" />
        <div className={clsx("container", styles.checklistContainer)}>
          <div className="row">
            <div className="col col--5">
              <p className={styles.bulletTitle}>What you get:</p>
              <ul className={styles.bulletPoints}>
                <BulletPointItem>
                  Immediate actions before the September 2026 reporting deadline
                </BulletPointItem>
                <BulletPointItem>
                  Mapping of storage requirements to CRA Annex I expectations
                </BulletPointItem>
                <BulletPointItem>
                  Step-by-step migration guidance for ROS and multimodal
                  robotics data pipelines
                </BulletPointItem>
                <BulletPointItem>
                  A practical risk-assessment template for robotics data
                  integrity
                </BulletPointItem>
                <BulletPointItem>
                  Recommended audit logging and replication controls for edge
                  fleets
                </BulletPointItem>
              </ul>

              <p className={styles.bulletTitle}>Who should use it:</p>
              <ul className={styles.bulletPoints}>
                <BulletPointItem>
                  Robotics CTOs and platform leads
                </BulletPointItem>
                <BulletPointItem>
                  Product security and compliance teams preparing for CRA
                </BulletPointItem>
                <BulletPointItem>
                  Operators running AMRs, cobots, drones, and autonomous systems
                </BulletPointItem>
              </ul>
            </div>

            <div className="col col--7">
              <div className={styles.formColumn}>
                <CraChecklistForm />
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
