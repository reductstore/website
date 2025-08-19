import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useForm, ValidationError } from "@formspree/react";
import { useLocation } from "@docusaurus/router";
import Link from "@docusaurus/Link";

interface BlogFormProps {
  elementId: string;
  frontMatter: {
    title: string;
  };
}

const BlogForm = ({ elementId, frontMatter }: BlogFormProps) => {
  const location = useLocation();

  const [state, handleSubmit] = useForm("xwpkopbb");
  const [email, setEmail] = useState("");
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
  const title = frontMatter.title;

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!consent) return;
    const form = e.currentTarget;
    const formData = new FormData(form);
    await handleSubmit(formData);
  };

  if (state.succeeded) {
    return (
      <div id="blog-form-success" className="alert alert--success">
        <h2>Thank you for subscribing!</h2>
        <p>You will now receive updates about our blogs.</p>
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
      <div className={styles.formTitle}>Subscribe to our blogs</div>

      <div className={styles.inputButtonContainer}>
        <div className={styles.inputGroup}>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
          <div className={styles.thankYouMessage}>
            {state.succeeded && "Thank you for subscribing!"}
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button
            className={"button button--primary button--md"}
            type="submit"
            disabled={state.submitting || !consent}
          >
            Subscribe →
          </button>
        </div>
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
      <input type="hidden" name="title" value={title} />
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
    </form>
  );
};

export default BlogForm;
