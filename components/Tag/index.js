import React from "react";
import _ from "lodash";
import Link from "next/link";

export function Tag(props) {
  const { tag } = props;
  return (
    <Link href={`/tag/${tag.slug}`}>
      <div className="cursor-pointer px-2 p-1 border-4 border-sky-300 dark:border-indigo-500 text-xs sm:text-sm rounded-3xl bg-gray-900 dark:bg-gray-100 text-gray-200 dark:text-gray-900 font-semibold">
        #{_.get(tag, "title", "")}
      </div>
    </Link>
  );
}

export default Tag;
