import Layout from "@theme/Layout";
import PricingTable from "@site/src/components/shared/PricingTable";
import SimpleHeader from "@site/src/components/shared/SimpleHeader";
import Faq from "@site/src/components/shared/Faq";
import { JSX } from "react";
import styles from "./styles.module.css";

export default function Pricing(): JSX.Element {
  return (
    <Layout
      title="Pricing"
      description="Choose the right ReductStore plan for your scale, from ReductStore Core under Apache-2.0 to self-serve Pro and custom Enterprise offerings."
    >
      <main>
        <SimpleHeader pageTitle="ReductStore Pricing" />

        <section className="container">
          <div className={styles.introSection}>
            <p className={styles.introText}>
              ReductStore Core is open source under Apache-2.0. ReductStore Pro
              adds commercial components, production support, and licensed
              self-hosted deployments. ReductStore Enterprise adds custom terms
              and support for larger companies.
            </p>
          </div>
          <PricingTable />
        </section>

        <section className="container">
          <SimpleHeader
            pageTitle="Frequently Asked Questions"
            pageTitleAs="h2"
          />
          <Faq faqs={pricingFaqs} defaultOpenCount={3} />
        </section>
      </main>
    </Layout>
  );
}

const pricingFaqs = [
  {
    question:
      "What is the difference between ReductStore Core and ReductStore Pro?",
    answer:
      "ReductStore Core is the open-source base distributed under Apache-2.0. ReductStore Pro adds commercial components, support, and subscription-based deployment rights.",
  },
  {
    question: "How does ReductStore Pro licensing work?",
    answer:
      "ReductStore Pro is a self-serve subscription for business customers. Billing is based on peak storage during each monthly billing period: 1 TB minimum, then per GB. €15 per TB per month, excl. VAT. 1.2 TB costs €18 per month.",
  },
  {
    question: "When will I be charged?",
    answer:
      "We charge automatically at the end of each month to your saved payment method.",
  },
  {
    question: "How does VAT apply?",
    answer:
      "VAT is charged at 19% in Germany. EU businesses with a valid VAT ID use the reverse charge mechanism. Customers outside the EU do not pay German VAT.",
  },
  {
    question: "How do I cancel my subscription?",
    answer:
      "Cancel through the customer portal. Your license remains active until the end of the current billing period.",
  },
  {
    question: "Which payment methods are supported?",
    answer: "Card, Apple Pay, Google Pay, and Link are supported.",
  },
  {
    question: "Do linked replicated instances need ReductStore Pro coverage?",
    answer:
      "Yes. If an instance replicates data to a ReductStore Pro deployment or receives replicated data from it, that linked instance must also be covered by a ReductStore Pro commercial license unless ReductSoftware approves otherwise in writing.",
  },
  {
    question: "Does ReductStore Core remain open source?",
    answer:
      "Yes. ReductStore Core is distributed under Apache-2.0. The commercial terms apply to ReductStore Pro and its proprietary components.",
  },
  {
    question: "What are Extensions?",
    answer:
      "Server-side data processing during queries—e.g., SQL over CSV, JSON, and Parquet; image scaling; rosbag topic filtering.",
  },
];
