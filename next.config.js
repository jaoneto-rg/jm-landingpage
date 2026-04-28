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
  // Turbopack config para evitar warning de múltiplos lockfiles
  turbopack: {
    root: __dirname
  },
  // Permitir origens de desenvolvimento
  allowedDevOrigins: ['172.31.240.1', 'localhost', '127.0.0.1']
}

module.exports = nextConfig
