import Layout from "@theme/Layout";
import PricingTable from "@site/src/components/shared/PricingTable";
import SimpleHeader from "@site/src/components/shared/SimpleHeader";
import Faq from "@site/src/components/shared/Faq";
import CostCalculator from "@site/src/components/calculator/CostCalculator";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { JSX } from "react";
import styles from "./styles.module.css";

type ReductProCustomFields = { portalUrl?: string };

export default function Pricing(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const { portalUrl } = siteConfig.customFields as ReductProCustomFields;
  return (
    <Layout
      title="Pricing"
      description="ReductStore pricing: free open source Core, self-serve Pro at €0.015 per GB per month, and Enterprise. Estimate your storage cost on AWS S3, Azure Blob, or MinIO."
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
          <p className={styles.calculatorIntro}>
            Tell us what your system records. We estimate the data volume and
            compare ReductStore with the stack teams usually build for that
            workload, using public list prices.
          </p>
          <CostCalculator />
        </section>

        <SimpleHeader pageTitle="Frequently Asked Questions" pageTitleAs="h2" />
        <section className="container">
          <Faq faqs={pricingFaqs(portalUrl)} defaultOpenCount={3} />
        </section>
      </main>
    </Layout>
  );
}

const pricingFaqs = (portalUrl?: string) => [
  {
    question:
      "What is the difference between ReductStore Core and ReductStore Pro?",
    answer:
      "ReductStore Core is the open-source base distributed under Apache-2.0. ReductStore Pro adds commercial extensions, private Docker images and binaries, and a self-serve monthly subscription for business customers.",
  },
  {
    question: "How does ReductStore Pro licensing work?",
    answer:
      "ReductStore Pro is a self-serve monthly subscription for business customers, in EUR.",
  },
  {
    question: "How is Pro billed?",
    answer:
      "Monthly, on the peak storage during the billing period. 1 TB minimum, then per GB. 1.2 TB costs €18.",
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
