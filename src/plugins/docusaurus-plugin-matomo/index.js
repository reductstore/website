module.exports = function (context) {
  const { siteConfig } = context;
  const { themeConfig } = siteConfig;
  const { matomo } = themeConfig;
  const appEnv = process.env.APP_ENV;

  if (!matomo || !matomo.url || !matomo.container) {
    throw new Error(
      "You need to specify `url` and `container` for `docusaurus-plugin-matomo` to work.",
    );
  }

  const url = matomo.url.replace(/\/$/, "").trim();
  const container = matomo.container.trim();
  const env_suffix =
    appEnv === "production"
      ? ""
      : appEnv === "preview"
        ? matomo.previewSuffix || "_staging"
        : matomo.devSuffix || "_dev";

  return {
    name: "docusaurus-plugin-crisp",

    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: "script",
            innerHTML: `
              var _mtm = window._mtm = window._mtm || [];
              _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
              (function() {
                var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                g.async=true; g.src='${url}/container_${container}${env_suffix}.js'; s.parentNode.insertBefore(g,s);
              })();
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
