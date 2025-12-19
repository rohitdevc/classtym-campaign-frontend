import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/classtym-campaign',
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
        hostname: 'staging.theneontree.in',
        port: '',
        pathname: '/**'
      },
    ]
  },
};

export default nextConfig;