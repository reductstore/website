import Layout from "@theme/Layout";
import PricingTable from "@site/src/components/shared/PricingTable";
import SimpleHeader from "@site/src/components/shared/SimpleHeader";
import Faq from "@site/src/components/shared/Faq";
import PlaygroundOffer from "@site/src/components/promotional/PlaygroundOffer";
import { JSX } from "react";
import styles from "./styles.module.css";

export default function Pricing(): JSX.Element {
  return (
    <Layout
      title="Pricing"
      description="Choose the right ReductStore plan for your scale, from ReductStore Core under Apache-2.0 to ReductStore Pro and fully managed cloud offerings."
    >
      <main>
        <SimpleHeader pageTitle="ReductStore Pricing" />

        <section className="container">
          <div className={styles.introSection}>
            <p className={styles.introText}>
              ReductStore Core is open source under Apache-2.0. ReductStore Pro
              adds commercial components, production support, and licensed
              self-hosted deployments.
            </p>
            <div className={styles.offer}>
              <PlaygroundOffer />
            </div>
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
      "You receive a license key specifying the licensed scope, such as disk usage and deployment coverage. The database continues working if limits are exceeded, but CLI, WebConsole, and SDKs will show warnings.",
  },
  {
    question: "What happens when the license expires?",
    answer:
      "The database keeps running. CLI, WebConsole, and SDKs show license warnings.",
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
      "Server-side data processing during queries—e.g., CSV column selection, image scaling, rosbag topic filtering.",
  },
];
