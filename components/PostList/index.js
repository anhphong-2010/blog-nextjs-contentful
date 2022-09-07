import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Pagination from "@components/Pagination";
import PublishedDate from "@components/PublishedDate";
import ReactMarkdownRenderers from "@utils/reactMarkdownRenderers";
import _ from "lodash";

export default function PostList(props) {
  const { posts, currentPage, totalPages } = props;

  const nextDisabled = parseInt(currentPage, 10) === parseInt(totalPages, 10);
  const prevDisabled = parseInt(currentPage, 10) === 1;

  return (
    <>
      <ol className="list-none">
        {!!posts &&
          posts.map((post) => (
            <li className="py-4" key={post.sys.id}>
              <article>
                <PublishedDate date={post.date} />

                <Link href={`blog/${post.slug}`} passHref>
                  <h2 className="text-4xl font-bold py-4 cursor-pointer">
                    {post.title}
                  </h2>
                </Link>

                <ReactMarkdown
                  children={post.description}
                  components={ReactMarkdownRenderers(post.description)}
                />
              </article>
            </li>
          ))}
      </ol>

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          nextDisabled={nextDisabled}
          prevDisabled={prevDisabled}
        />
      )}
    </>
  );
}
