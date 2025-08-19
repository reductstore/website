import React, { useEffect, useMemo, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { useLocation } from "@docusaurus/router";
import styles from "./styles.module.css";

interface CareersFormProps {
  elementId?: string;
  positions?: string[];
  defaultRole?: string;
  title?: string;
}

const defaultPositions = [
  "Software Engineer",
  "Sales Engineer",
  "Developer Advocate",
  "General / Other",
];

const CareersForm: React.FC<CareersFormProps> = ({
  elementId = "careers-form",
  positions = defaultPositions,
  defaultRole,
  title,
}) => {
  const location = useLocation();
  const [state, handleSubmit] = useForm("mblkvldd");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(defaultRole || positions[0]);
  const [linkedin, setLinkedin] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);

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

    const roleParam = urlParams.get("role");
    if (roleParam && positions.includes(roleParam)) {
      setRole(roleParam);
    }
  }, [location, positions]);

  const pagePath = location.pathname;

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!consent) return;

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);

    if (cvFile) {
      formData.set("cv", cvFile, cvFile.name);
    }

    await handleSubmit(formData);
  };

  if (state.succeeded) {
    return (
      <div id="careers-form-success" className="alert alert--success">
        <h2>Thank you for your application!</h2>
        <p>Your application has been submitted. We'll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form
      id={elementId}
      className={styles.form}
      onSubmit={onSubmit}
      method="POST"
      encType="multipart/form-data"
    >
      <div className={styles.grid}>
        <div className={styles.inputGroup}>
          <label htmlFor="name">Full name</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Jane Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <ValidationError prefix="Name" field="name" errors={state.errors} />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="jane@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            {positions.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <ValidationError prefix="Role" field="role" errors={state.errors} />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="linkedin">LinkedIn (optional)</label>
          <input
            id="linkedin"
            type="url"
            name="linkedin"
            placeholder="https://www.linkedin.com/in/your-handle"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
          />
          <ValidationError
            prefix="LinkedIn"
            field="linkedin"
            errors={state.errors}
          />
        </div>

        <div className={styles.inputGroup} style={{ gridColumn: "1 / -1" }}>
          <label htmlFor="message">Short note</label>
          <textarea
            id="message"
            name="message"
            placeholder="Tell us briefly why you’re a great fit…"
            rows={8}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="cv">CV (PDF)</label>
          <input
            id="cv"
            type="file"
            name="cv"
            accept="application/pdf"
            onChange={(e) => setCvFile(e.target.files?.[0] || null)}
            required
          />
          <ValidationError prefix="CV" field="cv" errors={state.errors} />
        </div>

        <div className={styles.checkboxGroup} style={{ gridColumn: "1 / -1" }}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="consent"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              required
            />
            I agree that ReductStore may store my application data to evaluate
            my candidacy and contact me.
          </label>
          <ValidationError
            prefix="Consent"
            field="consent"
            errors={state.errors}
          />
        </div>
      </div>

      {/* Hidden meta fields */}
      <input type="hidden" name="pagePath" value={pagePath} />
      <input type="hidden" name="title" value={title || "Careers"} />
      <input type="hidden" name="utm_campaign" value={utmParams.utm_campaign} />
      <input type="hidden" name="utm_source" value={utmParams.utm_source} />
      <input type="hidden" name="utm_medium" value={utmParams.utm_medium} />
      <input type="hidden" name="utm_term" value={utmParams.utm_term} />
      <input type="hidden" name="utm_content" value={utmParams.utm_content} />
      <input type="hidden" name="utm_id" value={utmParams.utm_id} />

      <div className={styles.buttonRow}>
        <button
          className={"button button--primary button--md"}
          type="submit"
          disabled={state.submitting || !consent}
        >
          {state.submitting ? "Submitting…" : "Apply now →"}
        </button>
      </div>
      <ValidationError errors={state.errors} />
    </form>
  );
};

export default CareersForm;
