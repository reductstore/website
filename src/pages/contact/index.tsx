import React from "react";
import Layout from "@theme/Layout";
import SimpleHeader from "@site/src/components/SimpleHeader";
import HelpForm from "@site/src/components/HelpForm";

export default function ContactPage() {
  return (
    <Layout
      title="Get in Touch: Contact Us for Support, Inquiries, or Feedback"
      description="Reach out to the ReductStore team for support, inquiries, or feedback. 
      Whether you're experiencing issues, have questions about our products, or just want to say hello, our dedicated team is here to assist you."
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
