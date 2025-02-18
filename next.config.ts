import type { NextConfig } from "next";
const { envConfig } = require("./lib/env")

const nextConfig: NextConfig = {
  env: envConfig,
};

export default nextConfig;
