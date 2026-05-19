import React, { useEffect } from "react";
import styles from "./styles.module.css";
import { useColorMode } from "@docusaurus/theme-common";

export default function CraChecklistForm(): JSX.Element {
  const { colorMode } = useColorMode();

  const LIGHT_FORM_URL =
    "https://webforms.pipedrive.com/f/6UHUd12FatAcpjodik1qzcBVUg5gJ5HXz5QDNdo377majE7L9GgfNoFOaddXb5eZnJ";
  const DARK_FORM_URL =
    "https://webforms.pipedrive.com/f/6Wa5FqkaH8UgQnMM90E86skLPtprSJilE2jcVblxlmzjrdvoLJDXM8LiwBdAWerLPl";

  const currentFormUrl = colorMode === "dark" ? DARK_FORM_URL : LIGHT_FORM_URL;

  useEffect(() => {
    const scriptUrl = "https://webforms.pipedrive.com/f/loader";

    const existingScript = document.querySelector(`script[src="${scriptUrl}"]`);
    if (existingScript) {
      existingScript.remove();
    }

    if ((window as any).pipedriveWebForms) {
      (window as any).pipedriveWebForms = undefined;
    }

    const script = document.createElement("script");
    script.src = scriptUrl;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector(
        `script[src="${scriptUrl}"]`,
      );
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [currentFormUrl]);

  return (
    <div id="cra-checklist-form" className={styles.craChecklistForm}>
      <div
        className="pipedriveWebForms"
        data-pd-webforms={currentFormUrl}
        key={currentFormUrl}
      ></div>
    </div>
  );
}
