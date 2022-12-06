/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: [],
  images: {
    domains: ["rootvc-dreambooth.s3.amazonaws.com", "s3.us-west-2.amazonaws.com"],
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
