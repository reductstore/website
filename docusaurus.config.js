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
  tagline:
    "High Performance Data Storage and Streaming for Robotics and Industrial IoT",
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

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },

  plugins: [
    require.resolve("./src/plugins/docusaurus-plugin-matomo"),
    require.resolve("./src/plugins/docusaurus-plugin-consent-manager"),
    require.resolve("./src/plugins/docusaurus-plugin-stream"),
    [
      require.resolve("./src/plugins/docusaurus-plugin-py-sdk-gen"),
      {
        sdkRepo: "https://github.com/reductstore/reduct-py.git",
        sdkBranch: "main",
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
          blogTitle: "Blog | Time Series Object Storage for AI Infrastructure",
          blogDescription:
            "ReductStore's Blog - Expert articles, updates, and discussions on managing and leveraging time series data in edge and cloud computing, robotics, computer vision, and IoT.",
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
            const externalPages = [
              {
                url: "https://community.reduct.store/",
                lastmod: new Date().toISOString(),
                priority: null,
                changefreq: null,
              },
              {
                url: "https://play.reduct.store",
                lastmod: new Date().toISOString(),
                priority: null,
                changefreq: null,
              },
            ];
            return [
              ...items.filter(
                (item) =>
                  !item.url.includes("/blog/page/") &&
                  !item.url.includes("/blog/tags") &&
                  !item.url.includes("/blog/archive") &&
                  !item.url.includes("/search") &&
                  !item.url.match(/\/docs\/(next|\d+\.\d+\.x)\//),
              ),
              ...externalPages,
            ];
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
        stagingCookieyesId: "3d9b3daecacd570c664904b4",
        googleTagManagerId: "GTM-WBJ3M84W",
      },
      
      // Remote playground dataset
      playServer: {
        url: "https://play.reduct.store/replica",
        token: "reductstore",
        bucket: "datasets",
      },

      // Declare some <meta> tags
      metadata: [
        {
          name: "keywords",
          content:
            "ReductStore, Time Series Database, Blob Data Management, Robotics, Computer Vision, Predictive Maintenance",
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
          src: "img/logo.svg",
          className: "navbar-logo",
        },
        hideOnScroll: false,
        items: [
          {
            type: "dropdown",
            label: "Product",
            position: "left",
            items: [
              {
                label: "How Does It Work",
                to: "/docs/how-does-it-work",
              },
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
                label: "Cloud Solution",
                to: "/solutions/cloud",
              },
            ],
          },
          {
            type: "dropdown",
            label: "Use Cases",
            position: "left",
            items: [
              {
                label: "Robotics Data",
                to: "/blog/database-for-robotics",
              },
              {
                label: "DAQ for Manufacturing",
                to: "/blog/daq-manufacture-system",
              },
              {
                label: "Computer Vision",
                to: "/blog/computer-vision-applications",
              },
              {
                label: "Vibration Data",
                to: "/blog/how-to-store-vibration-sensor-data",
              },
              {
                label: "IIoT (MQTT)",
                to: "/blog/advice/database/mqtt-data-storage",
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
                href: "https://community.reduct.store/signup",
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
                label: "Robotics Data",
                to: "/blog/database-for-robotics",
              },
              {
                label: "DAQ for Manufacturing",
                to: "/blog/daq-manufacture-system",
              },
              {
                label: "Computer Vision",
                to: "/blog/computer-vision-applications",
              },
              {
                label: "Vibration Data",
                to: "/blog/how-to-store-vibration-sensor-data",
              },
              {
                label: "IIoT (MQTT)",
                to: "/blog/advice/database/mqtt-data-storage",
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
                label: "Contact Us",
                to: "/contact",
              },
              {
                label: "Careers",
                to: "/careers",
              },
              {
                label: "About",
                to: "/about",
              },
              {
                label: "Imprint",
                to: "/imprint",
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
                href: "https://community.reduct.store/signup",
              },
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/company/reductstore",
              },
              {
                label: "YouTube",
                href: "https://www.youtube.com/@ReductStore",
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
        additionalLanguages: ["rust", "bash"],
      },
      colorMode: {
        defaultMode: "light",
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
    }),
};

export default config;
