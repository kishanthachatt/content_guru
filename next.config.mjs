/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/content",
        permanent: true,
      },
    ];
  },
  reactStrictMode: false,
};

export default nextConfig;
