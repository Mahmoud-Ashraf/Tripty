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
    disableStaticImages: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tripty.app',
        port: '',
        pathname: '/storage/**',
      },
    ],
    // domains: [

    //   // '18.133.139.168',
    //   'https://tripty.app',
    //   'tripty.app'
    // ]
  }
}

module.exports = nextConfig
