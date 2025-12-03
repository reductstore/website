import React, { useEffect } from "react";
import styles from "./styles.module.css";
import { useColorMode } from "@docusaurus/theme-common";

export default function WhitePaperForm(): JSX.Element {
  const { colorMode } = useColorMode();

  const LIGHT_FORM_URL =
    "https://webforms.pipedrive.com/f/6xXV2oOSR22rPi82rJYlw0nAtTjwfwksw9PegThRNm1gOkenxGfqy1uoLbBro9g7x9";
  const DARK_FORM_URL =
    "https://webforms.pipedrive.com/f/ckzC52Q30R209mMTuX2IJikmVPQaIrQEoh3Vut00x4I6KIQixN5Nv6wwTN9AoDfD9N";

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
    <div id="whitepaper-form" className={styles.whitePaperForm}>
      <div
        className="pipedriveWebForms"
        data-pd-webforms={currentFormUrl}
        key={currentFormUrl}
      ></div>
    </div>
  );
}
