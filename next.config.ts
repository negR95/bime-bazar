import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/order/submit",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
