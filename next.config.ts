import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      '127.0.0.1',
      'localhost',
      'http://127.0.0.1:8000/'       // Add your Laravel API domain
    ],
  },
};

export default nextConfig;
