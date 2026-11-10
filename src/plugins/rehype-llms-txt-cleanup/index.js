const classesOf = (node) =>
  node.type === "element" ? node.properties?.className || [] : [];

const hasClass = (node, prefix) =>
  classesOf(node).some((name) => String(name).startsWith(prefix));

const element = (tagName, children, className) => ({
  type: "element",
  tagName,
  properties: className ? { className } : {},
  children,
});

const text = (value) => ({ type: "text", value });

const textOf = (node) => {
  if (node.type === "text") return node.value;
  if (node.type !== "element") return "";
  if (node.tagName === "br") return "\n";
  return node.children.map(textOf).join("");
};

const findAll = (node, predicate, found = []) => {
  if (node.type !== "element" && node.type !== "root") return found;
  for (const child of node.children) {
    if (predicate(child)) found.push(child);
    else findAll(child, predicate, found);
  }
  return found;
};

const codeBlock = (pre) => {
  const language = classesOf(pre).find((name) =>
    String(name).startsWith("language-"),
  );
  const lines = findAll(pre, (node) => hasClass(node, "token-line"));
  const source = lines.length
    ? lines.map((line) => textOf(line).replace(/\n$/, "")).join("\n")
    : textOf(pre);
  return {
    ...pre,
    children: [
      element("code", [text(source)], language ? [language] : undefined),
    ],
  };
};

const tabs = (container) => {
  const labels = findAll(
    container,
    (node) => node.type === "element" && node.properties?.role === "tab",
  ).map((tab) => textOf(tab).trim());
  const panels = findAll(
    container,
    (node) => node.type === "element" && node.properties?.role === "tabpanel",
  );
  return element(
    "div",
    panels.flatMap((panel, index) => [
      element("p", [element("strong", [text(labels[index] ?? "")])]),
      ...panel.children,
    ]),
  );
};

const admonition = (node) => {
  const heading = node.children.find((child) =>
    hasClass(child, "admonitionHeading"),
  );
  const content = node.children.find((child) =>
    hasClass(child, "admonitionContent"),
  );
  const title = heading ? textOf(heading).trim() : "";
  return element("blockquote", [
    element("p", [
      element("strong", [text(title.charAt(0).toUpperCase() + title.slice(1))]),
    ]),
    ...(content ? content.children : []),
  ]);
};

const absoluteImage = (node, siteUrl) => {
  const src = node.properties?.src;
  if (typeof src !== "string" || !src.startsWith("/") || src.startsWith("//"))
    return node;
  return { ...node, properties: { ...node.properties, src: siteUrl + src } };
};

const transform = (node, siteUrl) => {
  if (node.type !== "element" && node.type !== "root") return node;
  if (node.tagName === "img") return absoluteImage(node, siteUrl);
  let current = node;
  if (hasClass(current, "tabs-container")) current = tabs(current);
  else if (hasClass(current, "theme-admonition")) current = admonition(current);
  else if (current.tagName === "pre" && hasClass(current, "prism-code"))
    return codeBlock(current);
  return {
    ...current,
    children: current.children
      .filter(
        (child) =>
          child.type !== "comment" &&
          !(
            child.type === "element" &&
            child.tagName === "a" &&
            hasClass(child, "hash-link")
          ),
      )
      .map((child) => transform(child, siteUrl)),
  };
};

export default function rehypeLlmsTxtCleanup({ siteUrl = "" } = {}) {
  return (tree) => transform(tree, siteUrl.replace(/\/$/, ""));
}
