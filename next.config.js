/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    unoptimized: true
  },
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei', 'framer-motion'],
}

module.exports = nextConfig
