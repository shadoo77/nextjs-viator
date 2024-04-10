/** @type {import('next').NextConfig} */
const nextConfig = {
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
  }
};

export default nextConfig;
