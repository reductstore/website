import React from "react";
import BlogPostItem from "@theme-original/BlogPostItem";
import SocialShareBar from "@site/src/components/SocialShareBar";
import SlidingBanner from "@site/src/components/SlidingBanner";
import BlogForm from "@site/src/components/BlogForm";
import { useLocation } from "@docusaurus/router";

export default function BlogPostItemWrapper(props) {
  const { frontMatter } = props.children.type;

  const pagePath = useLocation().pathname;
  const isBlogHome = /^\/blog\/?$/.test(pagePath);
  const isBlogPage = /^\/blog\/page\/\d+/.test(pagePath);
  const isSpecificBlogPost = /^\/blog\/[^/]+\/[^/]+/.test(pagePath);

  const isBlogArticle = isSpecificBlogPost && !isBlogHome && !isBlogPage;
  return (
    <>
      <BlogPostItem {...props} />
      {isBlogArticle && (
        <>
          <SocialShareBar frontMatter={frontMatter} />
          <BlogForm frontMatter={frontMatter} />
          <SlidingBanner />
        </>
      )}
    </>
  );
}
