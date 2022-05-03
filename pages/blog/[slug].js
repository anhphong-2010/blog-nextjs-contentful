import { Config } from "@utils/Config";
import ContentfulApi from "@utils/ContentfulApi";
import Post from "@components/Post";
import SEO from "@components/SEO";
import LayoutMain from "@layouts/LayoutMain";

export default function PostWrapper(props) {
  const { post, preview } = props;
  return (
    <LayoutMain preview={preview}>
      <SEO
        title={post.title}
        description={post.content}
        url={`${Config.pageMeta.blogIndex.url}/${post.slug}`}
        // canonical={post.externalUrl ? post.externalUrl : false}
      />

      <Post post={post} />
    </LayoutMain>
  );
}

export async function getStaticPaths() {
  const blogPostSlugs = await ContentfulApi.getAllPostSlugs();

  const paths = blogPostSlugs.map((slug) => {
    return { params: { slug } };
  });

  // Using fallback: "blocking" here enables preview mode for unpublished blog slugs
  // on production
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params, preview = false }) {
  const post = await ContentfulApi.getPostBySlug(params.slug, {
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

  return {
    props: {
      preview,
      post,
    },
  };
}
