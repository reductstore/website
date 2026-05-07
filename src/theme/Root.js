import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "@docusaurus/router";
import { createRoot } from "react-dom/client";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";

function extractCodeText(codeEl) {
  if (!codeEl) return "";

  const tokenLines = Array.from(codeEl.querySelectorAll(".token-line"));
  if (tokenLines.length > 0) {
    return tokenLines
      .map((line) => (line.textContent || "").replace(/\u200B/g, ""))
      .join("\n")
      .replace(/\n+$/, "");
  }

  return (codeEl.textContent || "").replace(/\n+$/, "");
}

function absolutizeLinks(rootEl) {
  rootEl.querySelectorAll("a[href]").forEach((a) => {
    const href = a.getAttribute("href");
    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:")
    ) {
      return;
    }

    try {
      a.setAttribute("href", new URL(href, window.location.href).href);
    } catch {
      // keep original href
    }
  });

  rootEl.querySelectorAll("img[src]").forEach((img) => {
    const src = img.getAttribute("src");
    if (!src || src.startsWith("data:")) return;

    try {
      img.setAttribute("src", new URL(src, window.location.href).href);
    } catch {
      // keep original src
    }
  });
}

function buildMarkdownFromRenderedPage() {
  const article = document.querySelector("article .markdown");
  if (!article) return "";

  const clone = article.cloneNode(true);

  const header = clone.querySelector("header");
  const pageTitle = header?.querySelector("h1")?.textContent?.trim() || "";
  header?.remove();

  clone
    .querySelectorAll(".markdown-copy-container")
    .forEach((el) => el.remove());
  clone.querySelectorAll(".hash-link").forEach((el) => el.remove());

  clone.querySelectorAll("[hidden], [aria-hidden='true']").forEach((el) => {
    if (el.getAttribute("role") === "tabpanel") {
      el.removeAttribute("hidden");
      el.removeAttribute("aria-hidden");
      return;
    }
    el.remove();
  });

  // Preserve all code languages in tab panels by expanding them with labels.
  clone.querySelectorAll("[role='tabpanel']").forEach((panel) => {
    const labelId = panel.getAttribute("aria-labelledby");
    const label = labelId ? clone.ownerDocument.getElementById(labelId) : null;
    const text = label?.textContent?.trim();
    if (text) {
      const labelLine = clone.ownerDocument.createElement("p");
      const strong = clone.ownerDocument.createElement("strong");
      strong.textContent = `${text}:`;
      labelLine.appendChild(strong);
      panel.prepend(labelLine);
    }
  });

  // Remove tab controls from output after panel expansion.
  clone
    .querySelectorAll("[role='tablist'], [role='tab']")
    .forEach((el) => el.remove());

  // Filter obvious promo/cta blocks while keeping docs content.
  clone
    .querySelectorAll(
      "[class*='promo'], [class*='cta'], [class*='banner'], [data-copy-exclude='true']",
    )
    .forEach((el) => el.remove());

  absolutizeLinks(clone);

  const turndown = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    bulletListMarker: "-",
  });
  turndown.use(gfm);

  turndown.addRule("codeBlocksWithLanguage", {
    filter: (node) => node.nodeName === "PRE",
    replacement: (_content, node) => {
      const pre = node;
      const codeEl = pre.querySelector("code");
      const className = `${codeEl?.className || ""} ${pre.className || ""}`;
      const match = className.match(/language-([\w-]+)/);
      const language = match ? match[1] : "";
      const code = extractCodeText(codeEl);

      if (!code.trim()) return "\n\n";
      return `\n\n\`\`\`${language}\n${code}\n\`\`\`\n\n`;
    },
  });

  turndown.addRule("removeHeadArtifacts", {
    filter: (node) => node.nodeName === "HEAD",
    replacement: () => "",
  });

  const bodyMarkdown = turndown.turndown(clone.innerHTML).trim();
  if (!pageTitle) return bodyMarkdown;
  if (bodyMarkdown.startsWith("# ")) return bodyMarkdown;
  return `# ${pageTitle}\n\n${bodyMarkdown}`;
}

function CopyMarkdownButton() {
  const [copied, setCopied] = useState(false);
  const resetTimerRef = useRef(null);

  useEffect(
    () => () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
        resetTimerRef.current = null;
      }
    },
    [],
  );

  const handleCopyMarkdown = async () => {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }

    try {
      const markdown = buildMarkdownFromRenderedPage();
      if (!markdown) {
        throw new Error("Failed to build markdown from page");
      }

      await navigator.clipboard.writeText(markdown);

      setCopied(true);
      resetTimerRef.current = setTimeout(() => {
        setCopied(false);
        resetTimerRef.current = null;
      }, 2000);
    } catch (error) {
      console.error("Failed to copy markdown:", error);
      alert("Failed to copy markdown. Please try again.");
    }
  };

  return (
    <button
      className="button button--outline button--secondary button--sm markdown-copy-button"
      onClick={handleCopyMarkdown}
    >
      {copied ? (
        <>
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            aria-hidden="true"
            style={{ marginRight: "0.4rem" }}
          >
            <path
              fill="currentColor"
              d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 111.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
            />
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            aria-hidden="true"
            style={{ marginRight: "0.4rem" }}
          >
            <path
              fill="currentColor"
              d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"
            />
            <path
              fill="currentColor"
              d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"
            />
          </svg>
          Copy page
        </>
      )}
    </button>
  );
}

export default function Root({ children }) {
  const { pathname } = useLocation();
  const buttonRootRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const isDocsPage = pathname.startsWith("/docs");

    if (!isDocsPage) return;

    const cleanup = () => {
      if (buttonRootRef.current) {
        buttonRootRef.current.unmount();
        buttonRootRef.current = null;
      }
      if (containerRef.current) {
        containerRef.current.remove();
        containerRef.current = null;
      }
    };

    const injectButton = () => {
      const articleHeader = document.querySelector("article .markdown header");
      if (!articleHeader) return false;
      if (articleHeader.querySelector(".markdown-copy-container")) return true;

      if (buttonRootRef.current) {
        buttonRootRef.current.unmount();
        buttonRootRef.current = null;
      }

      const container = document.createElement("div");
      container.className = "markdown-copy-container";
      articleHeader.appendChild(container);
      containerRef.current = container;

      const root = createRoot(container);
      root.render(<CopyMarkdownButton />);
      buttonRootRef.current = root;

      return true;
    };

    injectButton();

    const observer = new MutationObserver(() => {
      const header = document.querySelector("article .markdown header");
      if (header && !header.querySelector(".markdown-copy-container")) {
        injectButton();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      cleanup();
    };
  }, [pathname]);

  return <>{children}</>;
}
