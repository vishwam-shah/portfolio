/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // For static export (next export)
    formats: ['image/webp', 'image/avif'], // Modern formats for better performance
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  trailingSlash: true, // Recommended for static export
  reactStrictMode: true, // Recommended for performance and future-proofing
  swcMinify: true, // Use SWC for faster builds
};

module.exports = nextConfig;
  