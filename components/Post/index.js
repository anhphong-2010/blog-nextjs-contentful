import RichTextPageContentStyles from "@styles/RichTextPageContent.module.css";
// import Tags from "@components/Post/Tags";
import PublishedDate from "@components/PublishedDate";
import Author from "@components/Author";
import RichTextPageContent from "@components/RichTextPageContent";
import Image from "next/image";
import { postFormatter } from "@formatters/post";

export default function Post(props) {
  const { post } = props;

  return (
    <article className={`relative mb-4 ${RichTextPageContentStyles.page}`}>
      <div
        className="relative mb-4 bg-slate-100 rounded-lg overflow-hidden"
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
      <div className="max-w-screen-lg w-full m-auto">
        <h1 className="py-4 text-center font-bold text-4xl">{post.title}</h1>
        <div className="my-4 text-center">
          <PublishedDate
            classStr="text-gray-500 dark:text-white"
            date={post.date}
          />
        </div>
        <div className="my-4">
          <Author size={40} justify="center" data={post} />
        </div>
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
