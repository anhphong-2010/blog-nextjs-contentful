const SITE_URL = process.env.SITE_URL;

export const Config = {
  site: {
    owner: "AP",
    title: "Next.js + Contentful blog site",
    domain: SITE_URL,
    email: "anhphongnw.2010@gmail.com",
  },
  pageMeta: {
    openGraph: {
      twitterUser: "Anh Phong Hua",
    },
    home: {
      url: SITE_URL,
      slug: "/",
    },
    search: {
      url: `${SITE_URL}/search`,
      slug: "/search",
    },
    blogIndex: {
      url: `${SITE_URL}/blog`,
      slug: "/blog",
    },
    tagIndex: {
      url: `${SITE_URL}/tag`,
      slug: "/tag",
    },
    blogIndexPage: {
      slug: "/blog/page/[page]",
    },
    post: {
      slug: "/blog/[slug]",
    },
    tagIndexPage: {
      slug: "/tag/[slug]/[page]",
    },
    tag: {
      slug: "/tag/[slug]",
    },
    buildRss: {
      url: `${SITE_URL}/buildrss`,
      slug: "/buildrss",
    },
    notFound: {
      url: SITE_URL,
      slug: "/404",
    },
  },
  pagination: {
    pageSize: 4,
    recentPostsSize: 4,
    tagPageSize: 1,
    relatePostSize: 3,
  },
  menuLinks: [
    {
      displayName: "Home",
      path: "/",
    },
    {
      displayName: "Blog",
      path: "/blog",
    },
  ],
};
