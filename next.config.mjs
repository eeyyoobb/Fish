/** @type {import('next').NextConfig} */
const nextConfig = {
        webpack: (config) => {
          config.cache = false;
          return config;
      },
      images: {
        domains: ['img.clerk.com',"img.icons8.com","img.flagcdn.com"],
      },
      // eslint:{
      //   ignoreDuringBuilds:true,
      // },
      
      
};

export default nextConfig;
