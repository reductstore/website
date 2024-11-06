import React from "react";
import BlogPostItem from "@theme-original/BlogPostItem";
import SocialShareBar from "@site/src/components/SocialShareBar";
import SlidingBanner from "@site/src/components/SlidingBanner";
import BlogForm from "@site/src/components/BlogForm";
import { useLocation } from "@docusaurus/router";

export default function BlogPostItemWrapper(props) {
  const { frontMatter } = props.children.type;

  const pagePath = useLocation().pathname;
  const pathSegments = pagePath.split("/").filter(Boolean);
  const isBlogHome = pagePath === "/blog" || pagePath === "/blog/";
  const isBlogPage = pathSegments[0] === "blog" && pathSegments[1] === "page";
  const isSpecificBlogPost =
    pathSegments[0] === "blog" && !isBlogHome && !isBlogPage;
  return (
    <>
      <BlogPostItem {...props} />
      {isSpecificBlogPost && (
        <>
          <SocialShareBar frontMatter={frontMatter} />
          <BlogForm frontMatter={frontMatter} />
          <SlidingBanner />
        </>
      )}
    </>
  );
}
