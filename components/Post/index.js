import RichTextPageContentStyles from "@styles/RichTextPageContent.module.css";
import TypographyStyles from "@styles/Typography.module.css";
// import Tags from "@components/Post/Tags";
import PublishedDate from "@components/PublishedDate";
// import Author from "@components/Post/Author";
// import ExternalUrl from "@components/Post/ExternalUrl";
import RichTextPageContent from "@components/RichTextPageContent";
import Image from "next/image";
import { postFormatter } from "@formatters/post";

export default function Post(props) {
  const { post } = props;

  return (
    <article className={`relative mb-4 ${RichTextPageContentStyles.page}`}>
      {/* {post.externalUrl && <ExternalUrl url={post.externalUrl} />} */}
      {/* {post.tags !== null && <Tags tags={post.tags} />} */}
      <div
        className="mb-4 relative bg-slate-100 rounded-tr-lg rounded-tl-lg overflow-hidden"
        style={{ width: "100%", height: 400 }}
      >
        <Image
          src={postFormatter.thumbnail(post)}
          alt={post.title}
          layout="fill"
          objectFit="cover"
          className="group-hover:scale-110 duration-700"
        />
      </div>
      <div className="absolute dark:bg-gray-900 bg-white rounded-br-lg rounded-bl-lg translate-1/2 shadow-lg top-44 container p-4">
        <h1 className={TypographyStyles.heading__h1}>{post.title}</h1>
        <div className="my-4">
          <PublishedDate
            classStr="text-gray-900 dark:text-white"
            date={post.date}
          />
        </div>
        {/* {post.description && <div className="my-4">{post.description}</div>} */}
        <RichTextPageContent
          richTextBodyField={post.content}
          // renderH2Links={true}
        />
      </div>
    </article>
  );
}
