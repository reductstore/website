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
              <!-- Start CookieYes banner -->
              var cookieyes = document.createElement('script');
              cookieyes.id = 'cookieyes';
              cookieyes.type = 'text/javascript';
              cookieyes.src = 'https://cdn-cookieyes.com/client_data/${cmp.cookieyesId}/script.js';
              document.head.appendChild(cookieyes);
              <!-- End CookieYes banner -->
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
