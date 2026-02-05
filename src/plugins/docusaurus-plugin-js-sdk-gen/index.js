const { execSync } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");
const reflectionKindMap = {
  8: "Enumeration",
  64: "Function",
  128: "Class",
  256: "Interface",
  4194304: "Type alias",
};

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
description: API reference for the ReductStore Client SDK for JavaScript.
---

<head>
  <link rel="canonical" href="https://www.reduct.store/docs/sdk/js" />
</head>

# ReductStore Client SDK for JavaScript

[![npm](https://img.shields.io/npm/v/reduct-js)](https://www.npmjs.com/package/reduct-js)
[![npm](https://img.shields.io/npm/dm/reduct-js)](https://www.npmjs.com/package/reduct-js)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/reductstore/reduct-js/ci.yml?branch=main)](https://github.com/reductstore/reduct-js/actions)

This package provides an asynchronous HTTP client for interacting with **[ReductStore](https://www.reduct.store)** in JavaScript.

## Features

* Supports the **[ReductStore HTTP API v1.18](https://www.reduct.store/docs/http-api)**
* Bucket management
* API Token management
* Write, read and query data
* Labeling records
* Batching records for read and write operations
* Replication management

## Install

To install this package, run the following command:

\`\`\`
npm install reduct-js
\`\`\`

## Example

Here is an example of how to use this package to create a bucket, write data to it, and read data from it:

\`\`\`js
const { Client, QuotaType } = require("reduct-js");

const main = async () => {
  // 1. Create a ReductStore client
  const client = new Client("http://localhost:8383", { apiToken: "my-token" });

  // 2. Get or create a bucket with 1Gb quota
  const bucket = await client.getOrCreateBucket("my-bucket", {
    quotaType: QuotaType.FIFO,
    quotaSize: BigInt(1e9),
  });

  // 3. Write some data with timestamps in the 'entry-1' entry
  const us = (dateString) => BigInt(Date.parse(dateString) * 1000);
  await (await bucket.beginWrite("sensor-1", { ts: us("2024-01-01T10:00:00Z") }))
    .write("<Blob data>");

  // 4. Query the data by time range
  for await (const record of bucket.query("sensor-1")) {
    console.log(record.ts, record.size);
  }
};

main().catch(console.error);
\`\`\`

The SDK supports the following ReductStore API versions:

* v1.18
* v1.17
* v1.16

It can work with newer and older versions, but it is not guaranteed that all features will work as expected because
the API may change and some features may be deprecated or the SDK may not support them yet.

## Links

- **[Getting Started](/docs/getting-started/with-javascript.mdx)**
- **[Guides](/docs/guides/index.mdx)**
- **[Source Code](https://github.com/reductstore/reduct-js)**

import DocCardList from '@theme/DocCardList';

## Modules

<DocCardList />
`;
}

function run(cmd, opts = {}) {
  execSync(cmd, { stdio: "inherit", ...opts });
}

function normalizeMarkdownLinks(content) {
  return content.replace(/\]\(([^)]+)\)/g, (match, href) => {
    const trimmed = href.trim();
    if (/^https?:\/\//i.test(trimmed)) {
      return match;
    }

    let updated = trimmed;
    if (trimmed.toLowerCase().endsWith("readme.md")) {
      updated = trimmed.replace(/readme\.md$/i, "index.md");
    }
    if (trimmed.toLowerCase().endsWith("changelog.md")) {
      updated =
        "https://github.com/reductstore/reduct-js/blob/main/CHANGELOG.md";
    }

    return updated === trimmed ? match : `](${updated})`;
  });
}

function escapeMdxExpressions(content) {
  const lines = content.split("\n");
  let inFence = false;
  const fenceRegex = /^```/;

  const escaped = lines.map((line) => {
    if (fenceRegex.test(line.trim())) {
      inFence = !inFence;
      return line;
    }
    if (inFence) {
      return line;
    }
    return line
      .replace(/[{}]/g, (match) => (match === "{" ? "&#123;" : "&#125;"))
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  });

  return escaped.join("\n");
}

function titleizeFromFilename(filename) {
  const base = filename.replace(/\.[^.]+$/, "");
  return base.replace(/[-_]+/g, " ").replace(/\b\w/g, (ch) => ch.toUpperCase());
}

function normalizeTitle(title) {
  return title
    .replace(/^Class:\s+/i, "")
    .replace(/^Interface:\s+/i, "")
    .replace(/^Enumeration:\s+/i, "")
    .replace(/^Type alias:\s+/i, "")
    .trim();
}

function buildDescription(title) {
  if (title.startsWith("Class: ")) {
    return `API reference for the ${title.replace("Class: ", "")} class in the ReductStore Client SDK for JavaScript.`;
  }
  if (title.startsWith("Interface: ")) {
    return `API reference for the ${title.replace("Interface: ", "")} interface in the ReductStore Client SDK for JavaScript.`;
  }
  if (title.startsWith("Enumeration: ")) {
    return `API reference for the ${title.replace("Enumeration: ", "")} enum in the ReductStore Client SDK for JavaScript.`;
  }
  if (title.startsWith("Type alias: ")) {
    return `API reference for the ${title.replace("Type alias: ", "")} type alias in the ReductStore Client SDK for JavaScript.`;
  }
  return `API reference for ${title} in the ReductStore Client SDK for JavaScript.`;
}

function buildCanonical(filePath) {
  const docsRoot = path.join(process.cwd(), "docs");
  let rel = path.relative(docsRoot, filePath);
  rel = rel.replace(/\\/g, "/").replace(/\.[^.]+$/, "");
  return `https://www.reduct.store/docs/${rel}`;
}

function transformDocContent(content, filePath) {
  const lines = content.split("\n");
  let frontmatterEnd = -1;
  if (lines[0] === "---") {
    frontmatterEnd = lines.indexOf("---", 1);
  }

  let bodyStart = frontmatterEnd > -1 ? frontmatterEnd + 1 : 0;
  while (bodyStart < lines.length && lines[bodyStart].trim() === "") {
    bodyStart++;
  }

  // Remove TypeDoc breadcrumbs before first H1
  let firstHeadingIndex = lines.findIndex(
    (line, idx) => idx >= bodyStart && line.startsWith("# "),
  );
  if (firstHeadingIndex === -1) {
    firstHeadingIndex = bodyStart;
  }

  const preHeading = lines.slice(bodyStart, firstHeadingIndex);
  const hasBreadcrumbs = preHeading.some((line) => line.includes("reduct-js"));
  if (hasBreadcrumbs) {
    lines.splice(bodyStart, firstHeadingIndex - bodyStart);
    firstHeadingIndex = lines.findIndex(
      (line, idx) => idx >= bodyStart && line.startsWith("# "),
    );
  }

  if (firstHeadingIndex !== -1) {
    const rawTitle = lines[firstHeadingIndex].replace(/^#\s+/, "").trim();
    const normalized = normalizeTitle(rawTitle);
    lines[firstHeadingIndex] = `# ${normalized}`;
  }

  // Ensure head canonical after frontmatter
  const canonical = buildCanonical(filePath);
  const headBlock = [
    "<head>",
    `  <link rel=\"canonical\" href=\"${canonical}\" />`,
    "</head>",
    "",
  ];

  const hasHead = lines
    .slice(bodyStart, Math.min(bodyStart + 6, lines.length))
    .some((line) => line.trim().toLowerCase() === "<head>");

  if (!hasHead) {
    if (frontmatterEnd > -1) {
      lines.splice(frontmatterEnd + 1, 0, ...headBlock);
    } else {
      lines.unshift(...headBlock);
    }
  }

  return lines.join("\n");
}

function stripFrontmatterAndHead(content) {
  const lines = content.split("\n");
  let idx = 0;
  if (lines[0] === "---") {
    const end = lines.indexOf("---", 1);
    if (end !== -1) {
      idx = end + 1;
    }
  }
  while (idx < lines.length && lines[idx].trim() === "") idx += 1;
  if (lines[idx] && lines[idx].trim().toLowerCase() === "<head>") {
    while (
      idx < lines.length &&
      lines[idx].trim().toLowerCase() !== "</head>"
    ) {
      idx += 1;
    }
    if (lines[idx] && lines[idx].trim().toLowerCase() === "</head>") {
      idx += 1;
    }
  }
  while (idx < lines.length && lines[idx].trim() === "") idx += 1;
  return lines.slice(idx).join("\n");
}

function demoteHeadings(content, level = 1) {
  return content
    .split("\n")
    .map((line) => {
      if (!line.startsWith("#")) return line;
      const match = line.match(/^#+/);
      if (!match) return line;
      return "#".repeat(match[0].length + level) + line.slice(match[0].length);
    })
    .join("\n");
}

function unescapeHtmlInCode(content) {
  const lines = content.split("\n");
  let inFence = false;
  const fenceRegex = /^```/;

  const processed = lines.map((line) => {
    if (fenceRegex.test(line.trim())) {
      inFence = !inFence;
      return line;
    }
    if (inFence) {
      return line
        .replace(/\\&lt;/g, "<")
        .replace(/\\&gt;/g, ">")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">");
    }

    const parts = line.split("`");
    for (let i = 0; i < parts.length; i += 1) {
      if (i % 2 === 1) {
        parts[i] = parts[i]
          .replace(/\\&lt;/g, "<")
          .replace(/\\&gt;/g, ">")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">");
      } else {
        parts[i] = parts[i]
          .replace(/\\&lt;/g, "&lt;")
          .replace(/\\&gt;/g, "&gt;");
      }
    }
    return parts.join("`");
  });

  return processed.join("\n");
}

function rewriteRelativeLinks(content, apiFileRelDir, apiBase) {
  return content.replace(/\]\(([^)]+)\)/g, (match, href) => {
    const trimmed = href.trim();
    if (
      trimmed.startsWith("http://") ||
      trimmed.startsWith("https://") ||
      trimmed.startsWith("/") ||
      trimmed.startsWith("#")
    ) {
      return match;
    }

    const resolved = path.posix
      .normalize(path.posix.join(apiBase, apiFileRelDir, trimmed))
      .replace(/\.md$/i, "");
    return `](${resolved})`;
  });
}

