import { Config } from "@utils/config";
import _ from "lodash";
import ContentfulApi from "@services/contentfulApi";
import SEO from "@components/SEO";
import PostListInTag from "@components/PostListInTag";
import LayoutMain from "@layouts/LayoutMain";

export default function TagWrapper(props) {
  const { tag, preview } = props;

  const postSummaries = _.get(tag, "0.articlesCollection.items");

  const tagData = _.get(tag, "[0]", {});

  return (
    <LayoutMain preview={preview}>
      <SEO
        title={tagData.title}
        description={tagData.title}
        url={`${Config.pageMeta.tagIndex.url}/${tagData.slug}`}
        // image={_.get(post, "thumbnail.url", "")}
      />

      <div className="container my-16 mx-4 sm:mx-auto">
        <div className="text-4xl text-black dark:text-white my-6">
          #{tagData.title}
        </div>
        <PostListInTag posts={postSummaries} />
      </div>
    </LayoutMain>
  );
}

export async function getStaticPaths() {
  const tagSlugs = await ContentfulApi.getAllTagSlugs();

  const paths = tagSlugs.map((slug) => {
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
  const tag = await ContentfulApi.getArticleByTag(params.slug, {
    preview: preview,
  });

  // Add this with fallback: "blocking"
  // So that if we do not have a post on production,
  // the 404 is served
  if (!tag) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      preview,
      tag,
    },
  };
}
