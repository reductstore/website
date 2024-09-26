import React, { useState } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import PricingPlan from "./PricingPlan";
import { FaCheckCircle } from "react-icons/fa";
import Modal from "../Modal";
import FreePoCForm from "../FreePoCForm";

const checkedIcon = <FaCheckCircle color="green" size="1.2em" />;

export default function PricingTable() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <section>
      <div className={clsx("row", styles.pricingTable)}>
        <PricingPlan
          title="Community"
          subtitle="For startups and small capital"
          description="For research, testing, development. Commercial use in production limited to companies with capital less than 2 million USD."
          categories={[
            { title: "Full Functionality", description: checkedIcon },
            {
              title: "Support",
              description: "Community on GitHub or Chat",
              descriptionDetail: "Only latest stable version",
            },
            { title: "Long Term Release Support", description: "-" },
            { title: "Architecture Review", description: "-" },
          ]}
          buttonUrl="/docs/getting-started"
          buttonLabel="Start for Free"
          isHighlight
        />
        <PricingPlan
          title="Standard"
          subtitle="For small scale enterprises"
          description="For commercial production use in non-critical applications."
          categories={[
            { title: "Full Functionality", description: checkedIcon },
            {
              title: "Support",
              description: "Up to 2 business days, Email or Chat",
            },
            { title: "Long Term Release Support", description: "1 year" },
            { title: "Architecture Review", description: "-" },
          ]}
          onClick={() => setOpenModal(true)}
          buttonLabel="Request a PoC"
        />
        <PricingPlan
          title="Premium"
          subtitle="For critical applications"
          description="For commercial production use in critical applications with minimum 5TB storage capacity."
          categories={[
            { title: "Full Functionality", description: checkedIcon },
            {
              title: "Support",
              description: "Up to 4 hours, Email, Chat, Video call",
            },
            { title: "Long Term Release Support", description: "3 years" },
            { title: "Architecture Review", description: checkedIcon },
          ]}
          onClick={() => setOpenModal(true)}
          buttonLabel="Request a PoC"
        />
        <PricingPlan
          title="IoT"
          subtitle="For many small nodes"
          description="For commercial production use with minimum 10 devices with less than 1TB of storage capacity per unit."
          categories={[
            { title: "Full Functionality", description: checkedIcon },
            {
              title: "Support",
              description: "Up to 2 business days, Email or Chat",
            },
            { title: "Long Term Release Support", description: "1 year" },
            { title: "Architecture Review", description: checkedIcon },
          ]}
          onClick={() => setOpenModal(true)}
          buttonLabel="Request a PoC"
        />
      </div>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <div className={styles.form}>
          <FreePoCForm elementId="free-poc-form" />
        </div>
      </Modal>
    </section>
  );
}
