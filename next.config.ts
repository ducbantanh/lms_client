import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

/** Export ra out/ để webserver trong LAN phục vụ mà không cần Node.js lúc chạy. Khi dev, proxy API sang backend 8080. */
const nextConfig: NextConfig = {
  ...(isProd ? { output: 'export' as const } : {}),
  trailingSlash: true,
  images: { unoptimized: true },
  // Chỉ định root vì repo cha cũng có package-lock.json.
  turbopack: { root: process.cwd() },
  // Tắt hoàn toàn Next.js Dev Indicator toolbar ở góc màn hình
  devIndicators: false,
  async rewrites() {
    if (isProd) return [];
    return [
      {
        source: '/api/v1/:path*',
        destination: 'http://127.0.0.1:8080/api/v1/:path*',
      },
      {
        source: '/ws',
        destination: 'http://127.0.0.1:8080/ws',
      },
    ];
  },
};

export default nextConfig;
