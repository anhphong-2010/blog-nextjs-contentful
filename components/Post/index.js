import RichTextPageContentStyles from "@styles/RichTextPageContent.module.css";
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
  return (
    <article
      className={`lg:p-4 max-w-screen-lg relative mb-4 ${RichTextPageContentStyles.page}`}
    >
      <div className="w-full mb-6">
        <div className="mx-4 sm:mx-0 flex flex-col justify-start items-start">
          <div className="py-4">
            <h1
              style={{ lineHeight: "3.2rem" }}
              className="dark:text-white text-black text-left font-extrabold text-2xl sm:text-3xl lg:text-4xl"
            >
              {post.title}
            </h1>
          </div>
          <div className="w-full flex justify-between items-center">
            <div>
              <div className="md:my-2">
                <Author
                  size={35}
                  data={post}
                  published
                  textClassName="dark:text-white text-black"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
          className={`text-gray-900 dark:text-white text-sm ${ContentListStyles.contentList__excerpt}`}
        >
          <ReactMarkdown
            children={post.description}
            components={ReactMarkdownRenderers(post.description)}
          />
        </div>
      <ResponsiveProps
        xs={{ style: { width: "100%", height: 200 } }}
        md={{ style: { height: 300 } }}
        lg={{ style: { height: 400 } }}
      >
        {(resProps) => (
          <div
            className="relative mb-4 bg-slate-100 sm:rounded-lg overflow-hidden shadow-md"
            {...resProps}
          >
            <Image
              src={postFormatter.thumbnail(post)}
              alt={post.title}
              layout="fill"
              objectFit="cover"
              className="group-hover:scale-110 duration-700"
              placeholder="blur"
              blurDataURL="/images/path-to-blur-image.jpg"
            />
          </div>
        )}
      </ResponsiveProps>

      <div className="mx-4 sm:mx-0">
        {!!_.get(post, "tags.items.length") && (
          <div className="flex justify-center items-center my-6">
            <Tags tags={_.get(post, "tags.items")} />
          </div>
        )}
        <hr className="my-6 dark:border-gray-300 border-black" />
       
        <RichTextPageContent
          richTextBodyField={post.content}
          // renderH2Links={true}
        />
      </div>
    </article>
  );
}
