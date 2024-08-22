module.exports = function (context) {
  const { siteConfig } = context;
  const { themeConfig } = siteConfig;
  const { crisp } = themeConfig;

  if (!crisp || !crisp.siteId) {
    throw new Error(
      "You need to specify `crisp` and `crisp.siteId` in `themeConfig`.",
    );
  }

  return {
    name: "docusaurus-plugin-crisp",

    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: "script",
            innerHTML: `
              window.$crisp=[];
              window.CRISP_WEBSITE_ID="${crisp.siteId}";
              (function(){
                d=document;
                s=d.createElement("script");
                s.src="https://client.crisp.chat/l.js";
                s.async=1;d.
                getElementsByTagName("head")[0].appendChild(s);
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
