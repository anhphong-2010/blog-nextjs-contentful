/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.ctfassets.net"],
    loader: "akamai",
    path: "",
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: {
        loader: "@svgr/webpack",
        options: {
          svgoConfig: {
            plugins: [
              {
                name: "removeViewBox",
                active: false,
              },
            ],
          },
        },
      },
    });

    return config;
  },
};

module.exports = nextConfig;
