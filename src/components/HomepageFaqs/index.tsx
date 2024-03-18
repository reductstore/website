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
    question: "What can ReductStore do for me?",
    answer:
      "ReductStore simplifies your data infrastructure by merging blob storage with time-series database functionalities, offering a single, optimized solution for managing your unstructured, time-stamped data. It's perfect for applications in edge computing, IoT, and more, saving you the hassle of juggling multiple data storage solutions.",
  },
  {
    question: "How will FIFO quota management benefit me?",
    answer:
      "Our FIFO quota system automatically manages your disk space by prioritizing newer data, ensuring you never run out of storage. This means less time worrying about manual data cleanup and more time focusing on what's important for your projects.",
  },
  {
    question: "How do the SDKs and CLI make my life easier?",
    answer:
      <>
        <p>
          Our SDKs and CLI give you flexible, easy-to-use tools to interact with ReductStore, making it straightforward to manage your database, run queries, and integrate ReductStore into your applications, all without needing deep database expertise.
        </p>
        <HomepageSDKs />
      </>
  },
  {
    question:
      "What advantages does the Web Console offer me?",
    answer:
      <>
        <p>
          The Web Console provides a user-friendly interface for managing your data and settings in ReductStore. It's designed for ease of use, allowing you to quickly visualize data, set up configurations, and monitor your system's health, no technical deep dive required.
        </p>
        <HomepageWebConsole />
      </>
  },
  {
    question: "What do I need to know about ReductStore's licensing?",
    answer:
      "Our licensing is straightforward: the same powerful software for all, with free access for smaller ventures and commercial licenses for those looking to scale or generate revenue. We provide clear guidelines on disk usage and ensure your database keeps running smoothly, even if your license needs updating.",
  },
];