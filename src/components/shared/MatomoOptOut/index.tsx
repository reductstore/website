import React, { useEffect } from "react";

const MatomoOptOut = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://reductstore.matomo.cloud/index.php?module=CoreAdminHome&action=optOutJS&divId=matomo-opt-out&language=auto&showIntro=0";
    script.async = true;

    const matomoElement = document.getElementById("matomo-opt-out");
    if (matomoElement) {
      matomoElement.appendChild(script);
    }

    return () => {
      // Cleanup the script when the component is unmounted
      if (matomoElement && matomoElement.contains(script)) {
        matomoElement.removeChild(script);
      }
    };
  }, []);

  return <div id="matomo-opt-out" style={{ marginBottom: "20px" }} />;
};

export default MatomoOptOut;
