import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useForm, ValidationError } from "@formspree/react";
import { useLocation } from "@docusaurus/router";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import CountdownTimer from "../CountdownTimer";

interface PriceListFormProps {
  elementId: string;
  targetDate?: Date;
  startDate?: Date;
}

const PriceListForm = ({
  elementId,
  targetDate,
  startDate,
}: PriceListFormProps) => {
  const location = useLocation();

  const [state, handleSubmit] = useForm("xeojydgy");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [companyName, setcompanyName] = useState("");
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
      <div className={clsx(styles.form, "alert alert--success")}>
        <h2>Thank You!</h2>
        <p>
          We've received your request and will send you the price list shortly.
        </p>
      </div>
    );
  }

  return (
    <form id={elementId} className={styles.form} onSubmit={handleSubmit}>
      <h2>Get Price List</h2>
      {targetDate && startDate && (
        <div className={styles.countdown}>
          <CountdownTimer
            targetDate={targetDate}
            startDate={startDate}
            size={45}
          />
        </div>
      )}
      <p>We will send you the price list shortly.</p>
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
      {/* Hidden fields for page path and UTM parameters */}
      <input type="hidden" name="pagePath" value={pagePath} />
      <input type="hidden" name="utm_campaign" value={utmParams.utm_campaign} />
      <input type="hidden" name="utm_source" value={utmParams.utm_source} />
      <input type="hidden" name="utm_medium" value={utmParams.utm_medium} />
      <input type="hidden" name="utm_term" value={utmParams.utm_term} />
      <input type="hidden" name="utm_content" value={utmParams.utm_content} />
      <input type="hidden" name="utm_id" value={utmParams.utm_id} />
      <div className={styles.buttonGroup}>
        <button
          className={"button button--primary"}
          type="submit"
          disabled={state.submitting}
        >
          Get Price List
        </button>
      </div>

      <Link
        className={clsx(styles.privacyPolicy)}
        to="/privacy"
        target="_blank"
      >
        We don't share your information with anyone.
      </Link>
    </form>
  );
};

export default PriceListForm;
