const { execSync } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");

function run(cmd, opts = {}) {
  execSync(cmd, { stdio: "inherit", ...opts });
}

function toTitleCase(value) {
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getDocPathFromReadme(readmePath) {
  const normalized = readmePath.replace(/\\/g, "/");
  if (normalized === "README.md") {
    return "index";
  }

  const segments = normalized.split("/");
  segments.pop();

  if (segments[0] === "src") {
    segments.shift();
  }

  return `${segments.join("/")}/index`;
}

function toLinkTarget(docPath) {
  return `${docPath}.mdx`;
}

function toRelativeDocLink(fromReadmePath, toReadmePath) {
  const fromDocPath = getDocPathFromReadme(fromReadmePath);
  const toDocPath = getDocPathFromReadme(toReadmePath);
  const fromDir = path.posix.dirname(fromDocPath);
  const toTarget = toLinkTarget(toDocPath);

  let relative = path.posix.relative(fromDir, toTarget);
  if (!relative || (!relative.startsWith(".") && !relative.startsWith("/"))) {
    relative = `./${relative}`;
  }

  return relative;
}

function buildGithubBlobUrl(repoUrl, branch, relativePath) {
  const repoBase = repoUrl.replace(/\.git$/, "");
  const normalized = relativePath.replace(/\\/g, "/");
  return `${repoBase}/blob/${branch}/${normalized}`;
}

function normalizeRepoRelativePath(href, repoUrl) {
  const trimmed = href.trim();
  if (!trimmed.startsWith("/")) {
    return trimmed;
  }

  const repoName = repoUrl
    .replace(/\.git$/, "")
    .split("/")
    .pop();
  const marker = `/${repoName}/`;
  const markerIndex = trimmed.indexOf(marker);
  if (markerIndex === -1) {
    return trimmed;
  }

  return trimmed.slice(markerIndex + marker.length);
}

function rewriteRelativeLinks(content, currentReadmePath, repoUrl, branch) {
  return content.replace(
    /(!?\[[^\]]*]\()([^)]+)(\))/g,
    (match, prefix, href, suffix) => {
      const trimmed = normalizeRepoRelativePath(href, repoUrl);

      if (
        trimmed.startsWith("http://") ||
        trimmed.startsWith("https://") ||
        trimmed.startsWith("#") ||
        trimmed.startsWith("mailto:")
      ) {
        return match;
      }

      const normalized = path.posix.normalize(trimmed);
      if (path.posix.basename(normalized).toLowerCase() === "readme.md") {
        return `${prefix}${toRelativeDocLink(currentReadmePath, normalized)}${suffix}`;
      }

      return `${prefix}${buildGithubBlobUrl(repoUrl, branch, normalized)}${suffix}`;
    },
  );
}

function boldMarkdownLinks(content) {
  return content.replace(
    /(?<!\*)\[([^\]]+)\]\(([^)]+)\)(?!\*)/g,
    (match, text, href) => {
      if (text.startsWith("!")) {
        return match;
      }

      return `**[${text}](${href})**`;
    },
  );
}

