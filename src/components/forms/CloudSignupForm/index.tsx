import React, { useEffect, useMemo, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { useLocation } from "@docusaurus/router";
import styles from "./styles.module.css";

interface CloudSignupFormProps {
  elementId?: string;
  title?: string;
  defaultPlan?: "SaaS" | "BYO-Cloud" | "Undecided";
}

const planOptions = ["SaaS", "BYO-Cloud", "Undecided"] as const;

const volumeOptions = [
  "Up to 1 TB",
  "1-10 TB",
  "10-100 TB",
  "100 TB - 1 PB",
  "1 PB+",
];

const timelineOptions = ["Immediately", "1-3 months", "Exploring / Research"];

const regionOptions = ["EU", "US", "APAC", "Undecided"];

const CloudSignupForm: React.FC<CloudSignupFormProps> = ({
  elementId = "cloud-signup-form",
  title = "Cloud Signup",
  defaultPlan = "SaaS",
}) => {
  const location = useLocation();
  const [state, handleSubmit] = useForm("xzzpnwrl");

  // Inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [plan, setPlan] = useState<typeof planOptions[number]>(defaultPlan);
  const [useCase, setUseCase] = useState("");
  const [dataVolume, setDataVolume] = useState(volumeOptions[0]);
  const [timeline, setTimeline] = useState(timelineOptions[1]);
  const [region, setRegion] = useState(regionOptions[0]);
  const [integrations, setIntegrations] = useState("");
  const [consent, setConsent] = useState(false);

  // UTM + meta
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

    const planParam = urlParams.get("plan");
    if (planParam && planOptions.includes(planParam as any)) {
      setPlan(planParam as typeof planOptions[number]);
    }
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
      <div id="cloud-signup-success" className="alert alert--success">
        <h2>Thanks — you're on the list!</h2>
        <p>
          We'll review your use case and reach out with next steps for access.
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
          <label htmlFor="email">Work email</label>
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
          <label htmlFor="company">Company</label>
          <input
            id="company"
            type="text"
            name="company"
            placeholder="Acme Robotics"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
          <ValidationError
            prefix="Company"
            field="company"
            errors={state.errors}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="jobTitle">Job title</label>
          <input
            id="jobTitle"
            type="text"
            name="jobTitle"
            placeholder="Solutions Architect"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
          <ValidationError
            prefix="Job Title"
            field="jobTitle"
            errors={state.errors}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="plan">Preferred plan</label>
          <select
            id="plan"
            name="plan"
            value={plan}
            onChange={(e) =>
              setPlan(e.target.value as typeof planOptions[number])
            }
            required
          >
            {planOptions.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <ValidationError prefix="Plan" field="plan" errors={state.errors} />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="dataVolume">Estimated data volume</label>
          <select
            id="dataVolume"
            name="dataVolume"
            value={dataVolume}
            onChange={(e) => setDataVolume(e.target.value)}
            required
          >
            {volumeOptions.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
          <ValidationError
            prefix="Data Volume"
            field="dataVolume"
            errors={state.errors}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="timeline">Timeline</label>
          <select
            id="timeline"
            name="timeline"
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
            required
          >
            {timelineOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <ValidationError
            prefix="Timeline"
            field="timeline"
            errors={state.errors}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="region">Preferred data region</label>
          <select
            id="region"
            name="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            required
          >
            {regionOptions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <ValidationError
            prefix="Region"
            field="region"
            errors={state.errors}
          />
        </div>

        <div className={styles.inputGroup} style={{ gridColumn: "1 / -1" }}>
          <label htmlFor="useCase">Primary use case</label>
          <textarea
            id="useCase"
            name="useCase"
            placeholder="Briefly describe the workload, data types (images/video/logs), and goals…"
            rows={6}
            value={useCase}
            onChange={(e) => setUseCase(e.target.value)}
            required
          />
          <ValidationError
            prefix="Use Case"
            field="useCase"
            errors={state.errors}
          />
        </div>

        <div className={styles.inputGroup} style={{ gridColumn: "1 / -1" }}>
          <label htmlFor="integrations">Integrations (optional)</label>
          <input
            id="integrations"
            type="text"
            name="integrations"
            placeholder="ROS/ROS2, Foxglove, Kafka, BigQuery, Snowflake, Grafana…"
            value={integrations}
            onChange={(e) => setIntegrations(e.target.value)}
          />
          <ValidationError
            prefix="Integrations"
            field="integrations"
            errors={state.errors}
          />
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
            I agree that ReductStore may store my data to evaluate my request
            and contact me.
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
      <input type="hidden" name="title" value={title} />
      <input type="hidden" name="product" value="Cloud" />
      <input type="hidden" name="utm_campaign" value={utmParams.utm_campaign} />
      <input type="hidden" name="utm_source" value={utmParams.utm_source} />
      <input type="hidden" name="utm_medium" value={utmParams.utm_medium} />
      <input type="hidden" name="utm_term" value={utmParams.utm_term} />
      <input type="hidden" name="utm_content" value={utmParams.utm_content} />
      <input type="hidden" name="utm_id" value={utmParams.utm_id} />
      {/* Honeypot */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        style={{ display: "none" }}
      />

      <div className={styles.buttonRow}>
        <button
          className={"button button--primary button--md"}
          type="submit"
          disabled={state.submitting || !consent}
        >
          {state.submitting ? "Submitting…" : "Request Access →"}
        </button>
      </div>
      <ValidationError errors={state.errors} />
    </form>
  );
};

export default CloudSignupForm;
