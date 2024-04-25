import React, { useState } from "react";
import { useEffect } from "react";
import { initializeCookieConsent } from "./cookieConsent";
import { useLocation } from "@docusaurus/router";
import useCookieConsentStore from "@site/src/store/useCookieConsentStore";

export default function Root({ children }) {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);
  const { setModalOpen } = useCookieConsentStore.getState();
  useEffect(() => {
    if (initialized) {
      setModalOpen(false);
      return;
    }
    setTimeout(() => {
      initializeCookieConsent();
      setInitialized(true);
    }, 1000);
  }, [location.pathname]);
  return <>{children}</>;
}
