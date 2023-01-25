/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  eslint: {
    ignoreDuringBuilds: true,
    ignoreDuringCommits: true,
    dirs: ['.'],
  },
  poweredByHeader: false,
  trailingSlash: true,
  exportTrailingSlash: false,
  basePath: '',
  // The starter code load resources from `public` folder with `router.basePath` in React components.
  // So, the source code is "basePath-ready".
  // You can remove `basePath` if you don't need it.
  reactStrictMode: true,
  webpack: (config) => {
    if(!config.experiments) {
      config.experiments ={};
    }
    config.experiments.topLevelAwait = true;
    return config;
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
      },
    ],
  },
  images: { domains: ['i.imgur.com'], formats: ['image/avif', 'image/webp'], },
});
