import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

  async redirects() {
    return [
      {
        source: '/',
        destination: '/student',
        permanent: true,
      },
    ]
  }
};

export default nextConfig;