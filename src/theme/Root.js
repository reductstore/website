import React from "react";
import { useEffect } from "react";

import { initializeCookieConsent } from "./cookieConsent";

export default function Root({ children }) {
  useEffect(() => {
    setTimeout(() => {
      initializeCookieConsent();
    }, 1000);
  }, []);
  return <>{children}</>;
}
