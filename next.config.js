/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ─── Security Headers ────────────────────────────────────────────────────────────────
  async headers() {
    return [];
  },

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
  },
  output: 'standalone',
};

module.exports = nextConfig;
