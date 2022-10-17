import ContentfulApi, {
  defaultOptions,
} from "@services/contentful/api";
import { Config } from "@utils/config";
import GraphQLStringBlocks from "@services/contentful/graphql-string-block";
import _ from "lodash";

export default class ContentfulBlogPost extends ContentfulApi {
  static async getRecentPostList() {
    const variables = { limit: Config.pagination.recentPostsSize };
    const query = `query GetRecentPostList($limit: Int!) {
      articleCollection(limit: $limit, order: date_DESC) {
        items {
          ${GraphQLStringBlocks.blogPost()}
        }
      }
    }`;

    const response = await this.callContentful(query, variables);
    const recentPosts = _.get(response, "data.articleCollection.items", []);

    return recentPosts;
  }

  static async getAllPostList(options = defaultOptions) {
    const variables = { preview: options.preview };
    const query = `query GetAllPostList {
      articleCollection(order: date_DESC) {
        items {
          ${GraphQLStringBlocks.author()}
          ${GraphQLStringBlocks.blogPost()}
        }
      }
    }`;

    const response = await this.callContentful(query, variables);

    const posts = _.get(response, "data.articleCollection.items", []);

    return posts;
  }

  static async getTotalPostsNumber() {
    // Build the query
    const query = `
      {
        articleCollection {
          total
        }
      }
    `;

    // Call out to the API
    const response = await this.callContentful(query);
    const totalPosts = _.get(response, "data.articleCollection.total", 0);

    return totalPosts;
  }

  static async getPaginatedPostSummaries(page) {
    const skipMultiplier = page === 1 ? 0 : page - 1;
    const skip =
      skipMultiplier > 0 ? Config.pagination.pageSize * skipMultiplier : 0;

    const query = `{
        articleCollection(limit: ${
          Config.pagination.pageSize
        }, skip: ${skip}, order: date_DESC) {
          total
          items {
            ${GraphQLStringBlocks.author()}
            ${GraphQLStringBlocks.blogPost()}
            ${GraphQLStringBlocks.Tag()}
          }
        }
      }`;

    // Call out to the API
    const response = await this.callContentful(query);
    const paginatedPostSummaries = _.get(
      response,
      "data.articleCollection",
      {}
    );

    return paginatedPostSummaries;
  }

  static async getPaginatedSlugs(page) {
    const queryLimit = 100;
    const skipMultiplier = page === 1 ? 0 : page - 1;
    const skip = skipMultiplier > 0 ? queryLimit * skipMultiplier : 0;

    const variables = { limit: queryLimit, skip };

    const query = `
      query GetPaginatedSlugs($limit: Int!, $skip: Int!) {
        articleCollection(limit: $limit, skip: $skip, order: date_DESC) {
          total
          items {
            slug
          }
        }
      }`;

    const response = await this.callContentful(query, variables);

    const { total } = _.get(response, "data.articleCollection", {});
    const slugs = _.get(response, "data.articleCollection.items", []);

    return { slugs, total };
  }

  static async getAllPostSlugs() {
    let page = 1;
    let shouldQueryMoreSlugs = true;
    const returnSlugs = [];

    while (shouldQueryMoreSlugs) {
      const response = await this.getPaginatedSlugs(page);

      if (response.slugs.length > 0) {
        returnSlugs.push(...response.slugs);
      }

      shouldQueryMoreSlugs = returnSlugs.length < response.total;
      page++;
    }
    return returnSlugs;
  }

  static async getPostBySlug(slug, options = defaultOptions) {
    const variables = { slug, preview: options.preview };
    const query = `query getArticleBySlug($slug: String!, $preview: Boolean!) {
      articleCollection(limit: 1, where: {slug: $slug}, preview: $preview) {
        total
        items {
          ${GraphQLStringBlocks.author()}
          ${GraphQLStringBlocks.blogPost()}
          ${GraphQLStringBlocks.blogPostBody()}
          ${GraphQLStringBlocks.Tag()}
        }
      }
    }`;

    const response = await this.callContentful(query, variables, options);
    const post = _.get(response, "data.articleCollection.items", []);

    return post.pop();
  }
}
