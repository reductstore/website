import React from "react";
import Layout from "@theme/Layout";
import SimpleHeader from "@site/src/components/SimpleHeader";
import HelpForm from "@site/src/components/HelpForm";

export default function ContactPage() {
  return (
    <Layout
      title="ReductStore Contact"
      description="Contact page for ReductStore with contact details and contact form"
    >
      <main>
        <SimpleHeader pageTitle="Contact Us" />
        <div className="container">
          <HelpForm />
        </div>
      </main>
    </Layout>
  );
}
