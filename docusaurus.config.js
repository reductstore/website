// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "ReductStore",
  tagline:
    "A Time-Series Database for Blob Data, Optimized for Edge Computing, Computer Vision, and IoT.",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://reductstore.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/docs/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "reductstore", // Usually your GitHub org/user name.
  projectName: "docs", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // When deploying to GitHub Pages, it is better to use an explicit "trailingSlash" site config.
  // Otherwise, GitHub Pages will add an extra trailing slash to your site urls only on direct-access (not when navigation) with a server redirect.
  // This behavior can have SEO impacts and create relative link issues.
  trailingSlash: false,

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/reductstore/docs/tree/main",
        },
        blog: {
          blogTitle:
            "ReductStore Blog: Insights on edge computing, computer vision, and IoT",
          blogDescription:
            "Welcome to the ReductStore Blog – your source for expert articles, updates, and discussions on managing and leveraging time series databases for blob data in edge computing, computer vision, and IoT. Stay informed with our latest content.",
          blogSidebarTitle: "All posts",
          blogSidebarCount: "ALL",
          showReadingTime: true,
          editUrl: "https://github.com/reductstore/docs/tree/main",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/reductstore-social-card.jpg",
      navbar: {
        title: "ReductStore",
        logo: {
          alt: "ReductStore Logo",
          src: "img/logo.png",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "docSidebar",
            position: "left",
            label: "Docs",
          },
          { to: "/blog", label: "Blog", position: "left" },
          { to: "/download", label: "Download", position: "left" },
          { to: "/pricing", label: "Pricing", position: "left" },
          { to: "/reductai", label: "Reduct AI", position: "left" },
          { to: "/contact", label: "Contact Us", position: "left" },
          {
            href: "https://github.com/reductstore/reductstore",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Ressource",
            items: [
              {
                label: "Getting Started",
                to: "/docs/docs/getting-started",
              },
              {
                label: "Blog",
                href: "https://www.reduct.store/blog",
              },
              {
                label: "GitHub",
                href: "https://github.com/reductstore",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Discord",
                href: "https://discord.com/invite/BWrCncF5EP",
              },
              {
                label: "Linkedin",
                href: "https://www.linkedin.com/company/reductstore",
              },
            ],
          },
          {
            title: "Legal",
            items: [
              {
                label: "Privacy Policy",
                to: "/privacy",
              },
              {
                label: "Terms And Conditions",
                to: "/terms",
              },
            ],
          },
          {
            title: "Contact Us",
            items: [
              {
                label: "info@reduct.store",
                to: "mailto:info@reduct.store",
              },
              {
                label: "Contact Form",
                to: "/contact",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} ReductStore LLC`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["rust"],
      },
    }),
};

module.exports = config;
