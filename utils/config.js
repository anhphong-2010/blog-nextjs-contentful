const SITE_URL = "http://localhost:3000";

export const Config = {
  site: {
    owner: "AP",
    title: "Next.js + Contentful blog site",
    domain: "http://localhost:3000",
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
    blogIndex: {
      url: `${SITE_URL}/blog`,
      slug: "/blog",
    },
    blogIndexPage: {
      slug: "/blog/page/[page]",
    },
    post: {
      slug: "/blog/[slug]",
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
    pageSize: 3,
    recentPostsSize: 3,
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
