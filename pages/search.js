import LayoutMain from "@layouts/LayoutMain";
import SEO from "@components/SEO";
import ContentfulApi from "@services/contentfulApi";
import { Config } from "@utils/config";
import _ from "lodash";
import React from "react";
import { useRouter } from "next/router";
import { renderPropsComposer } from "@utils/props-composer";
import PostListOutSizeBlogs from "@components/PostListOutSizeBlogs";

export default function Search(props) {
  const { query } = useRouter();
  const term = _.get(query, "result", "");
  const { posts } = props;

  const postFiltering = React.useMemo(
    () =>
      _.filter(posts, (post) => {
        return _.includes(
          _.lowerCase(_.get(post, "title", "")),
          _.lowerCase(term)
        );
      }),
    [term]
  );

  return (
    <div>
      <LayoutMain>
        <SEO
          title={`Search result - ${term}`}
          // description={pageContent.description}
          url={`${Config.pageMeta.search.url}`}
          // image={_.get(pageContent, "seoImage.url", "")}
        />
        <div className="container py-4 mx-4 sm:mx-auto">
          {renderPropsComposer(
            {
              matcher: (props) => !props.length,
              render: () => (
                <div className="container py-4 mx-4 sm:mx-auto">
                  No result for keyword:{" "}
                  <span className="font-semibold">{term}</span>
                </div>
              ),
            },
            {
              matcher: (props) => !!props.length,
              render: (props) => {
                const dataQuantity = props.length;
                return (
                  <div className="py-6">
                    <div className="text-base md:text-2xl">
                      About {dataQuantity}{" "}
                      {dataQuantity > 1 || dataQuantity === 0
                        ? "results"
                        : "result"}
                    </div>
                    <PostListOutSizeBlogs posts={props} />
                  </div>
                );
              },
            },
            () => null
          )(postFiltering)}
        </div>
      </LayoutMain>
    </div>
  );
}

export async function getStaticProps({ preview = false }) {
  const posts = await ContentfulApi.getAllPostList({
    preview: false,
  });

  return {
    props: {
      preview,
      posts,
    },
  };
}
