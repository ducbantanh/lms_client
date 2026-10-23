import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

/** Luật của Next.js + React + React Hooks + TypeScript (theo tài liệu eslint-config-next). */
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    // Mặc định của eslint-config-next.
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // pdf.js chép từ node_modules khi npm install, không phải code của dự án.
    'public/vendor/**',
  ]),
]);

export default eslintConfig;
