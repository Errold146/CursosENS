import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname:  "69rbgpg9mz.ufs.sh"
            }
        ]
    }
};

export default nextConfig;
