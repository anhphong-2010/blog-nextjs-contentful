import Link from "next/link";
import ReactMarkdown from "react-markdown";
import PublishedDate from "@components/PublishedDate";
import ContentListStyles from "@styles/ContentList.module.css";
import ReactMarkdownRenderers from "@utils/react-mark-down-renderers";
import _ from "lodash";
import gstyles from "@gstyles/index";

export default function RecentPostItem(props) {
  const { post } = props;
  return (
    <Link href={`/blog/${post.slug}`} passHref>
      <article
        className="cursor-pointer group rounded-lg bg-white dark:bg-gray-900 flex flex-col space-y-2 border border-white dark:border-gray-900"
        key={post.sys.id}
      >
        <div className="p-4 flex flex-col space-y-2">
          <div className="flex items-center space-x-4">
            <div
              style={{ height: 2 }}
              className="w-14 bg-sky-500 duration-700"
            ></div>
            <PublishedDate classStr="text-sky-500 font-semibold" date={post.date} />
          </div>
          <Link className="cursor-pointer" href={`/blog/${post.slug}`} passHref>
            <h2 className="text-gray-900 dark:text-white text-xl md:text-2xl font-semibold py-2 cursor-pointer">
              {post.title}
            </h2>
          </Link>

          <div
            className={`text-gray-900 dark:text-white text-xs md:text-sm ${ContentListStyles.contentList__excerpt}`}
          >
            <ReactMarkdown
              children={post.description}
              components={ReactMarkdownRenderers(post.description)}
            />
          </div>
          <div className="group inline-block">
            <Link href={`/blog/${post.slug}`} passHref>
              <div className="pl-0 group-hover:pl-2 p-2 inline-flex items-end cursor-pointer group-hover:bg-regal-blue duration-700 rounded-lg">
                <div className="cursor-pointer inline-block rounded-lg text-sky-500 dark:text-sky-500 font-bold">
                  Read more
                </div>
                <span className="translate-x-0 transform group-hover:translate-x-2 duration-700">
                  {gstyles.icons({
                    name: "arrow-right",
                    size: 22,
                    fill: gstyles.colors.blue.light,
                  })}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </article>
    </Link>
  );
}
