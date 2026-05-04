import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "@docusaurus/router";
import { createRoot } from "react-dom/client";
import { usePluginData } from "@docusaurus/useGlobalData";

function getMarkdownUrl(routePath) {
  return routePath.endsWith("/") ? `${routePath}index.md` : `${routePath}.md`;
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
      {copied ? "Copied!" : "Copy page as Markdown"}
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
      articleHeader.prepend(container);
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
