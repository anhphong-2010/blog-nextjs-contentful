import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Pagination from "@components/Pagination";
import PublishedDate from "@components/PublishedDate";
import ReactMarkdownRenderers from "@utils/react-mark-down-renderers";
import Image from "next/image";
import { postFormatter } from "@formatters/post";
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
              <article className="flex flex-col md:flex-row md:space-x-6">
                <div
                  className="mb-4 md:mb-0 w-full md:w-1/3 relative bg-slate-100 rounded-lg overflow-hidden border dark:border-white border-gray-300"
                  style={{ height: 200 }}
                >
                  <Image
                    src={postFormatter.thumbnail(post)}
                    alt={post.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>

                <div className="w-full md:w-2/3">
                  <PublishedDate date={post.date} />

                  <Link href={`blog/${post.slug}`} passHref>
                    <h2 className="text-3xl md:text-4xl font-bold py-4 cursor-pointer">
                      {post.title}
                    </h2>
                  </Link>

                  <ReactMarkdown
                    children={post.description}
                    components={ReactMarkdownRenderers(post.description)}
                  />
                </div>
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
