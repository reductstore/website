import React, { useEffect, useRef } from "react";
import { useLocation } from "@docusaurus/router";
import { createRoot } from "react-dom/client";
import { usePluginData } from "@docusaurus/useGlobalData";
import MarkdownActionsDropdown from "docusaurus-markdown-source-plugin/components/MarkdownActionsDropdown";

export default function Root({ children }) {
  const { pathname } = useLocation();
  const { docsPath = "/docs/" } = usePluginData("markdown-source-plugin") || {};
  const dropdownRootRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const isDocsPage =
      docsPath === "/" ||
      pathname.startsWith(docsPath) ||
      pathname === docsPath.slice(0, -1);

    if (!isDocsPage) return;

    const cleanup = () => {
      if (dropdownRootRef.current) {
        dropdownRootRef.current.unmount();
        dropdownRootRef.current = null;
      }
      if (containerRef.current) {
        containerRef.current.remove();
        containerRef.current = null;
      }
    };

    const injectDropdown = () => {
      const articleHeader = document.querySelector("article .markdown header");
      if (!articleHeader) return false;
      if (articleHeader.querySelector(".markdown-actions-container"))
        return true;

      if (dropdownRootRef.current) {
        dropdownRootRef.current.unmount();
        dropdownRootRef.current = null;
      }

      const container = document.createElement("div");
      container.className = "markdown-actions-container";
      articleHeader.appendChild(container);
      containerRef.current = container;

      const root = createRoot(container);
      root.render(<MarkdownActionsDropdown />);
      dropdownRootRef.current = root;

      return true;
    };

    injectDropdown();

    const observer = new MutationObserver(() => {
      const header = document.querySelector("article .markdown header");
      if (header && !header.querySelector(".markdown-actions-container")) {
        injectDropdown();
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
