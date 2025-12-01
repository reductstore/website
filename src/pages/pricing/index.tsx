import Layout from "@theme/Layout";
import PricingTable from "@site/src/components/shared/PricingTable";
import SimpleHeader from "@site/src/components/shared/SimpleHeader";
import Faq from "@site/src/components/shared/Faq";

export default function Pricing(): JSX.Element {
  return (
    <Layout
      title="Pricing"
      description="Choose the right ReductStore plan for your scale—from free community use to commercial self-hosted and fully managed cloud offerings."
    >
      <main>
        <SimpleHeader pageTitle="Plans Tailored for Every Scale" />

        <section className="container">
          <p>
            ReductStore is free for research, testing, and development.
            Commercial plans support long-term deployments, production
            workloads, and enterprise-level requirements.
          </p>
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
    question: "Do you ship different software for free and commercial plans?",
    answer:
      "No, regardless of the plan, we ship the same software with source code available in a public repository on GitHub.",
  },
  {
    question: "How do you control disk usage?",
    answer:
      "When you sign a license agreement, we will send you a license key as a text file that contains information about the licensee and the allowed disk usage. You should specify the path to the license when you run the database. The database will keep work even if the disk usage exceeds the limit, but the CLI client, WebConsole and SDKs will generate warnings about the license.",
  },
  {
    question: "Will my infrastructure crash when the license expires?",
    answer:
      "No, the database will continue to work, but the CLI client, WebConsole and SDKs will generate warnings about the license.",
  },
  {
    question:
      "You say that the free plan works only for companies with capital less than 2 million USD, how do you count it?",
    answer:
      "By capital, we mean the highest value of your total gross revenue, your total budget, or any funding you've received, regardless of its source, in the last 12 months.",
  },
  {
    question: "Why BUSL-1.1?",
    answer:
      "We believe that everyone should have access to the source code of the software they use. That's why we don't provide OSS and Enterprise versions. The code base is and will be identical for all users. On the other hand, we need a way to encourage monetization of our products to provide the highest quality software. The BUSL license gives us a way to achieve our goals. Everyone has access to the source code and can use, redistribute and modify it, but if you aim to generate revenue using our software, you are required to purchase a commercial license.",
  },
  {
    question: "What are ReductStore Extensions?",
    answer:
      "Extensions let you process data on the storage side during queries, for example selecting CSV columns, scaling images, or searching text.",
  },
];
