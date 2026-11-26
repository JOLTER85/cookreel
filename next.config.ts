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
