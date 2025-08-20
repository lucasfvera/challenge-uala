import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async redirects() {
        return [
            {
                source: "/",
                destination: "/transactions/home",
                permanent: true,
            },
            {
                source: "/transactions",
                destination: "/transactions/home",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
