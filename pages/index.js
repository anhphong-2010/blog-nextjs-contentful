import RecentPostList from "@components/RecentPostList";
import Header from "@components/Header";
import LayoutMain from "@layouts/LayoutMain";
import SEO from "@components/SEO";
import ContentfulApi from "@utils/ContentfulApi";

export default function Home(props) {
  const { recentPosts, preview } = props;

  return (
    <div>
      <SEO />
      <LayoutMain preview={preview}>
        <Header />
        <RecentPostList posts={recentPosts} />
      </LayoutMain>
    </div>
  );
}

export async function getStaticProps({ preview = false }) {
  const recentPosts = await ContentfulApi.getRecentPostList();

  return {
    props: {
      preview,
      recentPosts,
    },
  };
}
