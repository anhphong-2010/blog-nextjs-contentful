import ContentfulApi from "@utils/ContentfulApi";
import { Config } from "@utils/Config";
import PostList from "@components/PostList";
import LayoutMain from "@layouts/LayoutMain";
import Header from "@components/Header";

export default function BlogIndex(props) {
  const { postSummaries, currentPage, totalPages } = props;
  return (
    <LayoutMain>
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
