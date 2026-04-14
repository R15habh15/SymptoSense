/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},
  images: {
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com'],
  },
  // Ensure framer-motion and other client packages are handled properly
  transpilePackages: [],
}

module.exports = nextConfig
