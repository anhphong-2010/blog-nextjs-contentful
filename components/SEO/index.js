import Head from "next/head";
import { Config } from "@utils/config";

export default function PageMeta(props) {
  const { title, description, image } = props;
  const siteTitle = `${title} | ${Config.site.title}`;

  return (
    <Head>
      <title>{title}</title>

      {/* {canonical && <link rel="canonical" href={canonical} />} */}

      <link
        rel="alternate"
        type="application/rss+xml"
        title={`RSS Feed for ${Config.site.domain}`}
        href={`https://${Config.site.domain}/feed.xml`}
      />

      <meta name="title" content={title} />
      <meta property="og:title" content={title} />
      <meta property="twitter:title" content={title} />

      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta property="twitter:description" content={description} />

      {/* <meta property="og:url" content={url} />
      <meta property="twitter:url" content={url} /> */}

      <meta property="og:image" content={image} />
      <meta property="twitter:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:site"
        content={`@${Config.pageMeta.openGraph.twitterUser}`}
      />
      <meta
        name="twitter:creator"
        content={`@${Config.pageMeta.openGraph.twitterUser}`}
      />

      <link rel="icon" href="/favicon.ico" />

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0f111a" />
      <meta name="msapplication-TileColor" content="#b91d47" />
      <meta name="theme-color" content="#6aa84f" />
    </Head>
  );
}
