import Link from "next/link";
import React from "react";
import { Config } from "@utils/config";
import Tags from "@components/Tags";
import RecentPostItem from "@components/RecentPostItem";

export default function RecentPostList(props) {
  const { posts, tags } = props;
  return (
    <div className="dark:bg-white bg-gray-900">
      <div className="py-4 mx-4 sm:mx-auto">
        <div className="text-center text-3xl mb-6 text-white dark:text-gray-900">
          Search blog by tags
        </div>
        <div className="flex justify-center flex-wrap">
          <Tags tags={tags} />
        </div>
      </div>
      <div className="container py-4 mx-4 sm:mx-auto">
        <h2 className="py-4 dark:text-black text-white text-3xl mb-4 font-bold">
          Recent articles
        </h2>
        <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
          {!!posts &&
            posts.map((post, index) => (
              <React.Fragment key={index}>
                <RecentPostItem post={post} />
              </React.Fragment>
            ))}
        </div>
        <div className="text-center">
          <Link href={Config.pageMeta.blogIndex.slug} passHref>
            <div className="cursor-pointer inline-block rounded-lg p-3 bg-white dark:bg-black text-black dark:text-white font-bold">
              See more articles
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps({ preview = false }) {
  //   const pageContent = await ContentfulApi.getPageContentBySlug(
  //     Config.pageMeta.home.slug,
  //     {
  //       preview: preview,
  //     }
  //   );

  const recentPosts = await ContentfulApi.getRecentPostList();

  return {
    props: {
      preview,
      //   pageContent: pageContent || null,
      recentPosts,
    },
  };
}
