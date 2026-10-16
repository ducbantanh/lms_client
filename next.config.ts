import type { NextConfig } from 'next';

/** Export ra out/ để webserver trong LAN phục vụ mà không cần Node.js lúc chạy. */
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  // Chỉ định root vì repo cha cũng có package-lock.json.
  turbopack: { root: process.cwd() },
};

export default nextConfig;
