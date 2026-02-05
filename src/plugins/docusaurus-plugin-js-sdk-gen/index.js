const { execSync } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");

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

${body}

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
  return base
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (ch) => ch.toUpperCase());
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

  const safeTitle = title.replace(/"/g, '\\"');
  return `---\ntitle: \"${safeTitle}\"\n---\n\n${content}`;
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
    const updated = addFrontmatter(
      escapeMdxExpressions(normalized),
      filePath,
    );
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

      renameReadmes(apiDestination);

      // copy README.md to index.mdx
      const readme = fs.readFileSync(path.join(tmpDir, "README.md"), "utf8");
      fs.writeFileSync(
        path.join(destination, "index.mdx"),
        generateIndexDocument(normalizeMarkdownLinks(readme)),
      );
    },
  };
}
