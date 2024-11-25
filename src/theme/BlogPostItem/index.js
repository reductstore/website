import React, { useEffect } from "react";
import BlogPostItem from "@theme-original/BlogPostItem";
import SocialShareBar from "@site/src/components/promotional/SocialShareBar";
import SlidingBanner from "@site/src/components/promotional/SlidingBanner";
import BlogForm from "@site/src/components/forms/BlogForm";
import { useLocation } from "@docusaurus/router";
import styles from "./styles.module.css";

export default function BlogPostItemWrapper(props) {
  const { frontMatter } = props.children.type;

  const pagePath = useLocation().pathname;
  const pathSegments = pagePath.split("/").filter(Boolean);
  const isBlogHome = pagePath === "/blog" || pagePath === "/blog/";
  const isBlogPage = pathSegments[0] === "blog" && pathSegments[1] === "page";
  const isAuthorPage =
    pathSegments[0] === "blog" && pathSegments[1] === "authors";
  const isTagPage = pathSegments[0] === "blog" && pathSegments[1] === "tags";
  const isSpecificBlogPost =
    pathSegments[0] === "blog" &&
    !isBlogHome &&
    !isBlogPage &&
    !isAuthorPage &&
    !isTagPage;

  useEffect(() => {
    if (isSpecificBlogPost) {
      const discourseUsername = "system";
      const discourseUrl = "https://community.reduct.store/";
      const embedUrl = `https://www.reduct.store${pagePath}`;

      window.DiscourseEmbed = {
        discourseUrl,
        discourseEmbedUrl: embedUrl,
      };

      const meta = document.createElement("meta");
      meta.name = "discourse-username";
      meta.content = discourseUsername;
      document.head.appendChild(meta);

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = `${discourseUrl}javascripts/embed.js`;
      document.body.appendChild(script);
    }
  }, [isSpecificBlogPost, pagePath]);

  return (
    <>
      <BlogPostItem {...props} />
      {isSpecificBlogPost && (
        <>
          <SocialShareBar frontMatter={frontMatter} />
          <BlogForm elementId="subscribe-blog-form" frontMatter={frontMatter} />
          <div className={styles.commentsContainer}>
            <div className={styles.discourseTitle}>
              Comments from the Community
            </div>
            <div
              id="discourse-comments"
              className={styles.iframeContainer}
            ></div>
          </div>
          <SlidingBanner />
        </>
      )}
    </>
  );
}
