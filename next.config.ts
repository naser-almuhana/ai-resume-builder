import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "arfm8h6xodh3fmvh.public.blob.vercel-storage.com",
      },
    ],
  },
}

export default nextConfig
