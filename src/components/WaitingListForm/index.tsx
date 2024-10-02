import React, { useState } from "react";
import styles from "./styles.module.css";
import { useForm, ValidationError } from "@formspree/react";
import Link from "@docusaurus/Link";
import clsx from "clsx";

const WaitingListForm = () => {
  const [state, handleSubmit] = useForm("xzzpnwrl");
  const [email, setEmail] = useState("");

  if (state.succeeded) {
    return (
      <div className={clsx(styles.form, "alert alert--success")}>
        <p>Thank you! You've been added to the waiting list.</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className={styles.emailInput}
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
        <button
          className={"button button--primary"}
          type="submit"
          disabled={state.submitting}
        >
          Join Waiting List
        </button>
      </div>
      <p className={styles.privacyText}>
        <Link
          to="/privacy"
          target="_blank"
          className={clsx(styles.privacyLink)}
        >
          We don't share your information with anyone.
        </Link>
      </p>
    </form>
  );
};

export default WaitingListForm;
