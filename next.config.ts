import type { NextConfig } from "next";
const { envConfig } = require("./lib/env")

const nextConfig: NextConfig = {
  env: envConfig,
  images: {
    domains: ['images.unsplash.com', 'ui-avatars.com'],
  },
};

export default nextConfig;
