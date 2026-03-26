const { execFileSync, execSync } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");

function run(cmd, opts = {}) {
  execSync(cmd, { stdio: "inherit", ...opts });
}

function titleCase(value) {
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function escapeFrontmatter(value) {
  return value.replace(/"/g, '\\"');
}

function escapeMdxText(value) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\*/g, "\\*")
    .replace(/_/g, "\\_")
    .replace(/\[/g, "\\[")
    .replace(/\]/g, "\\]")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/{/g, "&#123;")
    .replace(/}/g, "&#125;");
}

function normalizeHelpText(helpText) {
  return helpText.replace(/\r\n/g, "\n").trim();
}

function getSectionLines(helpText, sectionName) {
  const lines = normalizeHelpText(helpText).split("\n");
  const start = lines.findIndex((line) => line.trim() === `${sectionName}:`);

  if (start === -1) {
    return [];
  }

  const sectionLines = [];
  for (let i = start + 1; i < lines.length; i += 1) {
    const line = lines[i];
    if (line.trim() === "") {
      break;
    }
    sectionLines.push(line);
  }

  return sectionLines;
}

function parseEntries(lines) {
  const entries = [];
  let current = null;

  for (const line of lines) {
    const match = line.match(/^\s{2,}(\S.*?)\s{2,}(.+)$/);
    if (match) {
      current = {
        label: match[1].trim(),
        description: match[2].trim(),
      };
      entries.push(current);
      continue;
    }

    if (current && line.trim() !== "") {
      current.description = `${current.description} ${line.trim()}`;
    }
  }

  return entries;
}

function parseHelp(helpText) {
  const normalized = normalizeHelpText(helpText);
  const lines = normalized.split("\n");
  const about = lines[0]?.trim() ?? "";
  const usageLines = getSectionLines(normalized, "Usage");

  return {
    about,
    usage: usageLines.join("\n").trim(),
    commands: parseEntries(getSectionLines(normalized, "Commands")).filter(
      (entry) => entry.label !== "help",
    ),
    arguments: parseEntries(getSectionLines(normalized, "Arguments")),
    options: parseEntries(getSectionLines(normalized, "Options")),
    raw: normalized,
  };
}

function getBinaryHelp(binaryPath, commandPath = []) {
  return execFileSync(binaryPath, [...commandPath, "--help"], {
    encoding: "utf8",
  });
}

function buildTree(binaryPath, commandPath = []) {
  const helpText = getBinaryHelp(binaryPath, commandPath);
  const parsed = parseHelp(helpText);

  return {
    name: commandPath[commandPath.length - 1] ?? "reduct-cli",
    commandPath,
    parsed,
    children: parsed.commands.map((entry) =>
      buildTree(binaryPath, [...commandPath, entry.label]),
    ),
  };
}

function getDocDir(destination, commandPath) {
  return path.join(destination, ...commandPath);
}

function getCanonical(commandPath) {
  const suffix = commandPath.length === 0 ? "" : `/${commandPath.join("/")}`;
  return `https://www.reduct.store/docs/cli${suffix}`;
}

function getPageTitle(node) {
  if (node.commandPath.length === 0) {
    return "Reduct CLI";
  }

  return node.name;
}

function getHeading(node) {
  if (node.commandPath.length === 0) {
    return "ReductStore CLI";
  }

  return `reduct-cli ${node.commandPath.join(" ")}`;
}

function renderEntryList(title, entries, headingLevel = "##") {
  if (entries.length === 0) {
    return "";
  }

  const items = entries
    .map((entry) => `- \`${entry.label}\`: ${escapeMdxText(entry.description)}`)
    .join("\n");

  return `${headingLevel} ${title}\n\n${items}\n`;
}

function renderSourceLinks(downloadUrl, repoUrl) {
  return [
    `- **[Download release binary](${downloadUrl})**`,
    `- **[Source code](${repoUrl})**`,
  ].join("\n");
}

function getReadmeContent(readmePath) {
  const content = fs.readFileSync(readmePath, "utf8").replace(/\r\n/g, "\n");
  const lines = content.split("\n");

  if (lines[0]?.startsWith("# ")) {
    lines.shift();
  }

  while (lines[0]?.trim() === "") {
    lines.shift();
  }

  return lines.join("\n").trim();
}

function renderUsage(parsed, level = "##") {
  if (!parsed.usage) {
    return "";
  }

  return `${level} Usage\n\n\`\`\`text\n${parsed.usage}\n\`\`\``;
}

