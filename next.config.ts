// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
<<<<<<< HEAD
  // output: 'standalone', // or just remove "output" entirely
=======
  //output: 'standalone', // or just remove "output" entirely
>>>>>>> 37637087b23a05165ec6a55386ed666da52285c8
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, //
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'skalaapi.anaxaaistech.com',
        pathname: '/**',
      },
    ],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
};

module.exports = nextConfig;
