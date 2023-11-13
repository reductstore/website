import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

interface ShareLinksProps {
  slug: string; // The slug for the blog post
}

const ShareLinks: React.FC<ShareLinksProps> = ({ slug }) => {
  const context = useDocusaurusContext();
  const { siteConfig } = context;
  const fullUrl = `${siteConfig.url}${siteConfig.baseUrl}${slug}`;

  // Define the URLs for sharing on different platforms
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      fullUrl
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      fullUrl
    )}`,
    // ... add more platforms as needed
  };

  return (
    <>
      <p>Share this post on:</p>
      <ul>
        <li>
          <a
            href={shareUrls.facebook}
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
        </li>
        <li>
          <a href={shareUrls.twitter} target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
        </li>
        {/* ... repeat for other platforms */}
      </ul>
    </>
  );
};

export default ShareLinks;
