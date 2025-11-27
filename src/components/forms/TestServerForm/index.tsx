import React, { useEffect } from "react";
import styles from "./styles.module.css";
import { useColorMode } from '@docusaurus/theme-common';

interface TestServerFormProps {
  elementId?: string;
  // This interface may be used by parent components so we keep them
  title?: string;
  defaultPlan?: "SaaS" | "BYO-Cloud" | "Undecided";
}

const TestServerForm: React.FC<TestServerFormProps> = ({
  elementId = "cloud-signup-form",
}) => {
  const { colorMode } = useColorMode();

  const LIGHT_FORM_URL = "https://webforms.pipedrive.com/f/6rCFNfriKPr8CvMzasDqBKVfi3oMNIbET8g4IYKC8aq2wMDPZRrwytYMpDqw1T64Gn";
  const DARK_FORM_URL = "https://webforms.pipedrive.com/f/6UN7hr5OqMd5IedWUJQkKHlx1ZVRMWOyXKy1kwFjjaeKKbjvlLHCAbbV5Q8o8yBkhd";

  const currentFormUrl = colorMode === 'dark' ? DARK_FORM_URL : LIGHT_FORM_URL;

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
      const scriptToRemove = document.querySelector(`script[src="${scriptUrl}"]`);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [currentFormUrl]);

  return (
    <div id={elementId} className={styles.form}>
      <div
        className="pipedriveWebForms"
        data-pd-webforms={currentFormUrl}
        key={currentFormUrl}
      >
      </div>
    </div>
  );
};

export default TestServerForm;