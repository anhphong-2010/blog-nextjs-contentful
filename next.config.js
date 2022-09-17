/** @type {import('next').NextConfig} */
var CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.ctfassets.net", "placehold.jp"],
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
    config.plugins.push(new CaseSensitivePathsPlugin());

    return config;
  },
};

module.exports = nextConfig;
