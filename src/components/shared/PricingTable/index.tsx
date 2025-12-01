import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import PricingPlan from "./PricingPlan";
import Link from "@docusaurus/Link";

export default function PricingTable() {
  const createFeatures = (plan: "community" | "onpremise" | "cloud") => {
    return [
      // Core Capabilities
      { title: "Core Capabilities", available: true, isCategoryHeader: true },
      {
        title: "High-Performance Time Series DB",
        available: true,
        titleDetail: "Built for robotics and IIoT workloads",
      },
      {
        title: "SDKs: Python, JavaScript, Go, Rust, C++",
        available: true,
        titleDetail:
          "Official client libraries with batching and streaming support over HTTP(s)",
      },
      {
        title: "Multi-Format Data Support",
        available: true,
        titleDetail: "Store any data format: blobs, images, 3D, sensor data",
      },
      {
        title: "CLI Tool",
        available: true,
        titleDetail: "Command-line interface for database management",
      },
      {
        title: "Web Console",
        available: true,
        titleDetail: "Browser-based administration interface",
      },

      // Data & Storage Support
      {
        title: "Data & Storage Support",
        available: true,
        isCategoryHeader: true,
      },
      {
        title: "Extensible Query Engine",
        available: true,
        titleDetail: "Advanced querying capabilities for unstructured data",
      },
      {
        title:
          plan === "community" ? (
            "CSV & JSON Extensions"
          ) : (
            <Link href="/docs/extensions/official/select-ext">
              <b>CSV & JSON Extensions</b>
            </Link>
          ),
        available: plan !== "community",
        titleDetail: "Official extensions for structured data formats",
      },
      {
        title:
          plan === "community" ? (
            "Robotics Data Support"
          ) : (
            <Link href="/docs/extensions/official/ros-ext">
              <b>Robotics Data Support</b>
            </Link>
          ),
        available: plan !== "community",
        titleDetail: "Official extension for MCAP (ROS2) data",
      },
      {
        title: "S3-Compatible Backend",
        available: plan !== "community",
        titleDetail: "Store data in S3, MinIO, or any S3-compatible storage",
      },

      // Deployment & Operations
      {
        title: "Deployment & Operations",
        available: true,
        isCategoryHeader: true,
      },
      {
        title: "Docker & Kubernetes Ready",
        available: true,
        titleDetail: "Easy containerized deployment options",
      },
      {
        title: "Grafana Integration",
        available: true,
        titleDetail: "Data source plugin for visualization",
      },
      {
        title: "Fully Managed Service",
        available: plan === "cloud",
        titleDetail: "Zero-maintenance cloud hosting",
      },
      {
        title: "No-Code Provisioning",
        available: plan === "cloud",
        titleDetail: "Deploy instances without infrastructure knowledge",
      },

      // Support & Maintenance
      {
        title: "Support & Maintenance",
        available: true,
        isCategoryHeader: true,
      },
      {
        title:
          plan === "community" ? "Community Support" : "Commercial Support",
        available: true,
        titleDetail:
          plan === "community"
            ? "Community forums and GitHub issues"
            : "Professional technical support with SLA",
      },
      {
        title: "Long Term Support (LTS)",
        available: plan !== "community",
        titleDetail:
          plan === "onpremise"
            ? "Up to 3 years. No vendor lock-in, legacy versions remain open source"
            : "Always up-to-date with latest features",
      },
      {
        title: "Architecture Review",
        available: plan !== "community",
        titleDetail: "Expert consultation on system design and optimization",
      },
      {
        title: "Deployment Assistance",
        available: plan !== "community",
        titleDetail: "Professional help with initial setup and configuration",
      },
    ];
  };

  return (
    <section>
      <div className={clsx("row", styles.pricingTable)}>
        <PricingPlan
          title="Community"
          subtitle="BUSL-1.1"
          description="Perfect for research, testing, and development. Commercial use in production is limited to companies with less than $2M USD in capital."
          categories={createFeatures("community")}
          buttonUrl="/docs/getting-started"
          buttonLabel="Start for Free"
          termsUrl="/terms"
        />

        <PricingPlan
          title="Self-Hosted"
          subtitle="On-Premise"
          description="Commercial support, proof-of-concept assistance, and long-term release support for on-premise deployments."
          categories={createFeatures("onpremise")}
          buttonUrl="/contact?subject=DemoLicense"
          buttonLabel="Get Demo License"
          termsUrl="/terms"
        />

        <PricingPlan
          title="Cloud"
          subtitle="Fully Managed"
          description="Zero-maintenance cloud service with enterprise features."
          categories={createFeatures("cloud")}
          buttonUrl="/solutions/cloud#cloud-signup"
          buttonLabel="Get Demo Server"
          isHighlight
          termsUrl="/terms"
        />
      </div>
    </section>
  );
}
