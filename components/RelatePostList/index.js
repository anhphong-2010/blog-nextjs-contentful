import Link from "next/link";
import React from "react";
import _ from "lodash";
import Author from "@components/Author";
import ReactMarkdown from "react-markdown";
import ReactMarkdownRenderers from "@utils/react-mark-down-renderers";

export default function RelatePostList({ posts, post }) {
  return (
    <div>
      <div className="mb-12 lg:my-12">
        <div className="mb-4 p-4 rounded-lg bg-gray-800 dark:bg-white">
          <div className={`py-6 flex-col flex items-start space-y-2`}>
            <Author
              size={60}
              data={post}
              textClassName="text-white dark:text-black"
            />
            <div
              className={`dark:text-gray-900 text-white text-sm break-all flex flex-col space-y-2`}
            >
              <ReactMarkdown
                children={_.get(post, "author.description")}
                components={ReactMarkdownRenderers(
                  _.get(post, "author.description")
                )}
              />
            </div>
          </div>
        </div>

        <div className="p-4 py-6 rounded-lg bg-gray-800 dark:bg-white">
          <h2 className="text-2xl font-semibold text-white dark:text-gray-900 mb-6">
            Others post from this author
          </h2>
          <div className="flex space-y-4 flex-col">
            {_.map(posts, (post_item, index) => (
              <div key={index}>
                <a href={`/blog/${_.get(post_item, "slug", "")}`}>
                  <div className="cursor-pointer text-white dark:text-gray-900">
                    {_.get(post_item, "title", "")}
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
