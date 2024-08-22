import React, { useState } from "react";
import styles from "./styles.module.css";
import { useForm, ValidationError } from "@formspree/react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import CountdownTimer from "../CountdownTimer";

interface FreePoCFormProps {
  elementId: string;
  targetDate?: Date;
  startDate?: Date;
}

const FreePoCForm = ({
  elementId,
  targetDate,
  startDate,
}: FreePoCFormProps) => {
  const [state, handleSubmit] = useForm("myyraooa");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [companyName, setcompanyName] = useState("");

  if (state.succeeded) {
    return (
      <div className={clsx(styles.form, "alert alert--success")}>
        <h2>Thank You!</h2>
        <p>
          We've received your request for a Proof of Concept. A member of our
          team will get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form id={elementId} className={styles.form} onSubmit={handleSubmit}>
      <h2>Request a Proof of Concept</h2>
      {targetDate && startDate && (
        <div className={styles.countdown}>
          <CountdownTimer
            targetDate={targetDate}
            startDate={startDate}
            size={45}
          />
        </div>
      )}
      <p>
        Our team will reach out to you and we will create a custom software
        integration for your project.
      </p>

      <div className={styles.inputGroup}>
        <label htmlFor="name">Your Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          required
        />
        <ValidationError prefix="Name" field="name" errors={state.errors} />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="InputCompanyWhitePaper">Your Company</label>
        <input
          id="companyName"
          type="text"
          name="company"
          value={companyName}
          onChange={(e) => setcompanyName(e.target.value)}
          placeholder="Your Company"
          required
        />
        <ValidationError
          prefix="Company"
          field="company"
          errors={state.errors}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="email">Your Email Address</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </div>

      <div className={styles.buttonGroup}>
        <button
          className={"button button--primary"}
          type="submit"
          disabled={state.submitting}
        >
          Request a Proof of Concept
        </button>
      </div>

      <Link
        className={clsx(styles.privacyPolicy)}
        to="/privacy"
        target="_blank"
      >
        Privacy Policy
      </Link>
    </form>
  );
};

export default FreePoCForm;
