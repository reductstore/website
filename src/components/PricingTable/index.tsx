import React, { useState } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import PricingPlan from "./PricingPlan";
import { FaCheckCircle } from "react-icons/fa";
import Modal from "../Modal";
import PriceListForm from "../PriceListForm";

const checkedIcon = <FaCheckCircle color="green" size="1.2em" />;

export default function PricingTable() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <section>
      <div className={clsx("row", styles.pricingTable)}>
        <PricingPlan
          title="Community"
          subtitle=""
          description="For research, testing, and development. Commercial use in production limited to companies with capital less than 2 million USD."
          categories={[
            { title: "Full Functionality", description: checkedIcon },
            {
              title: "Support",
              description: (
                <>
                  <a href="https://community.reduct.store/">
                    <b>Community Forum</b>
                  </a>{" "}
                  or{" "}
                  <a href="https://github.com/reductstore/reductstore">
                    <b>GitHub</b>
                  </a>
                </>
              ),
              descriptionDetail: "Only latest stable version",
            },
            { title: "Long Term Release Support", description: "-" },
            { title: "Architecture Review", description: "-" },
            { title: "Proof of Concept (PoC)", description: "-" },
            { title: "Fully Managed", description: "-" },
            { title: "Autoscaling", description: "-" },
            { title: "No-Code Provisioning", description: "-" },
          ]}
          buttonUrl="/docs/getting-started"
          buttonLabel="Start for Free"
          isHighlight
        />

        <PricingPlan
          title="On-Premise"
          subtitle=""
          description="Commercial support, POC, and long-term release support for on-premise deployment."
          categories={[
            { title: "Full Functionality", description: checkedIcon },
            { title: "Support", description: "Commercial support" },
            {
              title: "Long Term Release Support",
              description: "Up to 3 years",
              descriptionDetail:
                "No vendor lock-in, legacy versions are free and open source",
            },
            { title: "Architecture Review", description: checkedIcon },
            {
              title: "Proof of Concept (PoC)",
              description: checkedIcon,
            },
            { title: "Fully Managed", description: "-" },
            { title: "Autoscaling", description: "-" },
            { title: "No-Code Provisioning", description: "-" },
          ]}
          onClick={() => setOpenModal(true)}
          buttonLabel="Get Price List"
        />

        <PricingPlan
          title="Cloud"
          subtitle=""
          description="Fully managed cloud service. Join our waiting list."
          categories={[
            { title: "Full Functionality", description: checkedIcon },
            {
              title: "Support",
              description: "Commercial support",
            },
            {
              title: "Long Term Release Support",
              description: "Always up-to-date",
            },
            { title: "Architecture Review", description: checkedIcon },
            { title: "Proof of Concept (PoC)", description: checkedIcon },
            { title: "Fully Managed", description: checkedIcon },
            { title: "Autoscaling", description: checkedIcon },
            { title: "No-Code Provisioning", description: checkedIcon },
          ]}
          buttonUrl="/solutions/cloud"
          buttonLabel="Learn More"
        />
      </div>

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <div className={styles.form}>
          <PriceListForm elementId="price-list-form" />
        </div>
      </Modal>
    </section>
  );
}
