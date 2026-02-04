import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/',
  assetPrefix: '/',
  turbopack: {
    root: __dirname,
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '2975',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'campaign.classtym.com',
        port: '',
        pathname: '/**'
      },
    ]
  },
};

export default nextConfig;