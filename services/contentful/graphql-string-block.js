export default class GraphQLStringBlocks {
  static author() {
    return `
      author{
        name
        description
        avatar{
          url
        }
      }
    `;
  }

  static blogPostBody() {
    return `
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
              ... on CodeBlock {
                name
                description
                language
                code
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
    `;
  }

  static blogPost() {
    return `
      sys {
        id
        publishedAt
      }
      date
      title
      slug
      description
      thumbnail {
        url
      }
    `;
  }

  static Tag() {
    return `
      tags: tagsCollection {
        items {
          title
          slug
        }
      }
    `;
  }
}
