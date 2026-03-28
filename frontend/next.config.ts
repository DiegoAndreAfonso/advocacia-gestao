import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/advocacia-gestao",
  assetPrefix: "/advocacia-gestao/",
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
};

export default nextConfig;

module.exports = nextConfig;
