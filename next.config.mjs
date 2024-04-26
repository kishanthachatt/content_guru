/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Disable CORS
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
