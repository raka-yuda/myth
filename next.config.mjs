/** @type {import('next').NextConfig} */
console.log('Next.js build environment:', process.env.NODE_ENV);
console.log('Next.js build environment:', process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL);
console.log('Next.js build environment:', process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID);

const nextConfig = {
  reactStrictMode: true,
  env: {
    UMAMI_SCRIPT_URL: process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL,
    UMAMI_WEBSITE_ID: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,
  },
  output: 'standalone',
  webpack: (config) => {
    // Exclude test files from being processed
    config.module.rules.push({
      test: /\.(test|spec)\.(js|jsx|ts|tsx)$/,
      loader: 'ignore-loader',
    });
    
    return config;
  },
};

export default nextConfig;
