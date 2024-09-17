import Link from "next/link";
import React from "react";
import _ from "lodash";
import Author from "@components/Author";
import ReactMarkdown from "react-markdown";
import ReactMarkdownRenderers from "@utils/react-mark-down-renderers";
import gstyles from "@gstyles/index";
import { useTheme } from "next-themes";

export default function RelatePostList({ posts, post }) {
  const { systemTheme, theme } = useTheme("light");
  const currentTheme = theme === "system" ? systemTheme : theme;
  return (
      <div className="inline-block mb-12 lg:my-12">
        <div className="base-1/2 mb-4 p-4 rounded-lg bg-gray-800 dark:bg-white">
          <div className={`py-4 flex-col flex items-start space-y-2`}>
            <Author
              size={60}
              data={post}
              textClassName="text-white dark:text-black"
            />
            <div
              className={`dark:text-gray-900 text-white text-sm leading-relaxed flex flex-col space-y-2`}
            >
              <ReactMarkdown
                children={_.get(post, "author.description")}
                components={ReactMarkdownRenderers(
                  _.get(post, "author.description")
                )}
              />
            </div>
          </div>
          {!!_.get(post, "author.socials.items.length") && (
            <div className="py-3 flex items-center space-x-4">
              {_.map(_.get(post, "author.socials.items"), (social, index) => (
                <div key={index}>
                  <a href={_.get(social, "url", "/")}>
                    <div className="cursor-pointer text-white dark:text-gray-900">
                      {gstyles.icons({
                        name: _.get(social, "icon", ""),
                        size: 24,
                        fill: currentTheme === "dark" ? "000000" : "#ffffff",
                      })}
                    </div>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
        {!!_.get(posts, "length") && (
          <div className="base-1/2 p-4 py-6 rounded-lg bg-gray-800 dark:bg-white">
            <h2 className="text-2xl font-semibold text-white dark:text-gray-900 mb-6">
              Others post from this author
            </h2>
            <div className="flex space-y-4 flex-col">
              {_.map(posts, (post_item, index) => (
                <div className="group" key={index}>
                  <a href={`/blog/${_.get(post_item, "slug", "")}`}>
                    <div className="cursor-pointer text-sm text-white dark:text-gray-900 group-hover:text-sky-500 duration-700">
                      {_.get(post_item, "title", "")}
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
  );
}
