import React, { useEffect, useState } from "react";
import styles from "./styles.module.css"; // Ensure this path matches the location of your CSS module
import Link from "@docusaurus/Link";
import clsx from "clsx";
import { useForm, ValidationError } from "@formspree/react";
import { useLocation } from '@docusaurus/router';


const topics = [
  {
    key: "TechnicalReview",
    label: "Schedule a Technical Review",
  },
  {
    key: "GeneralInquiry",
    label: "General Inquiry",
  },
  {
    key: "LicenseQuestion",
    label: "License Question",
  },
  {
    key: "SupportRequest",
    label: "Support Request",
  },
  {
    key: "Feedback",
    label: "Feedback",
  },
  {
    key: "BillingIssue",
    label: "Billing Issue",
  },
];

interface HelpFormProps {
  subject?: string;
}

export default function HelpForm({ subject }: HelpFormProps): JSX.Element {
  const [state, handleSubmit] = useForm("xgejorqo");
  const [topic, setTopic] = useState(subject || "")
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const subject = queryParams.get('subject');
    const foundTopic = topics.find(t => t.key === subject);
    if (foundTopic) {
      setTopic(foundTopic.key);
    }
  }, [location.search]);

  if (state.succeeded) {
    return (
      <div className="alert alert--success">

        <h2>Thank You!</h2>
        <p>We've received your submission. A member of our team will get back to you as soon as possible.</p>
      </div>
    );
  }

  return (
    <form id="contact-us-form" className={styles.helpForm} onSubmit={handleSubmit}>

      <div className={styles.inputGroup}>
        <label htmlFor="name">Your Name</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Your Name"
          required
        />
        <ValidationError
          prefix="Name"
          field="name"
          errors={state.errors}
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="email">Your Email Address</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="you@example.com"
          required
        />
        <ValidationError
          prefix="Email"
          field="email"
          errors={state.errors}
        />
      </div>
      <div className={styles.inputGroup}>
        <p>Select a topic:</p>
        <div className={styles.topicButtons}>
          {topics.map((element) => (
            <button
              key={element.key}
              type="button"
              className={clsx(styles.topicButton, {
                [styles.topicButtonSelected]: topic === element.key,
              })}
              onClick={() => {
                if (topic === element.key) {
                  setTopic("");
                  return;
                }
                setTopic(element.key);
              }}
            >
              {element.label}
            </button>
          ))}
          <input type="hidden" name="topic" value={topic} />
        </div>
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="helpText">Or tell us what you need help with:</label>
        <textarea
          id="message"
          name="message"
          placeholder="I need help with..."
          rows={4}
          className={styles.textarea}
        ></textarea>
        <ValidationError prefix="Message" field="message" errors={state.errors} />
      </div>
      <div className="col">
        <button
          className={"row button button--primary"}
          type="submit"
          disabled={state.submitting}
        >
          Send
        </button>
        <Link
          className={clsx("row", styles.privacyPolicy)}
          to="/privacy"
          target="_blank"
        >
          Privacy Policy
        </Link>
      </div>
    </form>
  );
}
