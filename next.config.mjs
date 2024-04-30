/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hare-media-cdn.tripadvisor.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'media-cdn.tripadvisor.com',
        port: '',
        pathname: '/**'
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/ext-api/:path*',
        destination: `${process.env.API_URL || 'https://api.viator.com/partner'}/:path*` // Proxy to Backend
      }
    ];
  }
};

export default nextConfig;
