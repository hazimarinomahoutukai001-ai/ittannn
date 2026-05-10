/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', 
  images: {
    unoptimized: true, 
  },
  basePath: '/ittannn', // 🌟 これで住所を教え込みます
};

module.exports = nextConfig;
