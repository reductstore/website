import React from "react";
import Layout from "@theme/Layout";
import SimpleHeader from "@site/src/components/shared/SimpleHeader";
import HelpForm from "@site/src/components/forms/HelpForm";
import styles from "./styles.module.css";

export default function ContactPage() {
  return (
    <Layout
      title="Contact Us for More Information"
      description="Reach out to the ReductStore team for support, inquiries, or feedback. We're here to help you with any questions you may have."
    >
      <main>
        <SimpleHeader pageTitle="Talk With Our Team" />
        <div className="container">
          <p className={styles.introText}>
            Whether you're experiencing problems, have questions about our
            products, or just want to say hello, our dedicated team is here to
            help. Please fill out the form below and we'll get back to you as
            soon as possible.
          </p>
          <HelpForm />
        </div>
      </main>
    </Layout>
  );
}
