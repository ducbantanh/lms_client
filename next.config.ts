import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

/** Export ra out/ để webserver trong LAN phục vụ mà không cần Node.js lúc chạy. */
const nextConfig: NextConfig = {
  ...(isProd ? { output: 'export' } : {}),
  trailingSlash: true,
  images: { unoptimized: true },
  // Chỉ định root vì repo cha cũng có package-lock.json.
  turbopack: { root: process.cwd() },
  ...(!isProd
    ? {
        async rewrites() {
          return [
            {
              source: '/api/:path*',
              destination: 'http://127.0.0.1:8080/api/:path*',
            },
          ];
        },
      }
    : {}),
};

export default nextConfig;
