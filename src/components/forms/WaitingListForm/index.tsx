import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useForm, ValidationError } from "@formspree/react";
import { useLocation } from "@docusaurus/router";
import Link from "@docusaurus/Link";
import clsx from "clsx";

interface WaitingListFormProps {
  elementId: string;
}

const WaitingListForm = ({ elementId }: WaitingListFormProps) => {
  const location = useLocation();

  const [state, handleSubmit] = useForm("xzzpnwrl");
  const [email, setEmail] = useState("");
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

  if (state.succeeded) {
    return (
      <div
        id={`${elementId}-success`}
        className={clsx(
          styles.form,
          styles.thankYouMessage,
          "alert alert--success",
        )}
      >
        <p>Thank you! You've been added to the waiting list.</p>
      </div>
    );
  }

  return (
    <form id={elementId} className={styles.form} onSubmit={handleSubmit}>
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
        {/* Hidden fields for page path and UTM parameters */}
        <input type="hidden" name="pagePath" value={pagePath} />
        <input
          type="hidden"
          name="utm_campaign"
          value={utmParams.utm_campaign}
        />
        <input type="hidden" name="utm_source" value={utmParams.utm_source} />
        <input type="hidden" name="utm_medium" value={utmParams.utm_medium} />
        <input type="hidden" name="utm_term" value={utmParams.utm_term} />
        <input type="hidden" name="utm_content" value={utmParams.utm_content} />
        <input type="hidden" name="utm_id" value={utmParams.utm_id} />
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
