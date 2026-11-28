import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      // 1. Historical subdomain http(s)://tv.cookreel.com/ and http(s)://tv.cookreel.com/today -> Homepage https://cookreel.com/
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'tv.cookreel.com',
          },
        ],
        destination: 'https://cookreel.com/',
        permanent: true,
      },
      {
        source: '/today',
        has: [
          {
            type: 'host',
            value: 'tv.cookreel.com',
          },
        ],
        destination: 'https://cookreel.com/',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'tv.cookreel.com',
          },
        ],
        destination: 'https://cookreel.com/',
        permanent: true,
      },
      // 2. Direct path redirects for /today, /tv, and /tv/today on main domain -> Homepage /
      {
        source: '/today',
        destination: '/',
        permanent: true,
      },
      {
        source: '/today/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/tv',
        destination: '/',
        permanent: true,
      },
      {
        source: '/tv/today',
        destination: '/',
        permanent: true,
      },
      {
        source: '/tv/:path*',
        destination: '/',
        permanent: true,
      },
      // 3. Legacy underscore category paths -> hyphenated category paths
      {
        source: '/category/quick_easy',
        destination: '/category/quick-easy',
        permanent: true,
      },
      {
        source: '/category/healthy_diet',
        destination: '/category/healthy-diet',
        permanent: true,
      },
      {
        source: '/category/desserts_baking',
        destination: '/category/desserts-baking',
        permanent: true,
      },
      {
        source: '/category/kitchen_hacks',
        destination: '/category/kitchen-hacks',
        permanent: true,
      },
      // 4. Legacy recipe slug aliases -> canonical recipe slugs
      {
        source: '/recipes/keto-garlic-herb-butter-ribeye-steak-cast-iron',
        destination: '/recipes/keto-garlic-herb-butter-ribeye-steak-high-protein',
        permanent: true,
      },
      {
        source: '/recipes/air-fryer-crispy-lemon-herb-chicken-thighs',
        destination: '/recipes/air-fryer-or-skillet-golden-lemon-herb-chicken-thighs',
        permanent: true,
      },
      {
        source: '/recipes/complete-baking-cooking-ingredient-substitutions-guide',
        destination:
          '/recipes/ultimate-kitchen-ingredient-substitutes-and-cast-iron-meal-prep-guide',
        permanent: true,
      },
      {
        source: '/recipes/sunday-high-protein-meal-prep-blueprint',
        destination: '/recipes/60-minute-sunday-meal-prep-guide-5-high-protein-lunches',
        permanent: true,
      },
      {
        source: '/substitutions-guide',
        destination: '/substitutions',
        permanent: true,
      },
      {
        source: '/ingredient-substitutions',
        destination: '/substitutions',
        permanent: true,
      },
    ];
  },
  output: 'standalone',
  transpilePackages: ['motion'],
  webpack: (config, { dev }) => {
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    }
    return config;
  },
};

export default nextConfig;
