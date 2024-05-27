import React, { useState } from 'react';
import styles from './styles.module.css';
import { useForm, ValidationError } from '@formspree/react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';

const whitePaperUrl = require("@site/static/pdf/whitepaper/ReductStore_EdgeAI_WhitePaper.pdf").default;

export default function WhitePaperForm() {
  const [state, handleSubmit] = useForm("xleylpzp");
  const [downloadInitiated, setDownloadInitiated] = useState(false);

  const downloadWhitePaper = () => {
    if (!downloadInitiated) {
      setDownloadInitiated(true);
      const link = document.createElement('a');
      link.href = whitePaperUrl;
      link.download = 'ReductStore_EdgeAI_WhitePaper.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (state.succeeded) {
    downloadWhitePaper();
    return (
      <div className="alert alert--success">
        <h2>Thank you for your interest!</h2>
        <p>Your white paper download should start shortly.</p>
        <p>If the download does not start, <strong><Link to={whitePaperUrl} target="_blank">click here</Link></strong> to download it manually.</p>
      </div>
    );
  }

  return (
    <>
      <h2>Download Our White Paper</h2>
      <p>Dive into challenges and solutions to effectively run AI models on edge devices with our white paper.</p>

      <form className={styles.whitePaperForm} onSubmit={handleSubmit}>
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
          <ValidationError prefix="Company" field="company" errors={state.errors} />
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

        <div className="col">
          <button
            className={"row button button--primary button--md"}
            type="submit"
            disabled={state.submitting}
          >
            Download
          </button>
          <div className={clsx("row", styles.privacyPolicy)} >
            <p>
              We'll never share your email with anyone else. See our&nbsp;
            </p>
            <Link
              to="/privacy"
              target="_blank"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
