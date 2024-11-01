// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import { themes as prismThemes } from "prism-react-renderer";
import codeImport from "remark-code-snippets";
import "dotenv/config";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "ReductStore",
  tagline: "The Fastest Time Series Object Storage for AI Infrastructure",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://www.reduct.store",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "reductstore", // Usually your GitHub org/user name.
  projectName: "website", // Usually your repo name.

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

  // Pass custom environment variables to the site
  customFields: {
    calendarLink: process.env.CALENDAR_LINK,
  },

  plugins: [
    require.resolve("./src/plugins/docusaurus-plugin-matomo"),
    require.resolve("./src/plugins/docusaurus-plugin-cookieyes"),
    require.resolve("./src/plugins/docusaurus-plugin-crisp"),
    require.resolve("./src/plugins/docusaurus-plugin-stream"),
    [
      require.resolve("./src/plugins/docusaurus-plugin-py-sdk-gen"),
      {
        sdkRepo: "git@github.com:reductstore/reduct-py.git",
        sdkBranch: "RS-466-improve-documentation",
        destination: "docs/sdk/py",
        modules: [
          "client",
          "bucket",
          "record",
          "error",
          "msg.bucket",
          "msg.replication",
          "msg.server",
          "msg.token",
        ],
      },
    ],
  ],

  // LaTex support
  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
  ],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.json"),
          editUrl: "https://github.com/reductstore/docs/tree/main",
          remarkPlugins: [codeImport],
        },
        blog: {
          blogTitle: "Blog | Time-Series Object Store for Edge Computing",
          blogDescription:
            "Welcome to ReductStore's Blog – your source for expert articles, updates, and discussions on managing and leveraging time series databases for blob data in edge computing, computer vision, and IoT. Stay informed with our latest content.",
          blogSidebarTitle: "Recent posts",
          blogSidebarCount: 5,
          postsPerPage: 3,
          showReadingTime: true,
          editUrl: "https://github.com/reductstore/docs/tree/main",
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        sitemap: {
          lastmod: "date",
          priority: null,
          changefreq: null,
          createSitemapItems: async ({
            defaultCreateSitemapItems,
            ...params
          }) => {
            const items = await defaultCreateSitemapItems(params);
            return items.filter(
              (item) =>
                !item.url.includes("/blog/page/") &&
                !item.url.includes("/blog/tags/") &&
                !item.url.includes("/search"),
            );
          },
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Algolia search integration
      algolia: {
        appId: "PRYY64U3U1",
        apiKey: "19614063f4b4f798bfe7f3a8135fd488",
        indexName: "reduct",
        contextualSearch: false,
        searchParameters: {},
      },

      // Matomo analytics
      matomo: {
        url: "https://cdn.matomo.cloud/reductstore.matomo.cloud",
        container: "lnt4UdBs",
        previewSuffix: "_staging_24832eb3877816bd5f3a40a3",
        devSuffix: "_dev_f19bac1b68c75bffed400ddd",
      },

      // Consent management platform (CMP)
      cmp: {
        cookieyesId: "28ee242ee07e2579793c1355",
      },

      // Crisp chat integration
      crisp: {
        siteId: "735614ef-d4bd-4d27-8700-aac9e08f8bc9",
      },

      // Stripe integration
      paymentLinks: {
        standard: "https://buy.stripe.com/14k7teamx1fogykeUW",
        premium: "https://buy.stripe.com/bIYcNyfGR1foci48wx",
        iot: "https://buy.stripe.com/cN2cNy3Y93nwci4bII",
      },

      // Remote playground dataset
      playServer: {
        url: "https://play.reduct.store",
        token: "reductstore",
        bucket: "datasets",
      },

      // Declare some <meta> tags
      metadata: [
        {
          name: "keywords",
          content:
            "ReductStore, Time-Series Database, Blob Data Management, Edge Computing Database, IoT Data Solutions, Computer Vision Data Storage",
        },
      ],

      // Blog year groupings
      blog: {
        sidebar: {
          groupByYear: false,
        },
      },

      // Replace with your project's social card
      image: "img/reductstore-social-card.jpg",
      navbar: {
        title: "ReductStore",
        logo: {
          alt: "ReductStore Logo",
          src: "img/logo.webp",
        },
        hideOnScroll: false,
        items: [
          {
            type: "dropdown",
            label: "Product",
            position: "left",
            items: [
              {
                label: "White Paper",
                to: "/whitepaper",
              },
              {
                label: "vs MinIO",
                to: "/blog/comparisons/computer-vision/iot/performance-comparison-reductstore-vs-minio",
              },
              {
                label: "vs MinIO & InfluxDB",
                to: "/blog/comparison/iot/reductstore-benchmark",
              },
              {
                label: "vs TimescaleDB",
                to: "/blog/comparisons/iot/reductstore-vs-timescaledb",
              },
              {
                label: "vs MongoDB",
                to: "/blog/comparisons/iot/reductstore-vs-mongodb",
              },
              {
                label: "Cloud Storage Solution",
                to: "/solutions/cloud",
              },
              {
                label: "Schedule a Technical Review",
                to: "/contact?subject=TechnicalReview",
              },
            ],
          },
          {
            type: "dropdown",
            label: "Use Cases",
            position: "left",
            items: [
              {
                label: "Edge AI",
                to: "/use-cases/ai-workflows",
              },
              {
                label: "Vibration Data",
                to: "/use-cases/vibration-sensors",
              },
              {
                label: "Computer Vision",
                to: "/use-cases/computer-vision",
              },
              {
                label: "IoT (MQTT)",
                to: "/blog/tags/mqtt",
              },
              {
                label: "Robotics (ROS)",
                to: "/blog/tags/ros",
              },
              {
                label: "Explore More",
                to: "/use-cases",
              },
            ],
          },
          {
            type: "dropdown",
            label: "Developers",
            position: "left",
            items: [
              {
                label: "Download",
                to: "/download",
              },
              {
                type: "docSidebar",
                sidebarId: "docSidebar",
                label: "Documentation",
                to: "/docs/getting-started",
              },
              {
                label: "Playground Datasets",
                to: "/datasets",
              },
              {
                label: "Source Code",
                href: "https://github.com/reductstore/reductstore",
              },
              {
                label: "Community",
                href: "https://community.reduct.store",
              },
            ],
          },
          {
            label: "Blog",
            to: "/blog",
            position: "left",
          },
          {
            label: "Pricing",
            to: "/pricing",
            position: "left",
          },
          {
            to: "/contact",
            label: "Contact Us",
            position: "right",
          },
          {
            type: "docsVersionDropdown",
            position: "right",
            dropdownActiveClassDisabled: true,
          },
          {
            href: "https://github.com/reductstore/reductstore",
            position: "right",
            className: "header-github-link",
            "aria-label": "GitHub repository",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Product & Solutions",
            items: [
              {
                label: "White Paper",
                to: "/whitepaper",
              },
              {
                label: "vs MinIO",
                to: "/blog/comparisons/computer-vision/iot/performance-comparison-reductstore-vs-minio",
              },
              {
                label: "vs MinIO & InfluxDB",
                to: "/blog/comparison/iot/reductstore-benchmark",
              },
              {
                label: "vs TimescaleDB",
                to: "/blog/comparisons/iot/reductstore-vs-timescaledb",
              },
              {
                label: "vs MongoDB",
                to: "/blog/comparisons/iot/reductstore-vs-mongodb",
              },
              {
                label: "Cloud Storage Solution",
                to: "/solutions/cloud",
              },
              {
                label: "Edge AI",
                to: "/use-cases/ai-workflows",
              },
              {
                label: "Vibration Data",
                to: "/use-cases/vibration-sensors",
              },
              {
                label: "Computer Vision",
                to: "/blog/tags/computer-vision",
              },
              {
                label: "IoT (MQTT)",
                to: "/blog/tags/mqtt",
              },
              {
                label: "Robotics (ROS)",
                to: "/blog/tags/ros",
              },
              {
                label: "Schedule a Technical Review",
                to: "/contact?subject=TechnicalReview",
              },
            ],
          },
          {
            title: "Developers",
            items: [
              {
                label: "Getting Started",
                to: "/docs/getting-started",
              },
              {
                label: "How Does It Work",
                to: "/docs/how-does-it-work",
              },
              {
                label: "Data Ingestion",
                href: "/docs/guides/data-ingestion",
              },
              {
                label: "Data Querying",
                href: "/docs/guides/data-querying",
              },
              {
                label: "Data Replication",
                href: "/docs/guides/data-replication",
              },
              {
                label: "Integration with Azure VM",
                href: "/docs/guides/integration/azure-vm",
              },
              {
                label: "HTTP API Reference",
                href: "/docs/http-api",
              },
              {
                label: "Playground Datasets",
                to: "/datasets",
              },
              {
                label: "Download",
                to: "/download",
              },
            ],
          },
          {
            title: "Company",
            items: [
              {
                label: "Imprint",
                to: "/imprint",
              },
              {
                label: "Contact Us",
                to: "/contact",
              },
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
            title: "Follow Us",
            items: [
              {
                label: "Discourse",
                href: "https://community.reduct.store",
              },
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/company/reductstore",
              },
              {
                label: "GitHub",
                href: "https://github.com/reductstore/reductstore",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} ReductSoftware UG`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ["rust"],
      },
      colorMode: {
        defaultMode: "light",
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
    }),
};

export default config;
