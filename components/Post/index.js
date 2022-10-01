import RichTextPageContentStyles from "@styles/RichTextPageContent.module.css";
import PublishedDate from "@components/PublishedDate";
import Author from "@components/Author";
import Tags from "@components/Tags";
import RichTextPageContent from "@components/RichTextPageContent";
import ContentListStyles from "@styles/ContentList.module.css";
import Image from "next/image";
import { postFormatter } from "@formatters/post";
import { ResponsiveProps } from "@components/Responsive";
import ReactMarkdownRenderers from "@utils/react-mark-down-renderers";
import ReactMarkdown from "react-markdown";
import _ from "lodash";

export default function Post(props) {
  const { post } = props;
  const publishedAt = _.get(post, "sys.publishedAt", "");
  return (
    <article className={`relative mb-4 ${RichTextPageContentStyles.page}`}>
      <div className="w-full mb-6">
        <div className="flex flex-col justify-start items-start">
          <div className="py-4 w-full flex flex-col md:flex-row justify-between items-start md:items-center">
            <h1 className="md:w-2/3 text-center md:text-left font-bold text-3xl lg:text-4xl">
              {post.title}
            </h1>
            <div className="mt-4 md:my-2">
              <Author size={35} justify="start" data={post} />
            </div>
          </div>
          <div className="w-full flex justify-between items-center">
            <PublishedDate
              text={"Published on"}
              classStr="text-gray-500 dark:text-gray-300"
              date={post.date}
            />
            <PublishedDate
              text={"Last updated on"}
              classStr="text-gray-500 dark:text-gray-300"
              date={publishedAt}
            />
          </div>
        </div>
      </div>
      <ResponsiveProps
        xs={{ style: { width: "100%", height: 200 } }}
        md={{ style: { height: 300 } }}
        lg={{ style: { height: 400 } }}
      >
        {(resProps) => (
          <div
            className="relative mb-4 bg-slate-100 rounded-lg overflow-hidden"
            {...resProps}
          >
            <Image
              src={postFormatter.thumbnail(post)}
              alt={post.title}
              layout="fill"
              objectFit="cover"
              className="group-hover:scale-110 duration-700"
            />
          </div>
        )}
      </ResponsiveProps>

      <div className="max-w-screen-lg w-full m-auto">
        {!!_.get(post, "tags.items.length") && (
          <div className="flex justify-center items-center my-6">
            <Tags tags={_.get(post, "tags.items")} />
          </div>
        )}
        <hr className="py-4" />
        <div
          className={`text-gray-900 dark:text-white text-sm ${ContentListStyles.contentList__excerpt}`}
        >
          <ReactMarkdown
            children={post.description}
            components={ReactMarkdownRenderers(post.description)}
          />
        </div>
        <RichTextPageContent
          richTextBodyField={post.content}
          // renderH2Links={true}
        />
      </div>
    </article>
  );
}
