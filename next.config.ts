import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['raw.githubusercontent.com'], // Add tenor.com to the list of allowed image domains
  },
  /* other config options here */
};

export default nextConfig;
