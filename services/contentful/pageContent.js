import ContentfulApi, { defaultOptions } from "@services/contentful/api";
import _ from "lodash";

export default class ContentfulPageContent extends ContentfulApi {
  static async getPageContentBySlug(slug, options = defaultOptions) {
    const variables = { slug, preview: options.preview };
    const query = `
    query GetPageContentBySlug($slug: String!, $preview: Boolean!) {
      pageContentCollection(limit: 1, where: {slug: $slug}, preview: $preview) {
        items {
          sys {
            id
          }
          body {
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
                  __typename
                  ... on Section {
                    name
                    description
                    image {
                      url
                    }
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
          title
          description
          slug
          seoImage {
            url
          }
        }
      }
    }`;

    const response = await this.callContentful(query, variables, options);

    const pageContent = _.get(response, "data.pageContentCollection.items", []);

    return pageContent.pop();
  }
}
