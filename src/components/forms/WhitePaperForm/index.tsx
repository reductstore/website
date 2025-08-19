import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useForm, ValidationError } from "@formspree/react";
import { useLocation } from "@docusaurus/router";
import clsx from "clsx";
import Link from "@docusaurus/Link";

const whitePaperUrl =
  require("@site/static/pdf/whitepaper/ReductStore_WhitePaper.pdf").default;

export default function WhitePaperForm() {
  const location = useLocation();

  const [state, handleSubmit] = useForm("xleylpzp");
  const [downloadInitiated, setDownloadInitiated] = useState(false);
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

  const downloadWhitePaper = () => {
    if (!downloadInitiated) {
      setDownloadInitiated(true);
      const link = document.createElement("a");
      link.href = whitePaperUrl;
      link.download = "ReductStore_WhitePaper.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!consent) return;
    const form = e.currentTarget;
    const formData = new FormData(form);
    await handleSubmit(formData);
  };

  if (state.succeeded) {
    downloadWhitePaper();
    return (
      <div id="whitepaper-form-success" className="alert alert--success">
        <h2>Thank you for your interest!</h2>
        <p>Your white paper download should start shortly.</p>
        <p>
          If the download does not start,{" "}
          <strong>
            <Link to={whitePaperUrl} target="_blank">
              click here
            </Link>
          </strong>{" "}
          to download it manually.
        </p>
      </div>
    );
  }

  return (
    <form
      id="whitepaper-form"
      className={styles.whitePaperForm}
      onSubmit={onSubmit}
      method="POST"
    >
      <div className={styles.inputGroup}>
        <label htmlFor="InputNameWhitePaper">Your Name</label>
        <input
          type="text"
          id="InputNameWhitePaper"
          name="name"
          placeholder="Your Name"
          className={styles.inputField}
          required
        />
        <ValidationError prefix="Name" field="name" errors={state.errors} />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="InputCompanyWhitePaper">Your Company</label>
        <input
          type="text"
          id="InputCompanyWhitePaper"
          name="company"
          placeholder="Your Company"
          required
          className={styles.inputField}
        />
        <ValidationError
          prefix="Company"
          field="company"
          errors={state.errors}
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="InputEmailWhitePaper">Your Email</label>
        <input
          type="email"
          id="InputEmailWhitePaper"
          name="email"
          placeholder="Your Email"
          required
          className={styles.inputField}
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

      <div className="col">
        <button
          className={"row button button--primary button--md"}
          type="submit"
          disabled={state.submitting || !consent}
        >
          Download
        </button>
      </div>
    </form>
  );
}
