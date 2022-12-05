/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: [],
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rootvc-dreambooth.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
}

module.exports = nextConfig
