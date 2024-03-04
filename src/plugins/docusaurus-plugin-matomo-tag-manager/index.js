module.exports = function (context) {
  const { siteConfig } = context;
  const { themeConfig } = siteConfig;
  const { matomo } = themeConfig;

  if (!matomo || !matomo.matomoUrl) {
    throw new Error(
      "You need to specify `matomoUrl` in the `themeConfig.matomo` of `docusaurus.config.js`"
    );
  }

  const isProd = process.env.NODE_ENV === "production";
  const injectScript = matomo.injectInDev || isProd;

  return {
    name: "docusaurus-plugin-matomo-tag-manager",

    injectHtmlTags() {
      if (injectScript) {
        return {
          headTags: [
            {
              tagName: "script",
              innerHTML: `
                var _paq = window._paq = window._paq || [];
                _paq.push(['requireCookieConsent']);
                var _mtm = window._mtm = window._mtm || [];
                _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
                (function() {
                  var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                  g.async=true; g.src='${matomo.matomoUrl}'; s.parentNode.insertBefore(g,s);
                })();
              `,
              attributes: {
                type: "text/javascript",
              },
            },
          ],
        };
      }

      return {};
    },
  };
};
