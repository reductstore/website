import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import type { JSX } from "react";

type ReductProCustomFields = {
  portalUrl?: string;
};

// The URL arrives as /pro/success?session_id=... We intentionally ignore it.
// This page never provisions anything, calls the license server, or treats the
// visit as proof of payment. Provisioning happens in the Stripe webhook.
export default function ReductProSuccess(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const { portalUrl } = siteConfig.customFields as ReductProCustomFields;

  return (
    <Layout title="ReductPro subscription started">
      <main className="container margin-vert--xl">
        <h1>Subscription started</h1>
        <p>
          This page does not verify payment or provision a license. Provisioning
          happens only after the Stripe webhook confirms payment.
        </p>
        {/* TODO: confirm with Alexey how the license key is delivered after checkout. */}
        <p>
          <Link
            className="button button--primary"
            to="/docs/configuration#license-configuration"
          >
            Set up your license
          </Link>
        </p>
        {portalUrl && (
          <p>
            <a href={portalUrl}>Manage your subscription</a>
          </p>
        )}
      </main>
    </Layout>
  );
}
