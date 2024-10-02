import React, { useState } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import PricingPlan from "./PricingPlan";
import { FaCheckCircle } from "react-icons/fa";
import Modal from "../Modal";
import FreePoCForm from "../FreePoCForm";
import PriceListForm from "../PriceListForm";

const checkedIcon = <FaCheckCircle color="green" size="1.2em" />;

export default function PricingTable() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <section>
      <div className={clsx("row", styles.pricingTable)}>
        {/* Community Plan */}
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
                  Support from our{" "}
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
          ]}
          buttonUrl="/docs/getting-started"
          buttonLabel="Start for Free"
          isHighlight
        />

        {/* On-premise Plan */}
        <PricingPlan
          title="On-Premise"
          subtitle=""
          description="Commercial support, POC, and long-term release support for on-premise deployment."
          categories={[
            { title: "Commercial Support", description: checkedIcon },
            {
              title: "Proof of Concept (POC)",
              description: "Tailored implementation for your use case",
              descriptionDetail: "Contact us for tailored POC implementation",
            },
            {
              title: "Long Term Release Support",
              description: "Up to 3 years",
            },
            { title: "Architecture Review", description: checkedIcon },
          ]}
          onClick={() => setOpenModal(true)}
          buttonLabel="Get Price List"
        />

        {/* Cloud Plan */}
        <PricingPlan
          title="Cloud"
          subtitle=""
          description="Fully managed cloud service. Join our waiting list."
          categories={[
            { title: "Fully Managed", description: checkedIcon },
            {
              title: "Support",
              description: "Up to 2 business days, Email or Chat",
            },
            { title: "Scalable", description: "Scale as you need" },
            { title: "Easy Setup", description: checkedIcon },
          ]}
          buttonUrl="/solutions/cloud"
          buttonLabel="Learn More"
        />
      </div>

      {/* Modal for On-premise Plan */}
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <div className={styles.form}>
          <PriceListForm elementId="price-list-form" />
        </div>
      </Modal>
    </section>
  );
}
