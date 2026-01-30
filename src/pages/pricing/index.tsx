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
      description="Choose the right ReductStore plan for your scale—from free community use to commercial self-hosted and fully managed cloud offerings."
    >
      <main>
        <SimpleHeader pageTitle="ReductStore Pricing" />

        <section className="container">
          <div className={styles.introSection}>
            <p className={styles.introText}>
              Free for research, testing, and development. Commercial plans
              cover production licensing, support, and deployment requirements.
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
    question: "Is the software the same for all plans?",
    answer:
      "Yes. Same software, same source code on GitHub. Plans differ only in support and licensing terms.",
  },
  {
    question: "How does disk usage licensing work?",
    answer:
      "You receive a license key specifying allowed disk usage. The database continues working if exceeded—CLI, WebConsole, and SDKs will show warnings.",
  },
  {
    question: "What happens when the license expires?",
    answer:
      "The database keeps running. CLI, WebConsole, and SDKs show license warnings.",
  },
  {
    question: "How is the $2M capital threshold calculated?",
    answer:
      "The highest of: total gross revenue, total budget, or funding received in the last 12 months.",
  },
  {
    question: "Why BUSL-1.1?",
    answer:
      "One codebase for everyone with full source access. Free for research and small companies. Commercial license required for production use above $2M capital.",
  },
  {
    question: "What are Extensions?",
    answer:
      "Server-side data processing during queries—e.g., CSV column selection, image scaling, rosbag topic filtering.",
  },
];
