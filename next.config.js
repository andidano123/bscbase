/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  // output: 'export',
  webpack: (config, { webpack }) => {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    config.externals["node:fs"] = "commonjs node:fs";

    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,      
  };
    config.plugins.push(

      new webpack.NormalModuleReplacementPlugin(
        /^node:/,
        (resource) => {
          resource.request = resource.request.replace(/^node:/, '');
        },
      ),
    );

    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://hout.solfb.help/api/:path*',
        // destination: 'http://localhost/api/:path*',
      },
      {
        source: '/images/:path*',
        destination: 'https://hout.solfb.help/images/:path*',
        // destination: 'http://localhost/api/:path*',
      },
      {
        source: '/v2/cryptocurrency/info',
        destination: 'https://pro-api.coinmarketcap.com/v2/cryptocurrency/info',
        // destination: 'http://localhost/api/:path*',
      },
      {
        source: '/v2/cryptocurrency/quotes/latest',
        destination: 'https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest',
        // destination: 'http://localhost/api/:path*',
      },
      {
        source: '/api/fees',
        destination: 'https://solanacompass.com/api/fees',
        // destination: 'http://localhost/api/:path*',
      },
      {
        source: '/price/v2',
        destination: 'https://api.jup.ag/price/v2',
        // destination: 'http://localhost/api/:path*',
      },
      {
        source: '/ethscanapi',
        destination: 'https://api.etherscan.io/v2/api',        
      },
      
    ]
  }
}

module.exports = nextConfig
