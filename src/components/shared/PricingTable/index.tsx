import React, { useState } from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import PricingPlan from "./PricingPlan";
import styles from "./styles.module.css";

type ReductProCustomFields = {
  checkoutEnabled?: boolean;
  checkoutUrl?: string;
  portalUrl?: string;
};

type Plan = "free" | "pro" | "cloudEnterprise" | "cloudSelfHosted";

type Feature = {
  title: React.ReactNode;
  available: boolean;
  isCategoryHeader?: boolean;
};

const plans: { id: Plan; label: string }[] = [
  { id: "free", label: "Free" },
  { id: "pro", label: "Pro" },
  { id: "cloudEnterprise", label: "Cloud Enterprise" },
  { id: "cloudSelfHosted", label: "Cloud Self-hosted" },
];

const createFeatures = (plan: Plan): Feature[] => {
  const isPaid = plan !== "free";
  const isCloud = plan === "cloudEnterprise";
  const isEnterprise = plan === "cloudEnterprise" || plan === "cloudSelfHosted";

  return [
    { title: "Core Capabilities", available: true, isCategoryHeader: true },
    { title: "High-Performance Time Series DB", available: true },
    { title: "SDKs: Python, JavaScript, Go, Rust, C++", available: true },
    { title: "Multi-Format Data Support", available: true },
    { title: "CLI Tool", available: true },
    { title: "Web Console", available: true },
    {
      title: "Data & Storage Support",
      available: true,
      isCategoryHeader: true,
    },
    { title: "Extensible Query Engine", available: true },
    {
      title: isPaid ? (
        <Link href="/docs/extensions/official/select-ext">
          <b>ReductSelect: SQL over CSV, JSON &amp; Parquet</b>
        </Link>
      ) : (
        "ReductSelect: SQL over CSV, JSON & Parquet"
      ),
      available: isPaid,
    },
    {
      title: isPaid ? (
        <Link href="/docs/extensions/official/ros-ext">
          <b>ReductROS: Robotics data support</b>
        </Link>
      ) : (
        "ReductROS: Robotics data support"
      ),
      available: isPaid,
    },
    { title: "Cloud Object Storage Backend", available: isPaid },
    { title: "Private Docker images and binaries", available: isPaid },
    {
      title: "Deployment & Operations",
      available: true,
      isCategoryHeader: true,
    },
    { title: "Docker & Kubernetes Ready", available: true },
    { title: "Grafana Integration", available: true },
    { title: "Fully Managed Service", available: isCloud },
    { title: "No-Code Provisioning", available: isCloud },
    { title: "Reports subscription usage", available: plan === "pro" },
    {
      title: "Support & Maintenance",
      available: true,
      isCategoryHeader: true,
    },
    { title: "Support", available: true },
    { title: "Long Term Support (LTS)", available: isPaid },
    { title: "Architecture Review", available: isPaid },
    { title: "Deployment Assistance", available: isPaid },
    { title: "Works fully offline", available: plan === "cloudSelfHosted" },
    { title: "Annual contract with invoicing", available: isEnterprise },
    { title: "Volume pricing", available: isEnterprise },
    { title: "SLA", available: isEnterprise },
  ];
};

const summaryBullets = (plan: Plan): React.ReactNode[] => {
  const features = createFeatures(plan);
  const baseline = createFeatures(plan === "free" ? "free" : "pro");
  const available = features.filter(
    (feature, index) =>
      !feature.isCategoryHeader &&
      feature.available &&
      (plan === "free" || !baseline[index].available),
  );

  if (plan === "free") {
    return available.slice(0, 4).map((feature) => feature.title);
  }

  return [
    <strong key="plus">Everything in Pro, plus</strong>,
    ...available.slice(0, 3).map((feature) => feature.title),
  ];
};

const availabilityIcon = (available: boolean) =>
  available ? (
    <FaCheckCircle aria-label="Included" className={styles.featureIcon} />
  ) : (
    <FaTimes aria-label="Not included" className={styles.unavailableIcon} />
  );

