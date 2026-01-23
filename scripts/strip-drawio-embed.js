const fs = require("fs");
const path = require("path");

const ROOTS = ["docs", "versioned_docs", "static"];
const SVG_EXT = ".svg";
const DRAWIO_ATTR = /\scontent="[^"]*mxfile[^"]*"/;

function walk(dir, out) {
  if (!fs.existsSync(dir)) {
    return;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, out);
      continue;
    }
    if (entry.isFile() && path.extname(entry.name).toLowerCase() === SVG_EXT) {
      out.push(fullPath);
    }
  }
}

function stripDrawioAttribute(filePath) {
  const source = fs.readFileSync(filePath, "utf8");
  if (!DRAWIO_ATTR.test(source)) {
    return false;
  }
  const next = source.replace(DRAWIO_ATTR, "");
  if (next === source) {
    return false;
  }
  fs.writeFileSync(filePath, next);
  return true;
}

const svgFiles = [];
for (const root of ROOTS) {
  walk(path.join(process.cwd(), root), svgFiles);
}

for (const svgFile of svgFiles) {
  if (stripDrawioAttribute(svgFile)) {
    process.stdout.write(`Stripped draw.io content attribute: ${svgFile}\n`);
  }
}
