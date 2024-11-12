/** @type {import('next').NextConfig} */
const nextConfig = {
        webpack: (config) => {
          config.cache = false;
          return config;
      },
      images: {
        domains: ['img.clerk.com',"img.icons8.com","img.flagcdn.com"],
      },
      experimental: {
        metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
      },
      
      
};

export default nextConfig;
