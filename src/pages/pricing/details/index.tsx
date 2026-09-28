import type { JSX } from "react";
import Layout from "@theme/Layout";
import SimpleHeader from "@site/src/components/shared/SimpleHeader";
import { PricingComparison } from "@site/src/components/shared/PricingTable";

export default function PricingDetails(): JSX.Element {
  return (
    <Layout
      title="Pricing details"
      description="Compare ReductStore Free, Pro, Cloud Enterprise, and Cloud Self-hosted plans."
    >
      <main>
        <SimpleHeader pageTitle="ReductStore pricing details" />
        <div className="container">
          <PricingComparison />
        </div>
      </main>
    </Layout>
  );
}
