import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import PricingPlan from "./PricingPlan";
import CurrencySwitch from "../CurrencySwitch";
import {
  type Currency,
  REDUCTSTORE_MIN_TB,
  REDUCTSTORE_PRICING,
  formatCurrency,
} from "@site/src/lib/currency";
import useCurrency from "@site/src/lib/useCurrency";
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
    { title: "High-Performance Time-Indexed Storage", available: true },
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
    {
      title: "Deployment & Operations",
      available: true,
      isCategoryHeader: true,
    },
    { title: "Docker & Kubernetes Ready", available: true },
    { title: "Grafana Integration", available: true },
    { title: "Fully Managed Service", available: isCloud },
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
  const baseline = createFeatures("free");
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
    <strong key="plus">Everything in Free, plus</strong>,
    ...available.slice(0, 3).map((feature) => feature.title),
  ];
};

const availabilityIcon = (available: boolean) =>
  available ? (
    <FaCheckCircle aria-label="Included" className={styles.featureIcon} />
  ) : (
    <FaTimes aria-label="Not included" className={styles.unavailableIcon} />
  );

const perGb = (currency: Currency) =>
  formatCurrency(REDUCTSTORE_PRICING[currency].perGbMonth, currency, 3);
const perTb = (currency: Currency) =>
  formatCurrency(REDUCTSTORE_PRICING[currency].perTbMonth, currency);

export function checkoutHref(checkoutUrl: string, currency: Currency) {
  const url = new URL(checkoutUrl);
  url.searchParams.set("currency", currency);
  return url.toString();
}

export function PricingComparison() {
  const features = createFeatures("free");
  const currency = useCurrency();

  return (
    <section className={styles.comparisonSection} aria-label="Plan comparison">
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
              <td>{formatCurrency(0, currency)}</td>
              <td>
                {perTb(currency)} per TB per month ({perGb(currency)} per GB),
                excl. VAT
              </td>
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
                      <strong>{feature.title}</strong>
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

function SubscribeButton({ href }: { href: string }) {
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    // Leaving for Stripe keeps this page in the back/forward cache with the
    // loader still showing, so reset it when the visitor comes back.
    const reset = () => setRedirecting(false);
    window.addEventListener("pageshow", reset);
    return () => window.removeEventListener("pageshow", reset);
  }, []);

  const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    if (redirecting) {
      event.preventDefault();
      return;
    }
    setRedirecting(true);
  };

  return (
    <a
      className={clsx("button button--primary button--lg", styles.subscribe)}
      href={href}
      onClick={onClick}
      aria-busy={redirecting}
      aria-disabled={redirecting}
    >
      {redirecting && <span className={styles.spinner} aria-hidden="true" />}
      {redirecting ? "Redirecting…" : "Subscribe"}
    </a>
  );
}

export default function PricingTable() {
  const { siteConfig } = useDocusaurusContext();
  const { checkoutEnabled, checkoutUrl } =
    siteConfig.customFields as ReductProCustomFields;
  const currency = useCurrency();
  const [storageGb, setStorageGb] = useState(REDUCTSTORE_MIN_TB * 1000);
  const monthlyPrice = storageGb * REDUCTSTORE_PRICING[currency].perGbMonth;

  return (
    <>
      <div className={styles.currencyRow}>
        <CurrencySwitch />
      </div>
      <div className={styles.pricingTable}>
        <PricingPlan
          title="Free"
          tagline="Open source, self hosted"
          price={
            <span className={styles.price}>{formatCurrency(0, currency)}</span>
          }
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
                <span>{perTb(currency)}</span> per TB per month, excl. VAT
              </p>
              <p className={styles.billingNote}>
                {perGb(currency)} per GB. Billed monthly on peak storage.{" "}
                {REDUCTSTORE_MIN_TB} TB minimum.
              </p>
              <label className={styles.storageGauge}>
                <span className={styles.storageGaugeHeader}>
                  <span>Peak storage: {storageGb.toLocaleString()} GB</span>
                  <span>Scales to any storage volume</span>
                </span>
                <input
                  type="range"
                  min="1000"
                  max="100000"
                  step="1"
                  value={storageGb}
                  onChange={(event) => setStorageGb(Number(event.target.value))}
                />
              </label>
              {storageGb < 100000 ? (
                <output className={styles.gaugePrice}>
                  {formatCurrency(monthlyPrice, currency, 2)} per month
                </output>
              ) : (
                <div className={styles.volumeBanner}>
                  <p>
                    <strong>Need more?</strong> The Pro plan scales to as much
                    storage as you need.
                  </p>
                  <Link
                    className="button button--primary button--sm"
                    to="/enterprise"
                  >
                    Talk to us
                  </Link>
                </div>
              )}
            </div>
          }
          actions={
            checkoutEnabled &&
            checkoutUrl && (
              <SubscribeButton href={checkoutHref(checkoutUrl, currency)} />
            )
          }
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
              to="/enterprise"
            >
              Talk to us
            </Link>
          }
          bullets={[
            <strong key="plus">Everything in Pro, plus</strong>,
            "Cloud Enterprise or Cloud Self-hosted",
            "Custom support and SLA",
            "Architecture and deployment assistance",
          ]}
        />
      </div>
      <p className={styles.detailsLink}>
        <Link to="/pricing/details">
          Compare all plan details <span aria-hidden="true">→</span>
        </Link>
      </p>
    </>
  );
}
