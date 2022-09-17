import RecentPostList from "@components/RecentPostList";

import LayoutMain from "@layouts/LayoutMain";
import SEO from "@components/SEO";
import ContentfulApi from "@services/contentfulApi";
import { Config } from "@utils/config";
import { useTheme } from "next-themes";
import RichTextPageContent from "@components/RichTextPageContent";

export default function Home(props) {
  const { recentPosts, preview, pageContent } = props;
  const { systemTheme, theme } = useTheme("light");
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div>
      <LayoutMain preview={preview}>
        <SEO
          title={pageContent.title}
          description={pageContent.description}
          url={`${Config.pageMeta.home.url}`}
        />
        <RichTextPageContent
          richTextBodyField={pageContent.body}
          renderH2Links={true}
        />
        <svg viewBox="0 0 10 1" style={{ marginBottom: -1 }}>
          <path
            fill={currentTheme !== "light" ? "#ffffff" : "#111827"}
            d="M0 0.6L0 1 10 1 10 0z"
          ></path>
        </svg>
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
