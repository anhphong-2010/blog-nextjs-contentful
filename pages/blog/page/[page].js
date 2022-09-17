import ContentfulApi from "@services/contentfulApi";
import { Config } from "@utils/config";
import LayoutMain from "@layouts/LayoutMain";
import SEO from "@components/SEO";
import PostList from "@components/PostList";

export default function BlogIndexPage(props) {
  const { postSummaries, totalPages, currentPage, pageContent, preview } =
    props;
  const pageTitle = pageContent ? pageContent.title : "Blog";
  const pageDescription = pageContent
    ? pageContent.description
    : "Articles | Next.js Contentful blog starter";

  return (
    <LayoutMain preview={preview}>
      <SEO
        title={`${pageTitle} Page ${currentPage}`}
        description={pageDescription}
        url={`${Config.pageMeta.blogIndex.url}/page/${currentPage}`}
      />
      <div className="container mx-4 sm:mx-auto">
        <PostList
          posts={postSummaries}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </div>
    </LayoutMain>
  );
}

export async function getStaticPaths() {
  const totalPosts = await ContentfulApi.getTotalPostsNumber();
  const totalPages = Math.ceil(totalPosts / Config.pagination.pageSize);

  const paths = [];

  /**
   * Start from page 2, so we don't replicate /blog
   * which is page 1
   */
  for (let page = 2; page <= totalPages; page++) {
    paths.push({ params: { page: page.toString() } });
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params, preview = false }) {
  const postSummaries = await ContentfulApi.getPaginatedPostSummaries(
    params.page
  );

  const totalPages = Math.ceil(
    postSummaries.total / Config.pagination.pageSize
  );

  const pageContent = await ContentfulApi.getPageContentBySlug(
    Config.pageMeta.blogIndex.slug,
    {
      preview: preview,
    }
  );

  return {
    props: {
      preview,
      postSummaries: postSummaries.items,
      totalPages,
      currentPage: params.page,
      pageContent: pageContent || null,
    },
  };
}
