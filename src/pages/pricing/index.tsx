import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import PricingTable from "@site/src/components/shared/PricingTable";
import SimpleHeader from "@site/src/components/shared/SimpleHeader";
import Faq from "@site/src/components/shared/Faq";
import CostCalculator from "@site/src/components/calculator/CostCalculator";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import {
  type Currency,
  REDUCTSTORE_MIN_TB,
  REDUCTSTORE_PRICING,
  formatCurrency,
} from "@site/src/lib/currency";
import useCurrency from "@site/src/lib/useCurrency";
import { JSX } from "react";
import styles from "./styles.module.css";

type ReductProCustomFields = { portalUrl?: string };

export default function Pricing(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const { portalUrl } = siteConfig.customFields as ReductProCustomFields;
  const currency = useCurrency();
  return (
    <Layout
      title="Pricing"
      description="ReductStore pricing: free open source Core, self-serve Pro at €10 or $12 per TB per month, and Enterprise. Estimate your storage cost on AWS S3, Azure Blob, or MinIO."
    >
      <main>
        <SimpleHeader pageTitle="Pricing" />

        <section className="container">
          <div className={styles.introSection}>
            <p className={styles.introText}>
              Start free with open source Core. Upgrade to Pro when you need the
              extensions.
            </p>
          </div>
          <PricingTable />
        </section>

        <SimpleHeader
          pageTitle="Calculate your data storage cost"
          pageTitleAs="h2"
          id="calculator"
        />
        <section className="container">
          <CostCalculator />
        </section>

        <SimpleHeader pageTitle="Frequently Asked Questions" pageTitleAs="h2" />
        <section className="container">
          <Faq faqs={pricingFaqs(currency, portalUrl)} defaultOpenCount={3} />
        </section>
      </main>
    </Layout>
  );
}

const pricingFaqs = (currency: Currency, portalUrl?: string) => [
  {
    question:
      "What is the difference between ReductStore Core and ReductStore Pro?",
    answer:
      "ReductStore Core is the open-source base distributed under Apache-2.0. ReductStore Pro adds commercial extensions, private Docker images and binaries, and a self-serve monthly subscription for business customers.",
  },
  {
    question: "How does ReductStore Pro licensing work?",
    answer:
      "ReductStore Pro is a self-serve monthly subscription for business customers, billed in EUR or USD.",
  },
  {
    question: "Can Pro run in the cloud?",
    answer:
      "Yes. Pro runs wherever you run it: on your own hardware, on edge devices, or in your own AWS, Azure, or other cloud account. It only needs to reach the license server once a day.",
  },
  {
    question: "When do I need Enterprise?",
    answer: (
      <p>
        When ReductStore runs on air-gapped sites without internet access, when
        you buy through an annual contract with invoicing, or when you want us
        to host it for you. <Link to="/contact">Contact us</Link> for a quote.
      </p>
    ),
  },
  {
    question: "How is Pro billed?",
    answer: `Monthly, on the peak storage during the billing period. ${REDUCTSTORE_MIN_TB} TB minimum, then per GB. 1.2 TB costs ${formatCurrency(1200 * REDUCTSTORE_PRICING[currency].perGbMonth, currency, 2)}.`,
  },
  {
    question: "When am I charged?",
    answer: (
      <p>
        Automatically at the end of each month, to the saved payment method.
      </p>
    ),
  },
  {
    question: "What about VAT?",
    answer: (
      <p>
        VAT at 19% in Germany. EU businesses with a valid VAT ID use the reverse
        charge mechanism. No German VAT for customers outside the EU.
      </p>
    ),
  },
  {
    question: "How do I cancel?",
    answer: (
      <p>
        {portalUrl ? (
          <a href={portalUrl}>Manage your subscription</a>
        ) : (
          "Manage your subscription"
        )}{" "}
        through the customer portal. The license stays active until the end of
        the billing period.
      </p>
    ),
  },
  {
    question: "Which payment methods?",
    answer: <p>Card, Apple Pay, Google Pay and Link.</p>,
  },
  {
    question: "Does ReductStore Core remain open source?",
    answer:
      "Yes. ReductStore Core is distributed under Apache-2.0. The commercial terms apply to ReductStore Pro and its proprietary components.",
  },
  {
    question: "What are Extensions?",
    answer: (
      <p>
        Server-side data processing during queries—e.g., SQL over CSV, JSON, and
        Parquet (ReductSelect); MCAP/ROS topic filtering (ReductROS).
      </p>
    ),
  },
];
