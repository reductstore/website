import React from "react";
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

type Plan = "core" | "pro" | "cloud" | "enterprise";

type Feature = {
  title: React.ReactNode;
  available: boolean;
  isCategoryHeader?: boolean;
};

const plans: { id: Plan; label: string }[] = [
  { id: "core", label: "Core" },
  { id: "pro", label: "Pro" },
  { id: "cloud", label: "Cloud" },
  { id: "enterprise", label: "Enterprise" },
];

const createFeatures = (plan: Plan): Feature[] => {
  const isPaid = plan !== "core";

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
    { title: "Fully Managed Service", available: plan === "cloud" },
    { title: "No-Code Provisioning", available: plan === "cloud" },
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
    { title: "Works fully offline", available: plan === "enterprise" },
    {
      title: "Annual contract with invoicing",
      available: plan === "enterprise",
    },
    { title: "Volume pricing", available: plan === "enterprise" },
    { title: "SLA", available: plan === "enterprise" },
  ];
};

const summaryBullets = (plan: Plan): React.ReactNode[] => {
  const features = createFeatures(plan);
  const baseline = createFeatures(plan === "pro" ? "core" : "pro");
  const available = features.filter(
    (feature, index) =>
      !feature.isCategoryHeader &&
      feature.available &&
      (plan === "core" || !baseline[index].available),
  );

  if (plan === "core") {
    return available.slice(0, 5).map((feature) => feature.title);
  }

  return [
    <strong key="plus">
      Everything in {plan === "pro" ? "Core" : "Pro"}, plus
    </strong>,
    ...available.slice(0, 4).map((feature) => feature.title),
  ];
};

const availabilityIcon = (available: boolean) =>
  available ? (
    <FaCheckCircle aria-label="Included" className={styles.featureIcon} />
  ) : (
    <FaTimes aria-label="Not included" className={styles.unavailableIcon} />
  );

function PricingComparison() {
  const features = createFeatures("core");

  return (
    <section
      className={styles.comparisonSection}
      aria-labelledby="comparison-title"
    >
      <h2 id="comparison-title">Compare plans</h2>
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
              <td>Free</td>
              <td>€15 per TB per month, excl. VAT</td>
              <td>{/* TODO: confirm with Anthony */}</td>
              <td>Custom</td>
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
              <td>{/* TODO: confirm with Anthony */}</td>
              <td>Annual invoice</td>
            </tr>
            <tr>
              <th scope="row">Support</th>
              {/* TODO: confirm with Anthony, per plan */}
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

  return (
    <>
      <div className={styles.pricingTable}>
        <PricingPlan
          title="Core"
          tagline="Open source, self hosted"
          price={<span className={styles.price}>Free</span>}
          actions={
            <Link
              className="button button--secondary button--lg"
              to="/docs/getting-started"
            >
              Get started
            </Link>
          }
          bullets={summaryBullets("core")}
        />
        <PricingPlan
          title="Pro"
          tagline="Self hosted, commercial"
          price={
            <>
              <p className={styles.proPrice}>
                <span>€15</span> per TB per month, excl. VAT
              </p>
              <p className={styles.billingNote}>
                1 TB minimum. 1.2 TB costs €18.
              </p>
            </>
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
          title="Cloud"
          tagline="We run it for you"
          price={<>{/* TODO: confirm with Anthony */}</>}
          actions={
            <Link
              className="button button--secondary button--lg"
              to="/solutions/cloud"
            >
              Get demo server
            </Link>
          }
          bullets={summaryBullets("cloud")}
        />
        <PricingPlan
          title="Enterprise"
          tagline="For larger companies"
          price={<span className={styles.price}>Custom</span>}
          actions={
            <Link className="button button--secondary button--lg" to="/contact">
              Talk to us
            </Link>
          }
          bullets={summaryBullets("enterprise")}
        />
      </div>
      {portalUrl && (
        <p className={styles.manageLine}>
          <a href={portalUrl}>Manage your subscription</a>
        </p>
      )}
      <PricingComparison />
    </>
  );
}