function buildTitle(relativePath, heading) {
  if (relativePath === "README.md") {
    return "ReductBridge";
  }

  if (heading) {
    return heading.replace(/^#\s+/, "").trim();
  }

  const parts = relativePath.replace(/\\/g, "/").split("/");
  parts.pop();
  return parts.map(toTitleCase).join(" ");
}

function buildDescription(title, relativePath) {
  if (relativePath === "README.md") {
    return "Documentation for ReductBridge, the data bridge between live robotics and IIoT systems and ReductStore.";
  }

  return `Documentation for ${title} in ReductBridge.`;
}

function addFrontmatter(content, relativePath) {
  const lines = content.split("\n");
  const firstHeading = lines.find((line) => line.startsWith("# "));
  const title = buildTitle(relativePath, firstHeading);
  const description = buildDescription(title, relativePath).replace(
    /"/g,
    '\\"',
  );
  const safeTitle = title.replace(/"/g, '\\"');

  const frontmatter = [
    "---",
    `title: "${safeTitle}"`,
    `description: "${description}"`,
    "---",
    "",
  ];

  if (relativePath === "README.md") {
    frontmatter.splice(1, 0, "sidebar_position: 0");
  }

  return `${frontmatter.join("\n")}${content}`;
}

function collectReadmes(rootDir) {
  const readmes = [];
  const stack = [""];

  while (stack.length) {
    const relativeDir = stack.pop();
    const absDir = path.join(rootDir, relativeDir);

    for (const entry of fs.readdirSync(absDir, { withFileTypes: true })) {
      if (entry.name.startsWith(".")) {
        continue;
      }

      const relativePath = path.posix.join(relativeDir, entry.name);
      if (entry.isDirectory()) {
        stack.push(relativePath);
        continue;
      }

      if (entry.isFile() && entry.name.toLowerCase() === "readme.md") {
        readmes.push(relativePath);
      }
    }
  }

  return readmes.sort();
}

function listFiles(dir) {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const files = [];
  const stack = [""];

  while (stack.length) {
    const relativeDir = stack.pop();
    const absoluteDir = path.join(dir, relativeDir);

    for (const entry of fs.readdirSync(absoluteDir, { withFileTypes: true })) {
      const relativePath = path.join(relativeDir, entry.name);
      if (entry.isDirectory()) {
        stack.push(relativePath);
        continue;
      }

      if (entry.isFile()) {
        files.push(relativePath);
      }
    }
  }

  return files.sort();
}

function syncGeneratedDocs(source, destination) {
  const sourceFiles = new Set(listFiles(source));

  for (const relativePath of sourceFiles) {
    const sourcePath = path.join(source, relativePath);
    const destinationPath = path.join(destination, relativePath);
    const generated = fs.readFileSync(sourcePath, "utf8");
    const existing = fs.existsSync(destinationPath)
      ? fs.readFileSync(destinationPath, "utf8")
      : null;

    if (existing === generated) {
      continue;
    }

    fs.mkdirSync(path.dirname(destinationPath), { recursive: true });
    fs.writeFileSync(destinationPath, generated);
  }

  for (const relativePath of listFiles(destination)) {
    if (sourceFiles.has(relativePath)) {
      continue;
    }

    fs.rmSync(path.join(destination, relativePath), { force: true });
  }
}

function writeDocs(rootDir, destination, repoUrl, branch) {
  const readmes = collectReadmes(rootDir);

  for (const relativeReadmePath of readmes) {
    const sourcePath = path.join(rootDir, relativeReadmePath);
    const targetPath = path.join(
      destination,
      `${getDocPathFromReadme(relativeReadmePath)}.mdx`,
    );

    let content = fs.readFileSync(sourcePath, "utf8");
    content = rewriteRelativeLinks(
      content,
      relativeReadmePath,
      repoUrl,
      branch,
    );
    content = boldMarkdownLinks(content);
    content = addFrontmatter(content, relativeReadmePath);

    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.writeFileSync(targetPath, content);
  }
}

export default async function createPlugin(context, opts) {
  return {
    name: "docusaurus-plugin-reduct-bridge-docs",

    async loadContent() {
      const tmpDir = path.join(os.tmpdir(), "build", "reduct-bridge");
      const destination = path.join(process.cwd(), opts.destination);
      const generatedDestination = path.join(tmpDir, "generated-docs");

      fs.rmSync(tmpDir, { recursive: true, force: true });
      fs.mkdirSync(path.dirname(tmpDir), { recursive: true });

      console.log(
        `fetch source code from ${opts.repo}#${opts.branch} to ${tmpDir}`,
      );
      run(`git clone --depth 1 --branch ${opts.branch} ${opts.repo} ${tmpDir}`);

      writeDocs(tmpDir, generatedDestination, opts.repo, opts.branch);
      syncGeneratedDocs(generatedDestination, destination);
    },
  };
}
