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
  // Permitir origens de desenvolvimento
  allowedDevOrigins: ['172.31.240.1', 'localhost', '127.0.0.1'],
}

module.exports = nextConfig
