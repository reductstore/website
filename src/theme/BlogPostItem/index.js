import React from "react";
import BlogPostItem from "@theme-original/BlogPostItem";
import SocialShareBar from "@site/src/components/SocialShareBar";
import SlidingBanner from "@site/src/components/SlidingBanner";

export default function BlogPostItemWrapper(props) {
  const { frontMatter } = props.children.type;
  return (
    <>
      <SocialShareBar frontMatter={frontMatter} />
      <BlogPostItem {...props} />
      <SlidingBanner />
    </>
  );
}