function getReflectionSummary(comment) {
  if (!comment || !comment.summary) {
    return "";
  }
  return comment.summary
    .map((part) => part.text || "")
    .join("")
    .trim();
}

function toKebabCase(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}

function modulePathFromFile(fileName) {
  const normalized = fileName.replace(/\\/g, "/");
  if (normalized.startsWith("messages/")) {
    const base = path.basename(normalized, path.extname(normalized));
    return `msg/${toKebabCase(base)}`;
  }

  const base = path.basename(normalized, path.extname(normalized));
  switch (base) {
    case "Client":
      return "client";
    case "Bucket":
      return "bucket";
    case "Record":
      return "record";
    case "RecordBatch":
      return "record-batch";
    case "Batch":
      return "batch";
    case "APIError":
      return "error";
    default:
      return toKebabCase(base);
  }
}

function renderModulePage(moduleName, modulePath, reflections, apiDestination) {
  const title = `${moduleName} Module`;
  const canonical = `https://www.reduct.store/docs/sdk/js/${modulePath}`;
  const depth = modulePath.split("/").length;
  const apiBase = depth === 1 ? "./api" : `${"../".repeat(depth - 1)}api`;

  const grouped = {
    Class: [],
    Interface: [],
    Enumeration: [],
    "Type alias": [],
    Function: [],
  };

  for (const refl of reflections) {
    if (grouped[refl.kind]) {
      grouped[refl.kind].push(refl);
    }
  }

  const lines = [
    "---",
    `title: ${title}`,
    `description: API reference for the ${title} of the ReductStore Client SDK for JavaScript.`,
    "---",
    "<head>",
    `  <link rel=\"canonical\" href=\"${canonical}\" />`,
    "</head>",
    "",
    `# ${title}`,
    "",
  ];

  const sections = [
    ["Classes", grouped.Class, "classes"],
    ["Interfaces", grouped.Interface, "interfaces"],
    ["Enumerations", grouped.Enumeration, "enumerations"],
    ["Type Aliases", grouped["Type alias"], "type-aliases"],
    ["Functions", grouped.Function, "functions"],
  ];

  for (const [label, items, folder] of sections) {
    if (!items.length) {
      continue;
    }
    lines.push(`## ${label}`, "");
    for (const item of items) {
      const apiFile = path.join(apiDestination, folder, `${item.name}.md`);
      if (!fs.existsSync(apiFile)) {
        continue;
      }
      const apiRelDir = folder;
      let apiContent = fs.readFileSync(apiFile, "utf8");
      apiContent = stripFrontmatterAndHead(apiContent);
      apiContent = rewriteRelativeLinks(apiContent, apiRelDir, apiBase);
      apiContent = demoteHeadings(apiContent, 1);
      apiContent = unescapeHtmlInCode(apiContent);
      lines.push(apiContent.trim(), "");
    }
    lines.push("");
  }

  return lines.join("\n");
}

