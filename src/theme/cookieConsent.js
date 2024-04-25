import "vanilla-cookieconsent/dist/cookieconsent.css";
import * as CookieConsent from "vanilla-cookieconsent";
import useCookieConsentStore from "@site/src/store/useCookieConsentStore";

const cookieConsentConfig = {
  cookie: {
    name: "cc_reductstore",
  },
  onFirstConsent: handleConsent,
  onChange: handleConsent,
  onModalShow: () => {
    useCookieConsentStore.getState().setModalOpen(true);
  },
  onModalHide: () => {
    useCookieConsentStore.getState().setModalOpen(false);
  },
  guiOptions: {
    consentModal: {
      layout: "box",
      position: "bottom right",
      equalWeightButtons: true,
      flipButtons: false,
    },
    preferencesModal: {
      layout: "box",
      position: "right",
      equalWeightButtons: true,
      flipButtons: false,
    },
  },
  categories: {
    necessary: {
      enabled: true,
      readOnly: true,
    },
    functional: {
      enabled: false,
    },
    analytics: {
      enabled: false,
    },
  },
  language: {
    default: "en",
    translations: {
      en: {
        consentModal: {
          title: "We use cookies",
          description:
            "We use cookies to ensure you get the best experience on our website",
          acceptAllBtn: "Accept all",
          acceptNecessaryBtn: "Reject all",
          showPreferencesBtn: "Manage Individual preferences",
          footer: '<a href="/privacy">Privacy Policy</a>',
        },
        preferencesModal: {
          title: "Manage cookie preferences",
          acceptAllBtn: "Accept all",
          acceptNecessaryBtn: "Reject all",
          savePreferencesBtn: "Accept current selection",
          closeIconLabel: "Close modal",
          sections: [
            {
              title: "Cookies",
              description:
                "Cookies are small text files stored on your device. We use cookies to improve your experience on our website.",
            },
            {
              title: "Strictly Necessary cookies",
              description:
                "These cookies are essential for the proper functioning of the website and cannot be disabled.",
              linkedCategory: "necessary",
            },
            {
              title: "Functional cookies",
              description:
                "These cookies enable the website to remember choices you make on the website, such as cookie preferences.",
              linkedCategory: "functional",
            },
            {
              title: "Performance and Analytics",
              description:
                "These cookies collect information about how you use our website. All of the data is anonymized and cannot be used to identify you.",
              linkedCategory: "analytics",
            },
            {
              title: "More information",
              description:
                'Please take a look at our <a href="/privacy">privacy policy</a> for more information.',
            },
          ],
        },
      },
    },
  },
};

function handleConsent({ cookie }) {
  window._paq = window._paq || [];
  if (cookie.categories.includes("analytics")) {
    window._paq.push(["rememberCookieConsentGiven"]);
  } else {
    window._paq.push(["forgetCookieConsentGiven"]);
  }
  if (!cookie.categories.includes("functional")) {
    CookieConsent.eraseCookies("cc_reductstore");
  }
}

export function initializeCookieConsent() {
  CookieConsent.run(cookieConsentConfig);
}
