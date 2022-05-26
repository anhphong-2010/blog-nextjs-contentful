import RichTextPageContentStyles from "@styles/RichTextPageContent.module.css";
import TypographyStyles from "@styles/Typography.module.css";
// import Tags from "@components/Post/Tags";
import PublishedDate from "@components/PublishedDate";
// import Author from "@components/Post/Author";
// import ExternalUrl from "@components/Post/ExternalUrl";
import RichTextPageContent from "@components/RichTextPageContent";

export default function Post(props) {
  const { post } = props;

  return (
    <article className={RichTextPageContentStyles.page}>
      {/* {post.externalUrl && <ExternalUrl url={post.externalUrl} />} */}
      {/* {post.tags !== null && <Tags tags={post.tags} />} */}
      <h1 className={TypographyStyles.heading__h1}>{post.title}</h1>
      {post.description && <div className="my-2">{post.description}</div>}
      <div className="my-4">
        <PublishedDate classStr="text-gray-900 dark:text-white" date={post.date} />
      </div>
      <RichTextPageContent
        richTextBodyField={post.content}
        renderH2Links={true}
      />
    </article>
  );
}
