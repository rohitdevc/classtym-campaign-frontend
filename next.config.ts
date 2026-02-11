import type { NextConfig } from "next";

const isNetlifyDomain = process.env.URL?.includes("netlify.app");

const nextConfig: NextConfig = {
  async headers() {
    if (!isNetlifyDomain) return [];

    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
    ];
  },
  
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