/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'hvtu-bucket.s3.ap-southeast-2.amazonaws.com',
      'ui-avatars.com',
      'localhost',
      'web-programming-co-3049.vercel.app',
      'printing-serivce-bucket.s3.ap-southeast-2.amazonaws.com'
    ],
  },
}

module.exports = nextConfig
