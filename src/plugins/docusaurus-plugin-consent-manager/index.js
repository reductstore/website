module.exports = function (context) {
  const { siteConfig } = context;
  const { themeConfig } = siteConfig;
  const { cmp } = themeConfig;

  if (!cmp || !cmp.cookieyesId || !cmp.googleTagManagerId) {
    throw new Error(
      "You need to specify `cmp`, `cmp.cookieyesId` and `cmp.googleTagManager` for `docusaurus-plugin-cookieyes` to work.",
    );
  }

  return {
    name: "docusaurus-plugin-consent-manager",

    injectHtmlTags() {
      return {
        headTags: [
          {
            // Custom Consent Mode Script
            tagName: "script",
            innerHTML: `
              window.dataLayer = window.dataLayer || [];
              function gtag() {
                  dataLayer.push(arguments);
              }
              gtag("consent", "default", {
                  ad_storage: "denied",
                  ad_user_data: "denied", 
                  ad_personalization: "denied",
                  analytics_storage: "denied",
                  functionality_storage: "denied",
                  personalization_storage: "denied",
                  security_storage: "granted",
                  wait_for_update: 2000,
              });
              gtag("set", "ads_data_redaction", true);
              gtag("set", "url_passthrough", true);
            `,
            attributes: {
              type: "text/javascript",
            },
          },
          {
            // CookieYes Script
            tagName: "script",
            innerHTML: `
              // Load the CookieYes script
              var cookieyes = document.createElement('script');
              cookieyes.id = 'cookieyes';
              cookieyes.type = 'text/javascript';
              cookieyes.src = 'https://cdn-cookieyes.com/client_data/${cmp.cookieyesId}/script.js';
              document.head.appendChild(cookieyes);
              
              // Listener for cookie consent updates
              document.addEventListener("cookieyes_consent_update", function (eventData) {
                const data = eventData.detail;

                // Google Tag Manager consent handling
                gtag('consent', 'update', {
                  'ad_storage': data.accepted.includes("advertisement") ? 'granted' : 'denied',
                  'ad_user_data': data.accepted.includes("advertisement") ? 'granted' : 'denied',
                  'ad_personalization': data.accepted.includes("advertisement") ? 'granted' : 'denied',
                  'analytics_storage': data.accepted.includes("analytics") ? 'granted' : 'denied',
                  'functionality_storage': data.accepted.includes("functional") ? 'granted' : 'denied',
                  'personalization_storage': data.accepted.includes("functional") ? 'granted' : 'denied',
                  'security_storage': 'granted', // Always granted for security reasons
                });

                // Matomo consent handling
                if (data.accepted.includes("analytics")) {
                  window._mtm = window._mtm || [];
                  _mtm.push({"event": "giveConsent"});
                } else {
                  window._mtm = window._mtm || [];
                  _mtm.push({"event": "forgetConsent"});
                }
              });
            `,
            attributes: {
              type: "text/javascript",
            },
          },
          {
            // Google Tag Manager Script
            tagName: "script",
            innerHTML: `
              (function(w,d,s,l,i){
                w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0], j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
                j.async=true; j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${cmp.googleTagManagerId}');
            `,
            attributes: {
              type: "text/javascript",
            },
          },
        ],
        postBodyTags: [
          {
            // Google Tag Manager NoScript
            tagName: "noscript",
            innerHTML: `
              <iframe src="https://www.googletagmanager.com/ns.html?id=${cmp.googleTagManagerId}"
                height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `,
          },
        ],
      };
    },
  };
};
