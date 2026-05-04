import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "@docusaurus/router";
import { createRoot } from "react-dom/client";
import { usePluginData } from "@docusaurus/useGlobalData";

function getMarkdownUrl(routePath) {
  return routePath.endsWith("/") ? `${routePath}index.md` : `${routePath}.md`;
}

function stripFrontMatterAndCanonical(markdown) {
  let clean = markdown;

  clean = clean.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "");
  clean = clean.replace(/^\s*canonical:\s*.*$/gim, "");
  clean = clean.replace(/<link[^>]*rel=["']canonical["'][^>]*>/gim, "");
  clean = clean.replace(/\n{3,}/g, "\n\n");

  return clean.trimStart();
}

function getRenderedCodeBlocks() {
  if (typeof document === "undefined") return [];

  const blocks = Array.from(
    document.querySelectorAll("article .markdown pre code"),
  );

  return blocks
    .map((el) => {
      const className = el.className || "";
      const match = className.match(/language-([\w-]+)/);
      const language = match ? match[1] : "text";
      const code = (el.textContent || "").replace(/\n+$/, "");

      if (!code.trim()) return null;

      return { language, code };
    })
    .filter(Boolean);
}

function appendMissingCodeBlocks(markdown) {
  const renderedBlocks = getRenderedCodeBlocks();
  if (renderedBlocks.length === 0) return markdown;

  const missing = renderedBlocks.filter(({ code }) => !markdown.includes(code));
  if (missing.length === 0) return markdown;

  const addition = missing
    .map(({ language, code }, index) => {
      const title = `Code snippet ${index + 1}`;
      return `### ${title}\n\n\`\`\`${language}\n${code}\n\`\`\``;
    })
    .join("\n\n");

  return `${markdown.trimEnd()}\n\n---\n\n${addition}`;
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
      const markdownUrl = getMarkdownUrl(window.location.pathname);
      const response = await fetch(markdownUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch markdown");
      }

      const markdown = await response.text();
      const cleanedMarkdown = stripFrontMatterAndCanonical(markdown);
      const finalMarkdown = appendMissingCodeBlocks(cleanedMarkdown);
      await navigator.clipboard.writeText(finalMarkdown);

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
  const { docsPath = "/docs/" } = usePluginData("markdown-source-plugin") || {};
  const buttonRootRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const isDocsPage =
      docsPath === "/" ||
      pathname.startsWith(docsPath) ||
      pathname === docsPath.slice(0, -1);

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
  }, [pathname, docsPath]);

  return <>{children}</>;
}