function renderParsedSections(parsed, headingLevel = "##") {
  const sections = [];

  const usageSection = renderUsage(parsed, headingLevel);
  if (usageSection) {
    sections.push(usageSection);
  }

  const argumentsSection = renderEntryList(
    "Arguments",
    parsed.arguments,
    headingLevel,
  );
  if (argumentsSection) {
    sections.push(argumentsSection.trimEnd());
  }

  const optionsSection = renderEntryList(
    "Options",
    parsed.options,
    headingLevel,
  );
  if (optionsSection) {
    sections.push(optionsSection.trimEnd());
  }

  sections.push(
    `${headingLevel} Help Output\n\n\`\`\`text\n${parsed.raw}\n\`\`\``,
  );

  return sections;
}

function renderSubcommands(node) {
  if (node.children.length === 0) {
    return "";
  }

  const sections = ["## Subcommands"];

  for (const child of node.children) {
    sections.push(`### \`${child.name}\``);

    if (child.parsed.about) {
      sections.push(escapeMdxText(child.parsed.about));
    }

    sections.push(...renderParsedSections(child.parsed, "####"));
  }

  return sections.join("\n\n");
}

function renderDoc(node, opts) {
  const title = getPageTitle(node);
  const description = node.parsed.about || `Documentation for ${title}.`;
  const sections = [];

  if (node.commandPath.length === 0) {
    sections.push(getReadmeContent(opts.readmePath));
  } else if (node.parsed.about) {
    sections.push(escapeMdxText(node.parsed.about));
  }

  if (node.commandPath.length === 0 && node.children.length > 0) {
    sections.push(
      "import DocCardList from '@theme/DocCardList';\n\n## Commands\n\n<DocCardList />",
    );
  }

  if (node.commandPath.length === 1) {
    sections.push(...renderParsedSections(node.parsed));
  }

  if (node.commandPath.length === 1) {
    const subcommands = renderSubcommands(node);
    if (subcommands) {
      sections.push(subcommands);
    }
  }

  const frontmatterLines = ["---"];
  if (node.commandPath.length === 0) {
    frontmatterLines.push("sidebar_position: 0");
  } else {
    frontmatterLines.push(`title: "${escapeFrontmatter(title)}"`);
    frontmatterLines.push(`description: "${escapeFrontmatter(description)}"`);
  }
  frontmatterLines.push("---", "");

  return `${frontmatterLines.join("\n")}
<head>
  <link rel="canonical" href="${getCanonical(node.commandPath)}" />
</head>

# ${getHeading(node)}

${sections.join("\n\n")}
`;
}

function writeDocs(node, destination, opts) {
  const dir = getDocDir(destination, node.commandPath);
  const target = path.join(dir, "index.mdx");

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(target, renderDoc(node, opts));

  if (node.commandPath.length === 0) {
    for (const child of node.children) {
      writeDocs(child, destination, opts);
    }
  }
}

export default async function createPlugin(context, opts) {
  return {
    name: "docusaurus-plugin-cli-docs-gen",

    async loadContent() {
      const tmpDir = path.join(os.tmpdir(), "build", "reduct-cli");
      const archivePath = path.join(tmpDir, "reduct-cli.tar.gz");
      const repoDir = path.join(tmpDir, "repo");
      const binaryPath = path.join(
        tmpDir,
        opts.binaryPathInArchive || "reduct-cli",
      );
      const destination = path.join(process.cwd(), opts.destination);
      const readmePath = path.join(repoDir, "README.md");

      fs.rmSync(tmpDir, { recursive: true, force: true });
      fs.rmSync(destination, { recursive: true, force: true });
      fs.mkdirSync(tmpDir, { recursive: true });

      console.log(
        `download released reduct-cli binary from ${opts.downloadUrl}`,
      );
      run(`wget -O ${archivePath} ${opts.downloadUrl}`);
      run(`tar -xzf ${archivePath} -C ${tmpDir}`);
      fs.chmodSync(binaryPath, 0o755);
      console.log(`fetch README from ${opts.repo}#${opts.branch}`);
      run(
        `git clone --depth 1 --branch ${opts.branch} ${opts.repo} ${repoDir}`,
      );

      const tree = buildTree(binaryPath);
      writeDocs(tree, destination, { ...opts, readmePath });
    },
  };
}