function addFrontmatter(content, filePath) {
  if (content.startsWith("---")) {
    return content;
  }

  const lines = content.split("\n");
  let title = "";
  for (const line of lines) {
    if (line.startsWith("# ")) {
      title = line.replace(/^#\s+/, "").trim();
      break;
    }
  }

  if (!title) {
    title = titleizeFromFilename(path.basename(filePath));
  }

  const normalizedTitle = normalizeTitle(title);
  const safeTitle = normalizedTitle.replace(/"/g, '\\"');
  const safeDescription = buildDescription(title).replace(/"/g, '\\"');
  return `---\ntitle: \"${safeTitle}\"\ndescription: \"${safeDescription}\"\n---\n\n${content}`;
}

function renameReadmes(rootDir) {
  const readmes = [];
  const stack = [rootDir];

  while (stack.length) {
    const dir = stack.pop();
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
        continue;
      }
      if (entry.isFile() && entry.name.toLowerCase() === "readme.md") {
        readmes.push(fullPath);
      }
    }
  }

  for (const readmePath of readmes) {
    const dir = path.dirname(readmePath);
    const targetPath = path.join(dir, "index.md");
    fs.renameSync(readmePath, targetPath);
  }

  const markdownFiles = [];
  const stack2 = [rootDir];
  while (stack2.length) {
    const dir = stack2.pop();
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        stack2.push(fullPath);
        continue;
      }
      if (entry.isFile() && entry.name.endsWith(".md")) {
        markdownFiles.push(fullPath);
      }
    }
  }

  for (const filePath of markdownFiles) {
    const content = fs.readFileSync(filePath, "utf8");
    const normalized = normalizeMarkdownLinks(
      content.replace(/README\\.md/g, "index.md"),
    );
    const transformed = transformDocContent(
      escapeMdxExpressions(normalized),
      filePath,
    );
    const updated = addFrontmatter(transformed, filePath);
    if (updated !== content) {
      fs.writeFileSync(filePath, updated);
    }
  }
}

