import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Pagination from "@components/Pagination";
import PublishedDate from "@components/PublishedDate";
import ReactMarkdownRenderers from "@utils/react-mark-down-renderers";
import Image from "next/image";
import Author from "@components/Author";
import Tags from "@components/Tags";
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
                <Link href={`blog/${post.slug}`} passHref>
                  <div
                    className="cursor-pointer mb-4 md:mb-0 w-full md:w-1/3 relative bg-slate-100 rounded-lg overflow-hidden border dark:border-white border-gray-300"
                    style={{ height: 200 }}
                  >
                    <Image
                      src={postFormatter.thumbnail(post)}
                      alt={post.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </Link>

                <div className="w-full md:w-2/3">
                  <div className="flex items-center space-x-2 md:space-x-4">
                    <Author size={35} justify="center" data={post} />
                    <div>|</div>
                    <PublishedDate date={post.date} />
                  </div>

                  <Link href={`blog/${post.slug}`} passHref>
                    <h2 className="text-2xl md:text-3xl font-bold my-3 cursor-pointer">
                      {post.title}
                    </h2>
                  </Link>

                  <ReactMarkdown
                    children={post.description}
                    components={ReactMarkdownRenderers(post.description)}
                  />
                  <div className="mt-4">
                    <Tags tags={_.get(post, "tags.items")} />
                  </div>
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
          url={"blog"}
          urlPagination={"blog/page"}
        />
      )}
    </>
  );
}
