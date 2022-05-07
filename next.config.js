/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "_variables.scss";`,
  },
  images: {
    domains: ['localhost'],
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:slug*',
        destination: `http://localhost:8800/api/v1/:slug*`,
      },
    ];
  },
};

module.exports = nextConfig;
