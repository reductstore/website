import React from "react";
import styles from "./styles.module.css";
import Faq from "../Faq";
import SimpleHeader from "../SimpleHeader";
import HomepageSDKs from "../HomepageSDKs";
import HomepageCLI from "../HomepageCLI";
import HomepageWebConsole from "../HomepageWebConsole";
import Heading from '@theme/Heading';

export default function HomepageFaqs() {
  return (
    <section className={styles.section}>
      <Heading as="h1" className={styles.sectionTitle}>Frequently Asked Questions</Heading>
      <Faq faqs={landingFaqs} />
    </section>
  );
}

const landingFaqs = [
  {
    question: "How does the database scale, and what are the infrastructure requirements for scaling up?",
    answer:
      "",
  },
  {
    question: "Are there any customization options for data retention policies?",
    answer:
      "",
  },
  {
    question: "Is it compatible with popular programming languages and data formats?",
    answer:
      "",
  },
  {
    question: "How does the database ensure data compliance, especially for sensitive or regulated industries?",
    answer:
      "",
  },
  {
    question: "How does the licensing work, and are there different tiers or plans available?",
    answer:
      "",
  },
  {
    question: "What kind of support is available for developers and administrators?",
    answer:
      "",
  },
];

// TODO: Add the following components:
// <HomepageSDKs />
// <HomepageCLI />
// <HomepageWebConsole />