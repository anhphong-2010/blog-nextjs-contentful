import Link from "next/link";
import ReactMarkdown from "react-markdown";
import PublishedDate from "@components/PublishedDate";
import ContentListStyles from "@styles/ContentList.module.css";
import { Config } from "@utils/Config";
import ReactMarkdownRenderers from "@utils/ReactMarkdownRenderers";

export default function RecentPostList(props) {
  const { posts } = props;
  return (
    <div className="my-4">
      <h2 className="text-3xl mb-4 font-bold">Recent articles</h2>
      <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
        {!!posts &&
          posts.map((post) => (
            <article
              className="p-4 rounded-lg dark:bg-white bg-gray-900 flex flex-col space-y-4 h-full mb-3 sm:mb-6"
              key={post.sys.id}
            >
              <div>
                <PublishedDate
                  classStr="dark:text-gray-900 text-white"
                  date={post.date}
                />
              </div>
              <Link
                className="cursor-pointer"
                href={`/blog/${post.slug}`}
                passHref
              >
                <h2 className="dark:text-gray-900 text-white text-3xl font-medium py-4 cursor-pointer">
                  {post.title}
                </h2>
              </Link>

              <div
                className={`dark:text-gray-900 text-white ${ContentListStyles.contentList__excerpt}`}
              >
                <ReactMarkdown
                  children={post.description}
                  components={ReactMarkdownRenderers(post.description)}
                />
              </div>
            </article>
          ))}
      </div>
      <div className="text-center">
        <Link href={Config.pageMeta.blogIndex.slug} passHref>
          <div className="cursor-pointer inline-block rounded-lg p-3 dark:bg-white bg-black dark:text-black text-white font-bold">
            See more articles
          </div>
        </Link>
      </div>
    </div>
  );
}

export async function getStaticProps({ preview = false }) {
  //   const pageContent = await ContentfulApi.getPageContentBySlug(
  //     Config.pageMeta.home.slug,
  //     {
  //       preview: preview,
  //     }
  //   );

  const recentPosts = await ContentfulApi.getRecentPostList();

  return {
    props: {
      preview,
      //   pageContent: pageContent || null,
      recentPosts,
    },
  };
}
