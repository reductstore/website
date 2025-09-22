import React, { useState } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import PricingPlan from "./PricingPlan";
import { FaCheckCircle } from "react-icons/fa";
import Link from "@docusaurus/Link";

const checkedIcon = <FaCheckCircle color="green" size="1.2em" />;

export default function PricingTable() {
  return (
    <section>
      <div className={clsx("row", styles.pricingTable)}>
        <PricingPlan
          title="Community"
          subtitle=""
          description="For research, testing, and development. Commercial use in production limited to companies with capital less than 2 million USD."
          categories={[
            { title: "Core Functionality", description: checkedIcon },
            {
              title: "Support",
              description: (
                <>
                  <Link href="https://community.reduct.store/signup/">
                    <b>Community Forum</b>
                  </Link>{" "}
                  or{" "}
                  <Link href="https://github.com/reductstore/reductstore">
                    <b>GitHub</b>
                  </Link>
                </>
              ),
              descriptionDetail: "Only latest stable version",
            },
            { title: "Long Term Release Support", description: "-" },
            { title: "Support for CSV & JSON", description: "-" },
            { title: "Support for Robotics Data", description: "-" },
            { title: "Extensible Query Engine", description: checkedIcon },
            { title: "Architecture Review", description: "-" },
            { title: "Proof of Concept (PoC)", description: "-" },
            { title: "Fully Managed", description: "-" },
            { title: "No-Code Provisioning", description: "-" },
          ]}
          buttonUrl="/docs/getting-started"
          buttonLabel="Start for Free"
        />

        <PricingPlan
          title="On-Premise"
          subtitle=""
          description="Commercial support, POC, and long-term release support for on-premise deployment."
          categories={[
            { title: "Core Functionality", description: checkedIcon },
            { title: "Support", description: "Commercial support" },
            {
              title: "Long Term Release Support",
              description: "Up to 3 years",
              descriptionDetail:
                "No vendor lock-in, legacy versions are free and open source",
            },
            {
              title: "Support for CSV & JSON",
              description: (
                <>
                  via{" "}
                  <Link href="/docs/extensions/official/select-ext">
                    <b>ReductSelect</b>
                  </Link>
                </>
              ),
            },
            {
              title: "Support for Robotics Data",
              description: (
                <>
                  via{" "}
                  <Link href="/docs/extensions/official/ros-ext">
                    <b>ReductROS</b>
                  </Link>
                </>
              ),
            },
            { title: "Extensible Query Engine", description: checkedIcon },
            { title: "Architecture Review", description: checkedIcon },
            {
              title: "Proof of Concept (PoC)",
              description: checkedIcon,
            },
            { title: "Fully Managed", description: "-" },
            { title: "No-Code Provisioning", description: "-" },
          ]}
          buttonUrl="/contact?subject=DemoLicense"
          buttonLabel="Get Demo License"
        />

        <PricingPlan
          title="Cloud"
          subtitle=""
          description="Fully managed cloud service. Join our waiting list."
          categories={[
            { title: "Core Functionality", description: checkedIcon },
            {
              title: "Support",
              description: "Commercial support",
            },
            {
              title: "Long Term Release Support",
              description: "Always up-to-date",
            },
            {
              title: "Support for CSV & JSON",
              description: (
                <>
                  via{" "}
                  <Link href="/docs/extensions/official/select-ext">
                    <b>ReductSelect</b>
                  </Link>
                </>
              ),
            },
            {
              title: "Support for Robotics Data",
              description: (
                <>
                  via{" "}
                  <Link href="/docs/extensions/official/ros-ext">
                    <b>ReductROS</b>
                  </Link>
                </>
              ),
            },
            { title: "Extensible Query Engine", description: checkedIcon },
            { title: "Architecture Review", description: checkedIcon },
            { title: "Proof of Concept (PoC)", description: checkedIcon },
            { title: "Fully Managed", description: checkedIcon },
            { title: "No-Code Provisioning", description: checkedIcon },
          ]}
          buttonUrl="/solutions/cloud#cloud-signup"
          buttonLabel="Get Demo Server"
          isHighlight
        />
      </div>
    </section>
  );
}
