import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useForm, ValidationError } from "@formspree/react";
import { useLocation } from "@docusaurus/router";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import CountdownTimer from "../../promotional/CountdownTimer";

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
  const [companyName, setCompanyName] = useState("");
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
        id={`${elementId}-success`}
        className={clsx(styles.form, "alert alert--success")}
      >
        <h2>Thank You!</h2>
        <p>
          We've received your request and will send you the price list shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      id={elementId}
      className={styles.form}
      onSubmit={onSubmit}
      method="POST"
    >
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
        <label htmlFor="companyName">Your Company</label>
        <input
          id="companyName"
          type="text"
          name="company"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
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

      <div className={styles.buttonGroup}>
        <button
          className={"button button--primary"}
          type="submit"
          disabled={state.submitting || !consent}
        >
          Get Price List
        </button>
      </div>
    </form>
  );
};

export default PriceListForm;
