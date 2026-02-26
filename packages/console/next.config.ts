import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: [],
  serverExternalPackages: ['node-pty'],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
        child_process: false,
      };
    }
    return config;
  },
};

export default nextConfig;
