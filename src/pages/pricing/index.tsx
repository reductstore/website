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
              Start free with open source Core. Upgrade to Pro when you need the
              extensions.
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
        Through the customer portal. The license stays active until the end of
        the billing period.
      </p>
    ),
  },
  {
    question: "Which payment methods?",
    answer: <p>Card, Apple Pay, Google Pay and Link.</p>,
  },
  {
    question: "Cloud or Pro?",
    answer: (
      <p>
        Pro runs on your infrastructure. Cloud is hosted and operated by us.
      </p>
    ),
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
