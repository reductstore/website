import React, { useState } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import PricingPlan from "./PricingPlan";
import Link from "@docusaurus/Link";

export default function PricingTable() {
  return (
    <section>
      <div className={clsx("row", styles.pricingTable)}>
        <PricingPlan
          title="Community"
          subtitle=""
          description="For research, testing, and development. Commercial use in production limited to companies with capital less than 2 million USD."
          categories={[
            { title: "Core Functionality", available: true },
            {
              title: (
                <>
                  <Link href="https://community.reduct.store/" target="_blank" rel="noopener noreferrer">
                    <b>Community</b>
                  </Link>
                  {" or "}
                  <Link href="https://github.com/reductstore/reductstore" target="_blank" rel="noopener noreferrer">
                    <b>GitHub</b>
                  </Link>
                  {" "}
                  support
                </>
              ),
              available: true,
              titleDetail: "Only latest stable version",
            },
            { title: "Extensible Query Engine", available: true },
            { title: "Support for CSV & JSON", available: false },
            { title: "Support for Robotics Data", available: false },
            { title: "Long Term Release Support", available: false },
            { title: "S3 Backend", available: false },
            { title: "Architecture Review", available: false },
            { title: "Initial Deployment Support", available: false },
            { title: "Fully Managed", available: false },
            { title: "No-Code Provisioning", available: false },
          ]}
          buttonUrl="/docs/getting-started"
          buttonLabel="Start for Free"
        />

        <PricingPlan
          title="On-Premise"
          subtitle=""
          description="Commercial support, POC, and long-term release support for on-premise deployment."
          categories={[
            { title: "Core Functionality", available: true },
            { title: "Commercial support", available: true },
            { title: "Extensible Query Engine", available: true },
            {
              title: (
                <Link href="/docs/extensions/official/select-ext">
                  <b>Support for CSV & JSON</b>
                </Link>
              ),
              available: true,
            },
            {
              title: (
                <Link href="/docs/extensions/official/ros-ext">
                  <b>Support for Robotics Data</b>
                </Link>
              ),
              available: true,
            },
            {
              title: "Long Term Release Support",
              available: true,
              titleDetail:
                "Up to 3 years. No vendor lock-in, legacy versions are free and open source",
            },
            { title: "S3 Backend", available: true },
            { title: "Architecture Review", available: true },
            {
              title: "Initial Deployment Support",
              available: true,
            },
            { title: "Fully Managed", available: false },
            { title: "No-Code Provisioning", available: false },
          ]}
          buttonUrl="/contact?subject=DemoLicense"
          buttonLabel="Get Demo License"
        />

        <PricingPlan
          title="Cloud"
          subtitle=""
          description="Fully managed cloud service. Join our waiting list."
          categories={[
            { title: "Core Functionality", available: true },
            {
              title: "Commercial support",
              available: true,
            },
            { title: "Extensible Query Engine", available: true },
            {
              title: (
                <Link href="/docs/extensions/official/select-ext">
                  <b>Support for CSV & JSON</b>
                </Link>
              ),
              available: true,
            },
            {
              title: (
                <Link href="/docs/extensions/official/ros-ext">
                  <b>Support for Robotics Data</b>
                </Link>
              ),
              available: true,
            },
            {
              title: "Long Term Release Support",
              available: true,
              titleDetail: "Always up-to-date",
            },
            { title: "S3 Backend", available: true },
            { title: "Architecture Review", available: true },
            { title: "Initial Deployment Support", available: true },
            { title: "Fully Managed", available: true },
            { title: "No-Code Provisioning", available: true },
          ]}
          buttonUrl="/solutions/cloud#cloud-signup"
          buttonLabel="Get Demo Server"
          isHighlight
        />
      </div>
    </section>
  );
}
