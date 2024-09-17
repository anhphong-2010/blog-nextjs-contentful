import ContentfulBlogPost from "@services/contentful/blog";
import { Config } from "@utils/config";
import _ from "lodash";
import SEO from "@components/SEO";
import Post from "@components/Post";
import StatusBar from "@components/StatusBar";
import LayoutSideBar from "@layouts/LayoutSideBar";
import RelatePostList from "@components/RelatePostList";
import StickyBox from "react-sticky-box";
import { ResponsiveProps } from "@components/Responsive";

export default function PostWrapper(props) {
  const { post, relatePosts, preview } = props;

  return (
    <>
      <StatusBar />
      <SEO
        title={post.title}
        description={post.description}
        url={`${Config.pageMeta.blogIndex.url}/${post.slug}`}
        image={_.get(post, "thumbnail.url", "")}
        // canonical={post.externalUrl ? post.externalUrl : false}
      />
      <LayoutSideBar preview={preview}>
        <div className="container py-6 lg:py-12 sm:mx-auto">
          <Post post={post} />
        </div>
        <ResponsiveProps
          xs={{ style: { maxWidth: "100%" } }}
          lg={{ style: { maxWidth: 300 } }}
        >
          {(resProp) => (
            <StickyBox {...resProp} offsetTop={20} offsetBottom={20}>
              <RelatePostList post={post} posts={relatePosts} />
            </StickyBox>
          )}
        </ResponsiveProps>
      </LayoutSideBar>
    </>
  );
}

export async function getStaticPaths() {
  const blogPostSlugs = await ContentfulBlogPost.getAllPostSlugs();
  const paths = blogPostSlugs.map((slug) => {
    return { params: { slug: slug.toString() } };
  });

  // Using fallback: "blocking" here enables preview mode for unpublished blog slugs
  // on production
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params, preview = false }) {
  const post = await ContentfulBlogPost.getPostBySlug(params.slug, {
    preview: preview,
  });

  // Add this with fallback: "blocking"
  // So that if we do not have a post on production,
  // the 404 is served
  if (!post) {
    return {
      notFound: true,
    };
  }

  const author = _.get(post, "author.name", "");
  const relatePosts = await ContentfulBlogPost.getRelatePostList(
    params.slug,
    author
  );

  return {
    props: {
      preview,
      post,
      relatePosts,
    },
  };
}
