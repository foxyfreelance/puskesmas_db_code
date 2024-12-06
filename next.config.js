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
  async headers() {
    return [
      {
        source: '/api/:path*',  // Apply for your API route
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
          },
          {
            key: 'Expires',
            value: '0',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Surrogate-Control',
            value: 'no-store',
          },
        ],
      },
    ];
  },
  // Optional custom configuration(e.g., redirects or headers)
  // async headers() {
  //   return [
  //     {
  //       source: '/:path*',
  //       headers: [
  //         {
  //           key: 'Cache-Control',
  //           value: 'no-store',
  //         },
  //       ],
  //     },
  //     {
  //       source: '/api/:path*',
  //       headers: [
  //         { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate, proxy-revalidate' }
  //       ],
  //     },
  //   ];
  // },
};