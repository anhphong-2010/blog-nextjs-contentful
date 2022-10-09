import React from "react";
import _ from "lodash";
import PostItem from "@components/PostItem";

export default function PostListOutSizeBlogs(props) {
  const { posts } = props;
  return (
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
  );
}
