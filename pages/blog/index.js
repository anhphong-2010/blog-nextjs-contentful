import ContentfulApi from "@services/contentfulApi";
import { Config } from "@utils/config";
import PostList from "@components/PostList";
import LayoutMain from "@layouts/LayoutMain";
import Header from "@components/Header";
import SEO from "@components/SEO";

export default function BlogIndex(props) {
  const { postSummaries, currentPage, totalPages } = props;
  return (
    <LayoutMain>
      <SEO title={`Blog Page ${currentPage}`} />
      <Header />
      <PostList
        posts={postSummaries}
        totalPages={totalPages}
        currentPage={currentPage}
      />
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
