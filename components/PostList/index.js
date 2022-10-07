import React from "react";
import Pagination from "@components/Pagination";
import _ from "lodash";
import PostItem from "@components/PostItem";

export default function PostList(props) {
  const { posts, currentPage, totalPages } = props;

  const nextDisabled = parseInt(currentPage, 10) === parseInt(totalPages, 10);
  const prevDisabled = parseInt(currentPage, 10) === 1;

  return (
    <>
      <ol className="list-none">
        {!!posts &&
          posts.map((post, index) => {
            const data = {
              ..._.omit(post, ["slug"]),
              slug: `/blog/${_.get(post, "slug", "")}`,
            };
            return (
              <React.Fragment key={index}>
                <PostItem post={data} />
              </React.Fragment>
            );
          })}
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
