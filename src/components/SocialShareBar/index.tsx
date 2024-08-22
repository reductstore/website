import Link from "@docusaurus/Link";
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
  FaTumblr,
  FaRedditAlien,
  FaLinkedinIn,
  FaEnvelope,
} from "react-icons/fa";
import styles from "./styles.module.css";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useLocation } from "@docusaurus/router";

interface SocialShareBarProps {
  frontMatter: {
    author: string;
    date: Date;
    description: string;
    slug: string;
    tags: string[];
    title: string;
  };
  mt?: number;
  mb?: number;
}

const joinUrlParts = (parts: string[]): string => {
  return parts
    .map((part) => part.replace(/(^\/|\/$)/g, ""))
    .filter((part) => part !== "")
    .join("/");
};

const SocialShareBar: React.FC<SocialShareBarProps> = ({
  frontMatter,
  mt,
  mb,
}) => {
  const { siteConfig } = useDocusaurusContext();
  const location = useLocation();
  const { pathname } = location;
  const fullUrl = joinUrlParts([siteConfig.url, pathname]);
  const blogUrl = joinUrlParts([siteConfig.url, siteConfig.baseUrl, "blog"]);
  const pageTitle = frontMatter.title;

  if (fullUrl === blogUrl) return null;

  const marginStyles = {
    marginTop: mt ? `${mt}rem` : undefined,
    marginBottom: mb ? `${mb}rem` : undefined,
  };
  return (
    <div style={marginStyles}>
      <span className={styles.shareText}>Share</span>
      <div className={styles.shareBar}>
        <Link
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`}
          className={styles.shareButton}
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
        <Link
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(pageTitle)}&url=${encodeURIComponent(fullUrl)}`}
          className={styles.shareButton}
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
          <FaTwitter />
        </Link>
        <Link
          href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(fullUrl)}`}
          className={styles.shareButton}
          title="Share on Pinterest"
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
          <FaPinterestP />
        </Link>
        <Link
          href={`https://www.tumblr.com/share/link?url=${encodeURIComponent(fullUrl)}`}
          className={styles.shareButton}
          title="Share on Tumblr"
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
          <FaTumblr />
        </Link>
        <Link
          href={`https://www.reddit.com/submit?url=${encodeURIComponent(fullUrl)}`}
          className={styles.shareButton}
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
          <FaRedditAlien />
        </Link>
        <Link
          href={`https://www.linkedin.com/sharing/share-offsite?url=${encodeURIComponent(fullUrl)}`}
          className={styles.shareButton}
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
          <FaLinkedinIn />
        </Link>
        <Link
          rel="nofollow"
          href={`mailto:?subject=${encodeURIComponent(pageTitle)}&body=Check out this site ${encodeURIComponent(fullUrl)}`}
          className={styles.shareButton}
          title="Share via Email"
        >
          <FaEnvelope />
        </Link>
      </div>
    </div>
  );
};

export default SocialShareBar;
