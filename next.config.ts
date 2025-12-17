import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '',
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
        protocol: 'http',
        hostname: 'localhost',
        port: '2976',
        pathname: '/**'
      },
    ]
  },
};

export default nextConfig;