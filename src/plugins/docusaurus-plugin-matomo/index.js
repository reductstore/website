module.exports = function (context) {
  const { siteConfig } = context;
  const { themeConfig } = siteConfig;
  const { matomo } = themeConfig;

  if (!matomo || !matomo.url || !matomo.siteId || !matomo.script) {
    throw new Error(
      "You need to specify `matomoUrl`, `siteId`, and `script` for `docusaurus-plugin-matomo` to work."
    );
  }

  if (matomo.exclude && !Array.isArray(matomo.exclude)) {
    throw new Error(
      "`exclude` should be an array of strings for `docusaurus-plugin-matomo` to work."
    );
  }

  const isProd = process.env.NODE_ENV === "production";
  const injectScript = matomo.injectInDev || isProd;

  return {
    name: "docusaurus-plugin-crisp",

    injectHtmlTags() {
      if (injectScript) {
        return {
          headTags: [
            {
              tagName: "script",
              innerHTML: `
                var _paq = window._paq = window._paq || [];
                _paq.push(['requireCookieConsent']);
                _paq.push(["setExcludedReferrers", ${JSON.stringify(
                  matomo.exclude || []
                )}]);
                _paq.push(['trackPageView']);
                _paq.push(['enableLinkTracking']);
                (function() {
                  var u='${matomo.url}';
                  _paq.push(['setTrackerUrl', u+'matomo.php']);
                  _paq.push(['setSiteId', '${matomo.siteId}']);
                  var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                  g.async=true; g.src='${
                    matomo.script
                  }'; s.parentNode.insertBefore(g,s);
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
