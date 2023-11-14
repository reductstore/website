import React from "react";
import styles from "./styles.module.css"; // Ensure this path matches the location of your CSS module
import Link from "@docusaurus/Link";
import clsx from "clsx";
import { useForm, ValidationError } from "@formspree/react";


export default function HelpForm() {
  const [state, handleSubmit] = useForm("xgejorqo");
  const [topic, setTopic] = React.useState("");

  const topics = [
    "General Inquiry",
    "License Question",
    "Support Request",
    "Feedback",
    "Billing Issue",
  ];

  if (state.succeeded) {
    return (
      <>
        <h2>Thank You!</h2>
        <p>We've received your submission. A member of our team will get back to you as soon as possible.</p>
      </>
    );
  }


  return (
    <form className={styles.helpForm} onSubmit={handleSubmit}>

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

      <p>Select a topic:</p>
      <div className={styles.topicButtons}>
        {topics.map((element) => (
          <button
            key={element}
            type="button"
            className={clsx(styles.topicButton, {
              [styles.topicButtonSelected]: topic === element,
            })}
            onClick={() => {
              if (topic === element) {
                setTopic("");
                return;
              }
              setTopic(element);
            }}
          >
            {element}
          </button>
        ))}
        <input type="hidden" name="topic" value={topic} />
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
          className={clsx(styles.submitButton, "row button button--primary")}
          type="submit"
          disabled={state.submitting}
        >
          GET HELP
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
