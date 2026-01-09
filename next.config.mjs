/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. ENABLE TURBOPACK (Required for Next.js 16 Canary)
  // This silences the error by explicitly enabling Turbopack defaults.
  turbopack: {},

  // 2. ENABLE PPR (PARTIAL PRERENDERING)
  cacheComponents: true,

  // 3. LOGGING CONFIGURATION
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  // 4. IMAGE OPTIMIZATION
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: false,
  },

  // 5. EXPERIMENTAL FEATURES
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      'lucide-react', 
      'date-fns', 
      '@radix-ui/react-dialog', 
      '@radix-ui/react-accordion'
    ],
    webpackBuildWorker: true,
  },

  // 6. STANDARD OPTIMIZATIONS
  compress: true,
  trailingSlash: false,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  output: 'standalone',

  // 7. WEBPACK CONFIGURATION (Only runs for Production Builds)
  webpack: (config, { dev, isServer }) => {
    // Only run this logic if we are NOT in dev mode (since Dev uses Turbopack)
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
            priority: 20,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;