import React from "react";
import Layout from "@theme/Layout";
import PricingTable from "@site/src/components/PricingTable";
import SimpleHeader from "@site/src/components/SimpleHeader";

export default function Pricing(): JSX.Element {
  return (
    <Layout
      title="ReductStore Pricing"
      description="Price page for ReductStore with pricing plans and pricing details"
    >
      <main>
        <SimpleHeader pageTitle="Pricing" />
        <div className="container">
          <p>
            Transparency and freedom with our Business Source License. Explore,
            customize, and share our source code - it's your playground for
            innovation, whether for commercial or non-commercial initiatives.
          </p>
          <br />
          <PricingTable />
          <br />
          <p>
            No boundaries, no vendor chains, no hidden charges - we've
            eliminated them all. Our software levels the playing field for
            startups and provides scalability for enterprises. As you drive
            success and realize substantial benefits, we encourage a reasonable
            contribution via a commercial license.
          </p>
        </div>
      </main>
    </Layout>
  );
}
