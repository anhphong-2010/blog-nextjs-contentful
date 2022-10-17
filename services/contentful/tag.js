import ContentfulApi, {
  defaultOptions,
} from "@services/contentful/api";
import ContentfulBlogPost from "@services/contentful/blog";
import _ from "lodash";

export default class ContentfulTag extends ContentfulApi {
  static async getTags() {
    const variables = { limit: 12 };
    const query = `query GetTagsList($limit: Int!) {
      tagCollection(limit: $limit) {
        items {
          title
          slug
        }
      }
    }`;

    const response = await this.callContentful(query, variables);
    const tags = _.get(response, "data.tagCollection.items", []);

    return tags;
  }

  static async getAllTagSlugs() {
    let page = 1;
    let shouldQueryMoreSlugs = true;
    const returnSlugs = [];

    while (shouldQueryMoreSlugs) {
      const response = await ContentfulBlogPost.getPaginatedSlugs(page);

      if (response.slugs.length > 0) {
        returnSlugs.push(...response.slugs);
      }

      shouldQueryMoreSlugs = returnSlugs.length < response.total;
      page++;
    }

    return returnSlugs;
  }

  static async getArticleByTag(slug, options = defaultOptions) {
    const variables = { slug, preview: options.preview };
    const query = `query getArticleByTag($slug: String!, $preview: Boolean!) {
      tagCollection(limit: 1, where: {slug: $slug}, preview: $preview) {
        items {
          title
          slug
          articlesCollection {
            total
            items {
              sys {
                id
              }
              author{
                name
                avatar{
                  url
                }
              }
              tags: tagsCollection {
                items {
                  title
                  slug
                }
              }
              date
              title
              slug
              description
              thumbnail {
                url
              }
            }
          }
        }
      }
    }`;

    const response = await this.callContentful(query, variables, options);
    const tag = _.get(response, "data.tagCollection.items", []);

    return tag;
  }
}
