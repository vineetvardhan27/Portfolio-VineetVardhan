/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com"],
  },
  async redirects() {
    return [
      { source: "/work", destination: "/#work", permanent: true },
      { source: "/services", destination: "/#services", permanent: true },
      { source: "/pricing", destination: "/#pricing", permanent: true },
      { source: "/process", destination: "/#process", permanent: true },
      { source: "/why-me", destination: "/#why-me", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
    ];
  },
};

export default nextConfig;
