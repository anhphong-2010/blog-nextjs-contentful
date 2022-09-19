import Link from "next/link";
import ReactMarkdown from "react-markdown";
import PublishedDate from "@components/PublishedDate";
import ContentListStyles from "@styles/ContentList.module.css";
import ReactMarkdownRenderers from "@utils/react-mark-down-renderers";
import Image from "next/image";
import { postFormatter } from "@formatters/post";
import _ from "lodash";

export default function RecentPostItem(props) {
  const { post } = props;
  return (
    <Link className="cursor-pointer" href={`/blog/${post.slug}`} passHref>
      <article
        className="group rounded-lg bg-white dark:bg-gray-900 flex flex-col space-y-2 mb-3 sm:mb-6 border border-white dark:border-gray-900"
        key={post.sys.id}
      >
        <div
          className="cursor-pointer relative bg-slate-100 rounded-tr-lg rounded-tl-lg overflow-hidden"
          style={{ width: "100%", height: 200 }}
        >
          <Image
            src={postFormatter.thumbnail(post)}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            className="group-hover:scale-110 duration-700"
          />
        </div>

        <div className="px-4 flex flex-col space-y-2">
          <Link className="cursor-pointer" href={`/blog/${post.slug}`} passHref>
            <h2 className="text-gray-900 dark:text-white text-3xl font-medium py-4 cursor-pointer">
              {post.title}
            </h2>
          </Link>
          <div>
            <PublishedDate
              classStr="text-gray-900 dark:text-white"
              date={post.date}
            />
          </div>
          <div
            className={`text-gray-900 dark:text-white text-sm ${ContentListStyles.contentList__excerpt}`}
          >
            <ReactMarkdown
              children={post.description}
              components={ReactMarkdownRenderers(post.description)}
            />
          </div>
        </div>
      </article>
    </Link>
  );
}
