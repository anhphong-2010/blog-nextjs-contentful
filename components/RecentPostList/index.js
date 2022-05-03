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
      <h2 className="text-3xl font-bold">Recent articles</h2>
      <ol className="list-none">
        {!!posts &&
          posts.map((post) => (
            <li className="py-6" key={post.sys.id}>
              <article>
                <PublishedDate date={post.date} />
                <Link className="cursor-pointer" href={`/blog/${post.slug}`}>
                  <h2 className="text-3xl font-medium py-4 cursor-pointer">
                    {post.title}
                  </h2>
                </Link>

                <div className={ContentListStyles.contentList__excerpt}>
                  <ReactMarkdown
                    children={post.description}
                    components={ReactMarkdownRenderers(post.description)}
                  />
                </div>
              </article>
            </li>
          ))}
      </ol>
      <Link href={Config.pageMeta.blogIndex.slug}>
        <div className="cursor-pointer inline-block rounded-lg p-3 bg-black text-white">See more articles</div>
      </Link>
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
