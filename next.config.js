/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'http://localhost:8080/:path*',
          },
        ]
      },
  };

module.exports = nextConfig
