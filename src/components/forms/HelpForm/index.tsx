import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import { useForm, ValidationError } from "@formspree/react";
import { useLocation } from "@docusaurus/router";

interface HelpFormProps {
  subject?: string;
}

export default function HelpForm({ subject }: HelpFormProps): JSX.Element {
  const location = useLocation();

  const [state, handleSubmit] = useForm("xgejorqo");
  const [topic, setTopic] = useState(subject || "");
  const [consent, setConsent] = useState(false);
  const [utmParams, setUtmParams] = useState({
    utm_campaign: "",
    utm_source: "",
    utm_medium: "",
    utm_term: "",
    utm_content: "",
    utm_id: "",
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const subject = urlParams.get("subject");
    const foundTopic = topics.find((t) => t.key === subject);
    if (foundTopic) {
      setTopic(foundTopic.key);
    }
    setUtmParams({
      utm_campaign: urlParams.get("utm_campaign") || "",
      utm_source: urlParams.get("utm_source") || "",
      utm_medium: urlParams.get("utm_medium") || "",
      utm_term: urlParams.get("utm_term") || "",
      utm_content: urlParams.get("utm_content") || "",
      utm_id: urlParams.get("utm_id") || "",
    });
  }, [location]);

  const pagePath = location.pathname;

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!consent) return;
    const form = e.currentTarget;
    const formData = new FormData(form);
    await handleSubmit(formData);
  };

  if (state.succeeded) {
    return (
      <div
        id="contact-us-form-success"
        className={clsx(styles.helpForm, "alert alert--success")}
      >
        <h2>Thank You!</h2>
        <p>
          We've received your submission. A member of our team will get back to
          you as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <form
      id="contact-us-form"
      className={styles.helpForm}
      onSubmit={onSubmit}
      method="POST"
    >
      <div className={styles.inputGroup}>
        <label htmlFor="name">Your Name</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Your Name"
          required
        />
        <ValidationError prefix="Name" field="name" errors={state.errors} />
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
        <ValidationError prefix="Email" field="email" errors={state.errors} />
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
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />
      </div>

      <div className={styles.checkboxGroup}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="consent"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            required
          />
          <span>
            I accept the{" "}
            <Link
              className={styles.privacyPolicy}
              to="/privacy"
              target="_blank"
            >
              Privacy Policy
            </Link>
            . My data will only be used for this request and never shared.
          </span>
        </label>
        <ValidationError
          prefix="Consent"
          field="consent"
          errors={state.errors}
        />
      </div>

      <input type="hidden" name="pagePath" value={pagePath} />
      <input type="hidden" name="utm_campaign" value={utmParams.utm_campaign} />
      <input type="hidden" name="utm_source" value={utmParams.utm_source} />
      <input type="hidden" name="utm_medium" value={utmParams.utm_medium} />
      <input type="hidden" name="utm_term" value={utmParams.utm_term} />
      <input type="hidden" name="utm_content" value={utmParams.utm_content} />
      <input type="hidden" name="utm_id" value={utmParams.utm_id} />

      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        style={{ display: "none" }}
      />

      <div className="col">
        <button
          className={"row button button--primary"}
          type="submit"
          disabled={state.submitting || !consent}
        >
          Send
        </button>
      </div>
    </form>
  );
}

const topics = [
  { key: "TechnicalReview", label: "Schedule a Technical Review" },
  { key: "GeneralInquiry", label: "General Inquiry" },
  { key: "LicenseQuestion", label: "License Question" },
  { key: "SupportRequest", label: "Support Request" },
  { key: "Feedback", label: "Feedback" },
  { key: "BillingIssue", label: "Billing Issue" },
];
