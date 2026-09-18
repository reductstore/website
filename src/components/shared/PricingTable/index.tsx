import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import PricingPlan from "./PricingPlan";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

type ReductProCustomFields = {
  checkoutUrl?: string;
  portalUrl?: string;
};

export default function PricingTable() {
  const { siteConfig } = useDocusaurusContext();
  const { checkoutUrl, portalUrl } =
    siteConfig.customFields as ReductProCustomFields;
  const handleSubscribe: React.MouseEventHandler<HTMLAnchorElement> = async (
    event,
  ) => {
    event.preventDefault();

    if (!checkoutUrl) {
      return;
    }

    const response = await fetch(checkoutUrl);
    if (!response.ok) {
      return;
    }

    window.location.assign(await response.text());
  };
  const createFeatures = (plan: "community" | "onpremise") => {
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
            "SQL over CSV, JSON & Parquet"
          ) : (
            <Link href="/docs/extensions/official/select-ext">
              <b>SQL over CSV, JSON & Parquet</b>
            </Link>
          ),
        available: plan !== "community",
        titleDetail: "Official extension for querying structured data formats",
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
        title: "Cloud Object Storage Backend",
        available: plan !== "community",
        titleDetail:
          "Store data in AWS S3, Azure Blob Storage, MinIO, or any S3-compatible storage",
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
          "Up to 3 years. No vendor lock-in, legacy versions remain open source",
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
          title="Core"
          subtitle="Apache-2.0"
          description="Open-source ReductStore for self-managed edge and server deployments."
          categories={createFeatures("community")}
          buttonUrl="/docs/getting-started"
          buttonLabel="Start for Free"
          termsUrl="/terms"
        />

        <PricingPlan
          title="Pro"
          subtitle="Commercial Self-Hosted"
          description="Commercial components, support, proof-of-concept assistance, and long-term release support for self-hosted deployments. Any ReductStore instance linked through replication to Pro must also be covered by a Pro commercial license."
          categories={createFeatures("onpremise")}
          buttonLabel="Subscribe"
          onClick={handleSubscribe}
          isHighlight
          manageSubscriptionUrl={portalUrl}
        />

        <PricingPlan
          title="Enterprise"
          subtitle="For larger companies"
          description="Custom licensing, support, and commercial terms for larger companies with complex deployments."
          categories={createFeatures("onpremise")}
          buttonUrl="/enterprise"
          buttonLabel="Learn More"
          termsUrl="/terms"
        />
      </div>
    </section>
  );
}
