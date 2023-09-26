/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
const path = require("path");

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
        prependData: `@import "_variables.scss";`,
      },
      images: {
        domains: ["localhost"],
      },
      async rewrites() {
        return [
          {
            source: "/api/v1/:slug*",
            destination: `http://localhost:8800/api/v1/:slug*`,
          },
        ];
      },
    };
  }

  return {
    reactStrictMode: true,
    sassOptions: {
      includePaths: [path.join(__dirname, "styles")],
      prependData: `@import "_variables.scss";`,
    },
    images: {
      domains: ["social-media-api.up.railway.app"],
    },
    async rewrites() {
      return [
        {
          source: "/api/v1/:slug*",
          destination: `https://social-media-api.up.railway.app/api/v1/:slug*`,
        },
      ];
    },
  };
};

// const nextConfig = {
//   reactStrictMode: true,
//   sassOptions: {
//     includePaths: [path.join(__dirname, 'styles')],
//     prependData: `@import "_variables.scss";`,
//   },
//   images: {
//     domains: ['localhost'],
//   },
//   async rewrites() {
//     return [
//       {
//         source: '/api/v1/:slug*',
//         destination: `http://localhost:8800/api/v1/:slug*`,
//       },
//     ];
//   },
// };

// module.exports = nextConfig;
