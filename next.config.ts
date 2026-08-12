import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const isVercel = process.env.VERCEL === "1";
const isStaticExport = isGitHubPages || isVercel;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: isStaticExport ? "export" : undefined,
  assetPrefix: isGitHubPages ? basePath : undefined,
  trailingSlash: isStaticExport,
};

export default nextConfig;
