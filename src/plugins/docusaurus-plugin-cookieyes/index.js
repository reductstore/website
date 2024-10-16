module.exports = function (context) {
  const { siteConfig } = context;
  const { themeConfig } = siteConfig;
  const { cmp } = themeConfig;

  if (!cmp || !cmp.cookieyesId) {
    throw new Error(
      "You need to specify `cmp` and `cmp.cookieyesId` in `themeConfig`.",
    );
  }

  return {
    name: "docusaurus-plugin-cookieyes",

    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: "script",
            innerHTML: `
              // Load the CookieYes script
              var cookieyes = document.createElement('script');
              cookieyes.id = 'cookieyes';
              cookieyes.type = 'text/javascript';
              cookieyes.src = 'https://cdn-cookieyes.com/client_data/${cmp.cookieyesId}/script.js';
              document.head.appendChild(cookieyes);
              
              // Add a listener for cookie consent updates
              document.addEventListener("cookieyes_consent_update", function (eventData) {
                const data = eventData.detail;
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
        ],
      };
    },
  };
};
