/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'utfs.io',
         },
         {
            protocol: 'https',
            hostname: 'avatars.githubusercontent.com',
         },
         {
            protocol: 'https',
            hostname: 'api.dicebear.com',
         }
      ]
   },
   reactStrictMode: false,
};

export default nextConfig;
