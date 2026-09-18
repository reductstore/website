import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import type { JSX } from "react";

type ReductProCustomFields = {
  portalUrl?: string;
};

export default function ReductProSuccess(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const { portalUrl } = siteConfig.customFields as ReductProCustomFields;

  return (
    <Layout title="ReductPro subscription started">
      <main className="container margin-vert--xl">
        <h1>Subscription started</h1>
        <p>
          Your ReductPro subscription has started. This page does not verify
          payment or provision a license; provisioning happens only after the
          Stripe webhook confirms payment.
        </p>
        <p>License key delivery: TODO: confirm with Alexey</p>
        <p>
          Configure the license key by following the{" "}
          <a href="/docs/configuration#license-configuration">
            license configuration documentation
          </a>
          .
        </p>
        {portalUrl && (
          <p>
            <a href={portalUrl}>Manage subscription</a>
          </p>
        )}
      </main>
    </Layout>
  );
}
