module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*', // Handle API routes natively
      },
      {
        source: '/:path*',
        destination: '/index.html', // This serves React app for non-API routes
      },

    ];
  },
  reactStrictMode: true,
  // Optional custom configuration (e.g., redirects or headers)
  // async headers() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       headers: [
  //         { key: 'Cache-Control', value: 'no-store' }
  //       ],
  //     },
  //   ];
  // },
};