export function PricingComparison() {
  const features = createFeatures("free");

  return (
    <section
      className={styles.comparisonSection}
      aria-labelledby="comparison-title"
    >
      <h1 id="comparison-title">Compare ReductStore plans</h1>
      <div className={styles.comparisonScroll}>
        <table className={styles.comparisonTable}>
          <thead>
            <tr>
              <th scope="col">Feature</th>
              {plans.map((plan) => (
                <th key={plan.id} scope="col">
                  {plan.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Price</th>
              <td>€0</td>
              <td>€15 per TB per month, excl. VAT</td>
              <td>Custom pricing</td>
              <td>Custom pricing</td>
            </tr>
            <tr>
              <th scope="row">Hosted by</th>
              <td>You</td>
              <td>You</td>
              <td>Us</td>
              <td>You</td>
            </tr>
            <tr>
              <th scope="row">Internet connection</th>
              <td>Not needed</td>
              <td>Once a day for the license check</td>
              <td>Managed by us</td>
              <td>Not needed, works offline</td>
            </tr>
            <tr>
              <th scope="row">Billing</th>
              <td>Free</td>
              <td>Monthly by card</td>
              <td>Custom</td>
              <td>Custom</td>
            </tr>
            <tr>
              <th scope="row">Support</th>
              {plans.map((plan) => (
                <td key={plan.id}>{availabilityIcon(true)}</td>
              ))}
            </tr>
            {features.map((feature, index) => {
              if (feature.isCategoryHeader) {
                return (
                  <tr key={index} className={styles.categoryHeader}>
                    <th colSpan={5} scope="colgroup">
                      {feature.title}
                    </th>
                  </tr>
                );
              }

              return (
                <tr key={index}>
                  <th scope="row">{feature.title}</th>
                  {plans.map((plan) => (
                    <td key={plan.id}>
                      {availabilityIcon(
                        createFeatures(plan.id)[index].available,
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className={styles.termsContainer}>
        <a href="/terms" className={styles.termsLink}>
          Terms &amp; Conditions
        </a>
      </p>
    </section>
  );
}

export default function PricingTable() {
  const { siteConfig } = useDocusaurusContext();
  const { checkoutEnabled, checkoutUrl, portalUrl } =
    siteConfig.customFields as ReductProCustomFields;
  const [storageTb, setStorageTb] = useState(1);
  const monthlyPrice = storageTb * 15;

  return (
    <>
      <div className={styles.pricingTable}>
        <PricingPlan
          title="Free"
          tagline="Open source, self hosted"
          price={<span className={styles.price}>€0</span>}
          actions={
            <Link
              className="button button--secondary button--lg"
              to="/docs/getting-started"
            >
              Get started
            </Link>
          }
          bullets={summaryBullets("free")}
        />
        <PricingPlan
          title="Pro"
          tagline="Self hosted, commercial"
          price={
            <div className={styles.proPrice}>
              <p>
                <span>€15</span> per TB per month, excl. VAT
              </p>
              <p className={styles.billingNote}>
                Billed monthly on peak storage. 1 TB minimum.
              </p>
              <label className={styles.storageGauge}>
                <span>Peak storage: {storageTb.toFixed(1)} TB</span>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.1"
                  value={storageTb}
                  onChange={(event) => setStorageTb(Number(event.target.value))}
                />
              </label>
              <output className={styles.gaugePrice}>
                €{monthlyPrice.toFixed(0)} per month
              </output>
            </div>
          }
          actions={
            <>
              {checkoutEnabled && checkoutUrl && (
                <a
                  className="button button--primary button--lg"
                  href={checkoutUrl}
                >
                  Subscribe
                </a>
              )}
              <Link
                className="button button--secondary button--lg"
                to="/demo-license"
              >
                Get demo license
              </Link>
            </>
          }
          footNote="For business customers only."
          bullets={summaryBullets("pro")}
          isHighlight
        />
        <PricingPlan
          title="Enterprise"
          tagline="Self-hosted or Cloud"
          price={<span className={styles.price}>Custom pricing</span>}
          actions={
            <Link
              className="button button--secondary button--lg"
              to="/demo-license"
            >
              Talk to us
            </Link>
          }
          bullets={[
            "Cloud Enterprise or Cloud Self-hosted",
            "Custom support and SLA",
            "Architecture and deployment assistance",
          ]}
        />
      </div>
      <p className={styles.detailsLink}>
        <Link to="/pricing/details">Compare all plan details</Link>
      </p>
      {portalUrl && (
        <p className={styles.manageLine}>
          <a href={portalUrl}>Manage your subscription</a>
        </p>
      )}
    </>
  );
}
