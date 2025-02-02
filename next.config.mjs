/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites: async () => {
        return [
            {
                source: "/api/data/:match*",
                destination: "https://https://jeff-cardinal-portfolio.vercel.app/_vercel/insights/:match*",
            },
            {
                source: "/api/performance/:match*",
                destination: "https://https://jeff-cardinal-portfolio.vercel.app/_vercel/speed-insights/:match*",
            },
        ];
    },
};

export default nextConfig;