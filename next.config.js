/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['default', 'en', 'ar'],
    defaultLocale: 'default',
    localeDetection: false,
  },
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    domains: ['18.133.139.168']
  }
}

module.exports = nextConfig
