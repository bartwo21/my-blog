/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bytegrad.com",
      },
      {
        hostname: "utfs.io",
      },
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "gravatar.com",
      },
    ],
  },
};

export default nextConfig;
