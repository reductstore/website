import Link from "@docusaurus/Link";
import React from "react";
import { FaFacebookF, FaRedditAlien, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import styles from "./styles.module.css";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useLocation } from "@docusaurus/router";

interface SocialShareBarProps {
  frontMatter: {
    title: string;
  };
}

const joinUrlParts = (parts: string[]): string => {
  return parts
    .map((part) => part.replace(/(^\/|\/$)/g, ""))
    .filter((part) => part !== "")
    .join("/");
};

const SocialShareBar: React.FC<SocialShareBarProps> = ({ frontMatter }) => {
  const { siteConfig } = useDocusaurusContext();
  const location = useLocation();
  const { pathname } = location;
  const fullUrl = joinUrlParts([siteConfig.url, pathname]);
  const pageTitle = frontMatter.title;
  const iconSize = 20;

  return (
    <div className={styles.shareContainer}>
      <div className={styles.lineWithLabel}>Share</div>
      <div className={styles.shareIcons}>
        {/* LINKEDIN */}
        <Link
          href={`https://www.linkedin.com/sharing/share-offsite?url=${encodeURIComponent(fullUrl)}`}
          title="Share on LinkedIn"
          rel="nofollow"
          onClick={(e) => {
            e.preventDefault();
            window.open(
              e.currentTarget.href,
              "pop-up",
              "left=20,top=20,width=500,height=500,toolbar=1,resizable=0",
            );
          }}
        >
          <FaLinkedinIn size={iconSize} />
        </Link>

        {/* REDDIT */}
        <Link
          href={`https://www.reddit.com/submit?url=${encodeURIComponent(fullUrl)}`}
          title="Share on Reddit"
          rel="nofollow"
          onClick={(e) => {
            e.preventDefault();
            window.open(
              e.currentTarget.href,
              "pop-up",
              "left=20,top=20,width=900,height=500,toolbar=1,resizable=0",
            );
          }}
        >
          <FaRedditAlien size={iconSize} />
        </Link>

        {/* TWITTER */}
        <Link
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(pageTitle)}&url=${encodeURIComponent(fullUrl)}`}
          title="Share on Twitter"
          rel="nofollow"
          onClick={(e) => {
            e.preventDefault();
            window.open(
              e.currentTarget.href,
              "pop-up",
              "left=20,top=20,width=500,height=500,toolbar=1,resizable=0",
            );
          }}
        >
          <FaXTwitter size={iconSize} />
        </Link>

        {/* FACEBOOK */}
        <Link
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`}
          title="Share on Facebook"
          rel="nofollow"
          onClick={(e) => {
            e.preventDefault();
            window.open(
              e.currentTarget.href,
              "pop-up",
              "left=20,top=20,width=500,height=500,toolbar=1,resizable=0",
            );
          }}
        >
          <FaFacebookF />
        </Link>
      </div>
    </div>
  );
};

export default SocialShareBar;
