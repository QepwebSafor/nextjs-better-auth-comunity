/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["@node-rs/argon2", "@node-rs/wasm"],
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "res.cloudinary.com",
      },
      {
        hostname: "avatars.githubusercontent.com"
      },
      {
        hostname: "images.unsplash.com"
      }
    ],
  },
};

export default nextConfig;
