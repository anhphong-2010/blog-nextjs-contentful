import RichTextPageContentStyles from "@styles/RichTextPageContent.module.css";
import PublishedDate from "@components/PublishedDate";
import Author from "@components/Author";
import Tags from "@components/Tags";
import RichTextPageContent from "@components/RichTextPageContent";
import Image from "next/image";
import { postFormatter } from "@formatters/post";
import { ResponsiveProps } from "@components/Responsive";
import _ from "lodash";

export default function Post(props) {
  const { post } = props;

  return (
    <article className={`relative mb-4 ${RichTextPageContentStyles.page}`}>
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
        <h1 className="py-4 text-center font-medium md:font-bold text-3xl md:text-4xl">{post.title}</h1>
        <div className="my-4 text-center">
          <PublishedDate
            classStr="text-gray-500 dark:text-white"
            date={post.date}
          />
        </div>
        <div className="my-4">
          <Author size={40} justify="center" data={post} />
        </div>
        {!!_.get(post, "tags.items.length") && (
          <div className="flex justify-center items-center my-6">
            <Tags tags={_.get(post, "tags.items")} />
          </div>
        )}
        <hr className="py-4" />
        {/* {post.description && <div className="my-4">{post.description}</div>} */}
        <RichTextPageContent
          richTextBodyField={post.content}
          // renderH2Links={true}
        />
      </div>
    </article>
  );
}
