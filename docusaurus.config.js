// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "ReducStore",
  tagline: "The #1 Time-Series Object Store for AI Data Infrastructure",
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

  plugins: [require.resolve("./src/plugins/docusaurus-plugin-matomo")],

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
            "Welcome to ReductStore's Blog – your source for expert articles, updates, and discussions on managing and leveraging time series databases for blob data in edge computing, computer vision, and IoT. Stay informed with our latest content.",
          blogSidebarTitle: "Recent posts",
          blogSidebarCount: 5,
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
        siteId: "1",
        url: "https://reductstore.matomo.cloud/",
        script: "https://cdn.matomo.cloud/reductstore.matomo.cloud/matomo.js",
        exclude: [".azurestaticapps.net"],
      },

      // Stripe integration
      paymentLinks: {
        standard: "https://buy.stripe.com/4gwdTF9un87r1uo6oq",
        premium: "https://buy.stripe.com/3csaHtgWP0EZ7SM003",
        iot: "https://buy.stripe.com/4gw02P6ib2N71uo6os",
      },

      // Declare some <meta> tags
      metadata: [
        {
          name: "keywords",
          content:
            "ReductStore, Time-Series Database, Blob Data Management, Edge Computing Database, IoT Data Solutions, Computer Vision Data Storage",
        },
      ],
      // Replace with your project's social card
      image: "img/reductstore-social-card.jpg",
      navbar: {
        title: "ReductStore",
        logo: {
          alt: "ReductStore Logo",
          src: "img/logo.webp",
        },
        hideOnScroll: true,
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
                label: "AI Workflows",
                to: "/use-cases/ai-workflows",
              },
              {
                label: "Edge Computing",
                to: "/blog/edge-computing/data-reduction-on-edge",
              },
              {
                label: "Computer Vision",
                to: "/blog/tutorials/computer-vision/3-ways-stora-data-for-computer-vision-applications",
              },
              {
                label: "IoT (MQTT)",
                to: "/blog/advice/database/mqtt-data-storage",
              },
              {
                label: "Robotics (ROS)",
                to: "/blog/tutorials/ros/optimal-image-storage-solutions-for-ros-based-computer-vision",
              },
              {
                label: "Data Streaming (Kafka)",
                to: "/blog/tutorial/datastreaming/kafka/data-sink-guide",
              },
              {
                label: "Anomaly Detection (AI)",
                to: "/blog/computer-vision/edge-computing/ai/Implementing-open-source-ai-anomaly-detection",
              },
              {
                label: "Deep Learning (Pytorch)",
                to: "/blog/ai/datastreaming/pytorch/implement-database-data-streaming-pytorch",
              },
            ],
          },
          {
            type: "dropdown",
            label: "Developers",
            position: "left",
            items: [
              {
                label: "Documentation",
                to: "/docs/getting-started",
              },
              {
                label: "API Reference",
                to: "/docs/http-api",
              },
              {
                label: "Download",
                to: "/download",
              },
              {
                label: "Discord",
                href: "https://discord.com/invite/BWrCncF5EP",
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
            title: "Contact Us",
            items: [
              {
                label:
                  "ReductStore LLC, 651 N BROAD ST STE 201, MIDDLETOWN, DE 19709",
                to: "/contact",
              },
              {
                label: "info@reduct.store",
                to: "mailto:info@reduct.store",
              },
            ],
          },
          {
            title: "Links",
            items: [
              {
                label: "Getting Started",
                to: "/docs/getting-started",
              },
              {
                label: "Blog",
                to: "/blog",
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
            title: "Social",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/reductstore/reductstore",
              },
              {
                label: "Discord",
                href: "https://discord.com/invite/BWrCncF5EP",
              },
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/company/reductstore",
              },
              {
                label: "X",
                href: "https://twitter.com/reductstore",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} ReductStore LLC`,
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
