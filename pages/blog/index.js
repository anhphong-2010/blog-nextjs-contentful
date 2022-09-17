import ContentfulApi from "@services/contentfulApi";
import { Config } from "@utils/config";
import PostList from "@components/PostList";
import LayoutMain from "@layouts/LayoutMain";
import SEO from "@components/SEO";

export default function BlogIndex(props) {
  const { postSummaries, currentPage, totalPages } = props;
  return (
    <LayoutMain>
      <SEO title={`Blog Page ${currentPage}`} />
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

export async function getStaticProps() {
  const postSummaries = await ContentfulApi.getPaginatedPostSummaries(1);
  const totalPages = Math.ceil(
    postSummaries.total / Config.pagination.pageSize
  );

  return {
    props: {
      postSummaries: postSummaries.items,
      totalPages,
      currentPage: "1",
    },
  };
}
