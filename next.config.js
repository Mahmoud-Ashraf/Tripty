/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'ar',
    localeDetection: false,
  },
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    domains: [
      '18.133.139.168',
      'tripty.app'
    ]
  }
}

module.exports = nextConfig
