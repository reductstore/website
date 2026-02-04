import BlogPostItem from "@theme-original/BlogPostItem";
import SocialShareBar from "@site/src/components/promotional/SocialShareBar";
import SlidingBanner from "@site/src/components/promotional/SlidingBanner";
// import BlogForm from "@site/src/components/forms/BlogForm";
import DiscourseComments from "./DiscourseComments";
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
  return (
    <>
      <BlogPostItem {...props} />
      {isSpecificBlogPost && (
        <>
          <SocialShareBar frontMatter={frontMatter} />
          {/* <BlogForm elementId="blog-form" frontMatter={frontMatter} /> */}
          <div className={styles.commentsContainer}>
            <div className={styles.discourseTitle}>
              Comments from the Community
            </div>
            <DiscourseComments
              embedUrl={`https://www.reduct.store${pagePath}`}
            />
          </div>
          <SlidingBanner />
        </>
      )}
    </>
  );
}
