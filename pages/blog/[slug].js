import { Config } from "@utils/config";
import _ from "lodash";
import ContentfulApi from "@services/contentfulApi";
import SEO from "@components/SEO";
import Post from "@components/Post";
import LayoutMain from "@layouts/LayoutMain";

export default function PostWrapper(props) {
  const { post, preview } = props;
  return (
    <LayoutMain preview={preview}>
      <SEO
        title={post.title}
        description={post.content}
        url={`${Config.pageMeta.blogIndex.url}/${post.slug}`}
        image={_.get(post, "thumbnail.url", "")}
        // canonical={post.externalUrl ? post.externalUrl : false}
      />
      <div className="container mx-4 py-6 lg:py-12 sm:mx-auto">
        <Post post={post} />
      </div>
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
