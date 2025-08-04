import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Enable static optimization for better performance
  output: "standalone",

  // Configure domains for multi-tenant setup
  async rewrites() {
    return [
      // Handle country-specific routing
      {
        source: "/:path*",
        destination: "/:path*",
      },
    ]
  },

  // Environment-specific configurations
  env: {
    NEXT_PUBLIC_APP_ENV: process.env.NODE_ENV,
  },

  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: true,
  },

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: true,
  },

  // Images configuration
  images: {
    unoptimized: true,
  },
}

export default nextConfig
