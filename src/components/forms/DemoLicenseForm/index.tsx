import React, { JSX, useEffect } from "react";
import styles from "./styles.module.css";
import { useColorMode } from "@docusaurus/theme-common";

export default function DemoLicenseForm(): JSX.Element {
  const { colorMode } = useColorMode();

  const LIGHT_FORM_URL =
    "https://webforms.pipedrive.com/f/ceeoNbkSM01eHSqOmiHIAOHD91JbM52QdonlMXarye7XqibuzRivUASrzlIuCqd3a3";
  const DARK_FORM_URL =
    "https://webforms.pipedrive.com/f/ckmZVWzNMVa6KZ5c3NGtB2cRWoH892dVhcWjkqlFhBvdob3AdzTcufrSUfQYPC7oX1";

  const currentFormUrl = colorMode === "dark" ? DARK_FORM_URL : LIGHT_FORM_URL;

  useEffect(() => {
    const scriptUrl = "https://webforms.pipedrive.com/f/loader";

    // Check for existing script and remove it
    const existingScript = document.querySelector(`script[src="${scriptUrl}"]`);
    if (existingScript) {
      existingScript.remove();
    }

    // Clear Pipedrive global memory for reloading scripts on theme change
    if ((window as any).pipedriveWebForms) {
      (window as any).pipedriveWebForms = undefined;
    }

    const script = document.createElement("script");
    script.src = scriptUrl;
    script.async = true;
    document.body.appendChild(script);

    // Cleanup: Remove the script when the component unmounts
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
    <div id="demo-license-form" className={styles.form}>
      <div
        className="pipedriveWebForms"
        data-pd-webforms={currentFormUrl}
        key={currentFormUrl}
      ></div>
    </div>
  );
}
