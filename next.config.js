/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Cho phép production builds dù có ESLint warnings
    ignoreDuringBuilds: true,
  },
  typescript: {
    // KHÔNG ignore TypeScript errors (giữ chặt chẽ)
    ignoreBuildErrors: false,
  },
};
module.exports = nextConfig;
