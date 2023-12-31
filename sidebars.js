/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  docSidebar: [
    { type: "autogenerated", dirName: "." },
    {
      type: "category",
      label: "SDKs",
      items: [
        {
          type: "link",
          label: "Rust Client",
          href: "https://docs.rs/crate/reduct-rs/latest",
        },
        {
          type: "link",
          label: "Python Client",
          href: "https://py.reduct.store/en/latest/",
        },
        {
          type: "link",
          label: "JavaScript Client",
          href: "https://js.reduct.store/en/latest/",
        },
        {
          type: "link",
          label: "C++ Client",
          href: "https://cpp.reduct.store/en/latest/",
        },
      ],
    },
    {
      type: "category",
      label: "TOOLS",
      items: [
        {
          type: "link",
          label: "CLI Client",
          href: "https://cli.reduct.store/en/latest/",
        },
      ],
    },
  ],

  // But you can create a sidebar manually
  /*
  docSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

export default sidebars;