export default async function (context, opts) {
  return {
    name: "docusaurus-plugin-js-sdk-gen",

    async loadContent() {
      // check CI_ENV and do not generate content if it is set to true
      if (
        process.env.CI_ENV ||
        process.env.NODE_ENV === "production" ||
        process.env.SKIP_JS_SDK_GEN === "true"
      ) {
        console.log("Skipping JS SDK generation");
        return null;
      }

      const tmpDir = path.join(os.tmpdir(), "build", "reduct-js");
      const destination = opts.destination;
      const apiDestination = path.join(destination, "api");

      console.log(
        `fetch source code from ${opts.sdkRepo}#${opts.sdkBranch} to ${tmpDir}`,
      );

      if (fs.existsSync(tmpDir)) {
        fs.rmSync(tmpDir, { recursive: true, force: true });
      }

      run(
        `git clone --depth 1 --branch ${opts.sdkBranch} ${opts.sdkRepo} ${tmpDir}`,
      );

      if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, { recursive: true });
      }

      if (fs.existsSync(apiDestination)) {
        fs.rmSync(apiDestination, { recursive: true, force: true });
      }

      const entryPoint = path.join(tmpDir, "src", "index.ts");
      const tsconfig = path.join(tmpDir, "tsconfig.json");

      run(
        [
          "npx typedoc",
          "--plugin typedoc-plugin-markdown",
          `--out ${apiDestination}`,
          `--entryPoints ${entryPoint}`,
          `--tsconfig ${tsconfig}`,
          "--readme none",
          "--hideGenerator",
          "--excludeExternals",
          "--skipErrorChecking",
        ].join(" "),
        { cwd: process.cwd() },
      );

      const jsonOutput = path.join(tmpDir, "typedoc.json");
      run(
        [
          "npx typedoc",
          `--json ${jsonOutput}`,
          `--entryPoints ${entryPoint}`,
          `--tsconfig ${tsconfig}`,
          "--readme none",
          "--hideGenerator",
          "--excludeExternals",
          "--skipErrorChecking",
        ].join(" "),
        { cwd: process.cwd() },
      );

      renameReadmes(apiDestination);

      // copy README.md to index.mdx
      const readme = fs.readFileSync(path.join(tmpDir, "README.md"), "utf8");
      fs.writeFileSync(
        path.join(destination, "index.mdx"),
        generateIndexDocument(normalizeMarkdownLinks(readme)),
      );

      if (fs.existsSync(jsonOutput)) {
        const typedoc = JSON.parse(fs.readFileSync(jsonOutput, "utf8"));
        const reflections = [];

        const visit = (node) => {
          if (!node) return;
          if (node.children) {
            for (const child of node.children) visit(child);
          }

          const kind = node.kind;
          const kindLabel = reflectionKindMap[kind];
          if (
            ![
              "Class",
              "Interface",
              "Enumeration",
              "Type alias",
              "Function",
            ].includes(kindLabel)
          ) {
            return;
          }

          const source = node.sources && node.sources[0];
          if (!source || !source.fileName) return;
          const fileName = source.fileName.replace(/^src[\\/]/, "");
          if (fileName.startsWith("http/") || fileName.startsWith("utils/")) {
            return;
          }

          reflections.push({
            name: node.name,
            kind: kindLabel,
            fileName,
            summary: getReflectionSummary(node.comment),
          });
        };

        visit(typedoc);

        const byModule = new Map();
        for (const refl of reflections) {
          const modulePath = modulePathFromFile(refl.fileName);
          if (!byModule.has(modulePath)) {
            byModule.set(modulePath, []);
          }
          byModule.get(modulePath).push(refl);
        }

        for (const [modulePath, items] of byModule.entries()) {
          const moduleName = titleizeFromFilename(path.basename(modulePath));
          const outputDir = path.join(destination, modulePath);
          fs.mkdirSync(outputDir, { recursive: true });
          const content = renderModulePage(
            moduleName,
            modulePath,
            items,
            apiDestination,
          );
          fs.writeFileSync(path.join(outputDir, "index.mdx"), content);
        }
      }
    },
  };
}
