import RecentPostList from "@components/RecentPostList";
import Header from "@components/Header";
import LayoutMain from "@layouts/LayoutMain";
import SEO from "@components/SEO";
import ContentfulApi from "@services/contentfulApi";
import { Config } from "@utils/Config";
import RichTextPageContent from "@components/RichTextPageContent";

export default function Home(props) {
  const { recentPosts, preview, pageContent } = props;
  return (
    <div>
      <LayoutMain preview={preview}>
        <SEO
          title={pageContent.title}
          description={pageContent.description}
          url={`${Config.pageMeta.home.url}`}
        />
        <Header />
        <RichTextPageContent
          richTextBodyField={pageContent.body}
          renderH2Links={true}
        />
        <RecentPostList posts={recentPosts} />
      </LayoutMain>
    </div>
  );
}

export async function getStaticProps({ preview = false }) {
  const recentPosts = await ContentfulApi.getRecentPostList();
  const pageContent = await ContentfulApi.getPageContentBySlug("home", {
    preview: preview,
  });
  return {
    props: {
      preview,
      recentPosts,
      pageContent,
    },
  };
}
