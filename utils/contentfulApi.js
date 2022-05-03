import { Config } from "@utils/Config";

const defaultOptions = {
  preview: false,
};

export default class ContentfulApi {
  static async callContentful(query, variables = {}, options = defaultOptions) {
    const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;

    const accessToken = options.preview
      ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
      : process.env.CONTENTFUL_ACCESS_TOKEN;
    const fetchOptions = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    };

    try {
      const data = await fetch(fetchUrl, fetchOptions).then((response) =>
        response.json()
      );
      return data;
    } catch (error) {
      throw new Error("Could not fetch data from Contentful!");
    }
  }

  static async getRecentPostList() {
    const variables = { limit: Config.pagination.recentPostsSize };
    const query = `query GetRecentPostList($limit: Int!) {
      articleCollection(limit: $limit, order: date_DESC) {
        items {
          sys {
            id
          }
          date
          title
          slug
          description
        }
      }
    }`;

    const response = await this.callContentful(query, variables);

    const recentPosts = response.data.articleCollection.items
      ? response.data.articleCollection.items
      : [];

    return recentPosts;
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
    const totalPosts = response.data.articleCollection.total
      ? response.data.articleCollection.total
      : 0;

    return totalPosts;
  }

  static async getPaginatedPostSummaries(page) {
    const skipMultiplier = page === 1 ? 0 : page - 1;
    const skip =
      skipMultiplier > 0 ? Config.pagination.pageSize * skipMultiplier : 0;

    const query = `{
        articleCollection(limit: ${Config.pagination.pageSize}, skip: ${skip}, order: date_DESC) {
          total
          items {
            sys {
              id
            }
            date
            title
            slug
            description
          }
        }
      }`;

    // Call out to the API
    const response = await this.callContentful(query);

    const paginatedPostSummaries = response.data.articleCollection
      ? response.data.articleCollection
      : { total: 0, items: [] };

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

    const { total } = response.data.articleCollection;
    const slugs = response.data.articleCollection.items
      ? response.data.articleCollection.items.map((item) => item.slug)
      : [];

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
          sys {
            id
          }
          date
          title
          slug
          description
          content {
            json
            links {
              entries {
                block {
                  sys {
                    id
                  }
                  __typename
                  ... on VideoEmbed {
                    title
                    embedUrl
                  }
                }
              }
              assets {
                block {
                  sys {
                    id
                  }
                  url
                  title
                  width
                  height
                  description
                }
              }
            }
          }
        }
      }
    }`;

    const response = await this.callContentful(query, variables, options);

    const post = response.data.articleCollection.items
      ? response.data.articleCollection.items
      : [];

    return post.pop();
  }
}
