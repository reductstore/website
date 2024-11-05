import React from "react";
import BlogPostItem from "@theme-original/BlogPostItem";
import SocialShareBar from "@site/src/components/SocialShareBar";
import SlidingBanner from "@site/src/components/SlidingBanner";
import BlogForm from "@site/src/components/BlogForm";

export default function BlogPostItemWrapper(props) {
  const { frontMatter } = props.children.type;
  return (
    <>
      <BlogPostItem {...props} />
      <SocialShareBar frontMatter={frontMatter} />
      <BlogForm frontMatter={frontMatter} />
      <SlidingBanner />
    </>
  );
}
