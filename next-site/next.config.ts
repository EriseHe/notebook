import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  experimental: {
    externalDir: true,
  },
  sassOptions: {
    includePaths: [path.join(process.cwd(), "styles")],
  },
  webpack: (config) => {
    config.resolve.extensionAlias = {
      ...config.resolve.extensionAlias,
      ".scss": [".scss"],
    };
    return config;
  },
};

export default nextConfig;
