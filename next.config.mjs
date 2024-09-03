/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ih1.redbubble.net",
        port: "",
        pathname:
          "/image.4664960894.7913/raf,360x360,075,t,fafafa:ca443f4786.jpg/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "wrgxzfukkikecsbvvbwe.supabase.co",
      },
    ],
  },
};
export default nextConfig;
