/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  images: {
    domains: [
      "content.linkedin.com",
      "static-exp1.licdn.com",
      "img.freepik.com",
      "rb.gy",
      "st3.depositphotos.com",
      "media.istockphoto.com",
    ],
  },
};
