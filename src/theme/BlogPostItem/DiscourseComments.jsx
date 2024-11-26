import React, { useEffect, useRef } from "react";
import { useColorMode } from "@docusaurus/theme-common";
import BrowserOnly from "@docusaurus/BrowserOnly";

const DiscourseComments = ({ embedUrl }) => {
  const { colorMode } = useColorMode();
  const scriptAdded = useRef(false);

  // Function to send the theme to the iframe
  const sendThemeToIframe = () => {
    const discourseUrl = "https://community.reduct.store/";
    const iframe = document.querySelector(
      'iframe[src*="community.reduct.store"]',
    );
    if (iframe && iframe.contentWindow) {
      console.log("Sending theme to iframe", colorMode);
      iframe.contentWindow.postMessage({ theme: colorMode }, discourseUrl);
    }
  };

  useEffect(() => {
    const discourseUrl = "https://community.reduct.store/";

    if (!scriptAdded.current) {
      window.DiscourseEmbed = {
        discourseUrl,
        discourseEmbedUrl: embedUrl,
      };

      // Add Discourse embed script if not already there
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = `${discourseUrl}/javascripts/embed.js`;
      document.body.appendChild(script);

      // Mark the script as added (avoid duplicate script)
      scriptAdded.current = true;
    }

    // Send the theme on colorMode change
    sendThemeToIframe();

    // Send the theme to the iframe when it loads
    const handleIframeLoad = (event) => {
      if (event.data === "iframe loaded") {
        sendThemeToIframe();
      }
    };
    window.addEventListener("message", handleIframeLoad);
    return () => {
      window.removeEventListener("message", handleIframeLoad);
    };
  }, [embedUrl, colorMode]);

  return <div id="discourse-comments"></div>;
};

const DiscourseCommentsWrapper = (props) => (
  <BrowserOnly>{() => <DiscourseComments {...props} />}</BrowserOnly>
);

export default DiscourseCommentsWrapper;
