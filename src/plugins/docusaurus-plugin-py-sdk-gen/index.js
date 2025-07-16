const exec = require("child_process").exec;
const fs = require("fs");
const os = require("os");

/**
 * Generate the index.md file for the SDK documentation with the given body.
 * @param body
 * @returns {string}
 */
function generateIndexDocument(body) {
  // bold MD links but no for images [![...](...)](...)
  body = body.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, p1, p2) => {
    if (p1.startsWith("!")) {
      return `[${p1}](${p2})`;
    }
    return `**[${p1}](${p2})**`;
  });

  return `---
sidebar_position: 0
title: ReductStore Client SDK
description: API reference for the ReductStore Client SDK for Python.
---

<head>
  <link rel="canonical" href="https://www.reduct.store/docs/sdk/py" />
</head>

${body}

## Links

- **[Getting Started](/docs/getting-started/with-python.mdx)**
- **[Guides](/docs/guides/index.mdx)**
- **[Source Code](https://github.com/reductstore/reduct-py)**

import DocCardList from '@theme/DocCardList';

## Modules

<DocCardList />
`;
}

/**
 * Convert the examples in the given data to markdown format.
 *
 * We need to convert the examples from the format:
 *
 * **Examples**:
 *   >>> example code here
 *
 *  To the format:
 *
 *  **Example**:
 *  ```python
 *  example code here
 *  ```
 * @param data
 * @returns {*}
 */
function convertExamplesToMarkdown(data) {
  return data.replace(
    /(?:\*\*Examples\*\*|\*\*Example\*\*):\n(\s*\n)*((?:\s*>>>.*\n)+)/g,
    (match, p1, p2) => {
      const codeBlock = p2.replace(/>>>/g, "").replace(/^/gm, "   ");
      return `\*\*Example\*\*:\n\`\`\`python\n${codeBlock}\`\`\`\n`;
    },
  );
}

/**
 * Generate the configuration for the pydoc-markdown tool.
 * @param title
 * @returns {string}
 */
function renderCfg(title) {
  return `{
    renderer: {
      type: markdown,
      descriptive_class_title: false,
      render_page_title: false,
    }
}`;
}

/**
 * Add the Docusaurus header to the given content.
 * @param module
 * @param title
 * @param content
 * @returns {string}
 */
function addHeader(module, title, content) {
  // remove # module.name from the content
  content = content.replace(`# reduct.${module}`, "");
  return `---
title: ${title}
description: API reference for the ${title} Module of the ReductStore Client SDK for Python.
---
<head>
    <link rel="canonical" href="https://www.reduct.store/docs/sdk/py/${module.replace(".", "/")}" />
</head>

# ${title}

${content}
`;
}

/**
 * Capitalize module name without path
 * @param val
 * @returns {string}
 */
function getTitleFromModuleName(val) {
  const parts = val.split(".");
  const lastName = parts[parts.length - 1];
  return lastName.charAt(0).toUpperCase() + String(lastName).slice(1);
}

export default async function (context, opts) {
  return {
    name: "docusaurus-plugin-py-sdk-gen",

    async loadContent() {
      const tmpDir = os.tmpdir() + "/build/reduct-py";
      console.log(
        `fetch source code from ${opts.sdkRepo}#${opts.sdkBranch} to ${tmpDir}`,
      );

      if (fs.existsSync(tmpDir)) {
        fs.rmdirSync(tmpDir, { recursive: true });
      }

      exec(
        `git clone --depth 1 --branch ${opts.sdkBranch} ${opts.sdkRepo}  ${tmpDir}`,
        (err, stdout, stderr) => {
          if (err) {
            console.error(err);
            console.error(stderr);
            process.exit(1);
          }

          // generate markdown
          for (const module of opts.modules) {
            const title = getTitleFromModuleName(module) + " Module";
            exec(
              `uv run pydoc-markdown -I ${tmpDir}/pkg -m reduct.${module} '${renderCfg()}'`,
              (err, stdout, stderr) => {
                if (err) {
                  console.error(err);
                  console.error(stderr);
                  // process.exit(err.code);
                }
                let md = convertExamplesToMarkdown(stdout);
                md = addHeader(module, title, md);

                const path =
                  `${opts.destination}/` + module.split(".").join("/");
                if (!fs.existsSync(path)) {
                  fs.mkdirSync(path, { recursive: true });
                }

                fs.writeFileSync(`${path}/index.mdx`, md);
              },
            );
          }

          // copy README.md to index.md
          let readme = fs.readFileSync(`${tmpDir}/README.md`, "utf8");
          fs.writeFileSync(
            `${opts.destination}/index.mdx`,
            generateIndexDocument(readme),
          );
        },
      );
    },
  };
}
